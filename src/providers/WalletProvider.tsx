'use client';

import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNotification } from './NotificationProvider';
import { keychain, hiveRPC } from '@/lib';
import { STORAGE_KEYS, QUERY_KEYS } from '@/constants';
import type { HiveAccount, Operation } from '@/types';

interface WalletState {
  user: HiveAccount | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  keychainInstalled: boolean;
}

type WalletAction =
  | { type: 'KEYCHAIN_DETECTED'; payload: boolean }
  | { type: 'CONNECT_START' }
  | { type: 'CONNECT_SUCCESS'; payload: HiveAccount }
  | { type: 'CONNECT_ERROR'; payload: string }
  | { type: 'DISCONNECT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_USER'; payload: HiveAccount };

const walletReducer = (state: WalletState, action: WalletAction): WalletState => {
  switch (action.type) {
    case 'KEYCHAIN_DETECTED':
      return { ...state, keychainInstalled: action.payload };
    case 'CONNECT_START':
      return { ...state, isConnecting: true, error: null };
    case 'CONNECT_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isConnected: true,
        isConnecting: false,
        error: null,
      };
    case 'CONNECT_ERROR':
      return {
        ...state,
        user: null,
        isConnected: false,
        isConnecting: false,
        error: action.payload,
      };
    case 'DISCONNECT':
      return {
        ...state,
        user: null,
        isConnected: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export interface WalletContextValue extends WalletState {
  connect: (username?: string) => Promise<void>;
  disconnect: () => void;
  signTransaction: (
    operations: Operation[],
    keyType?: 'Posting' | 'Active'
  ) => Promise<any>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
  switchAccount: (username: string) => Promise<void>;
}

export const WalletContext = createContext<WalletContextValue | undefined>(undefined);

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, {
    user: null,
    isConnected: false,
    isConnecting: false,
    error: null,
    keychainInstalled: false,
  });

  const queryClient = useQueryClient();
  const { success: successNotification, error: errorNotification } = useNotification();

  // Check for HiveKeychain installation
  useEffect(() => {
    console.log('[WalletProvider] Initializing keychain detection');

    const checkKeychain = async () => {
      const installed = await keychain.isInstalled();
      console.log('[WalletProvider] Keychain installed status:', installed);
      dispatch({ type: 'KEYCHAIN_DETECTED', payload: installed });
    };

    checkKeychain();

    // Set up listener for keychain installation changes
    const unsubscribe = keychain.onInstallationChange(checkKeychain);

    return unsubscribe;
  }, []);

  // Auto-connect on mount if previously connected
  useEffect(() => {
    console.log('[WalletProvider] Checking for auto-connect', {
      keychainInstalled: state.keychainInstalled,
      isConnected: state.isConnected,
      isConnecting: state.isConnecting
    });

    const autoConnect = async () => {
      if (!state.keychainInstalled || state.isConnected || state.isConnecting) {
        console.log('[WalletProvider] Skipping auto-connect', {
          reason: !state.keychainInstalled ? 'keychain not installed' :
            state.isConnected ? 'already connected' :
              state.isConnecting ? 'already connecting' : 'unknown'
        });
        return;
      }

      try {
        const savedUsername = localStorage.getItem(STORAGE_KEYS.WALLET_USERNAME);
        console.log('[WalletProvider] Found saved username for auto-connect:', savedUsername);

        if (savedUsername) {
          console.log('[WalletProvider] Attempting auto-connect with saved username');
          await connect(savedUsername);
        } else {
          console.log('[WalletProvider] No saved username found for auto-connect');
        }
      } catch (error) {
        console.warn('[WalletProvider] Auto-connect failed:', error);
        // Clear saved username if auto-connect fails
        localStorage.removeItem(STORAGE_KEYS.WALLET_USERNAME);
      }
    };

    autoConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.keychainInstalled, state.isConnected, state.isConnecting]);

  // User data query
  const { data: userData, refetch: refetchUser } = useQuery({
    queryKey: [...QUERY_KEYS.USER_BALANCE, state.user?.name],
    queryFn: async () => {
      if (!state.user?.name) return null;
      return await hiveRPC.getAccount(state.user.name);
    },
    enabled: !!state.user?.name,
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
  });

  // Update user data when query data changes
  useEffect(() => {
    if (userData && state.user) {
      dispatch({ type: 'UPDATE_USER', payload: userData });
    }
  }, [userData, state.user]);

  const connect = useCallback(async (username?: string) => {
    console.log('[WalletProvider] Connect function called', { username });

    const installed = await keychain.isInstalled();
    if (!installed) {
      console.log('[WalletProvider] Keychain not installed, showing error');
      const error = 'HiveKeychain extension not found. Please install it first.';
      dispatch({ type: 'CONNECT_ERROR', payload: error });
      errorNotification(error, {
        action: {
          label: 'Install',
          onClick: () => window.open(keychain.getInstallationUrl(), '_blank'),
        },
      });
      return;
    }

    console.log('[WalletProvider] Starting connection process');
    dispatch({ type: 'CONNECT_START' });

    try {
      let accountName = username;
      console.log('[WalletProvider] Account name for connection:', accountName);

      if (!accountName) {
        console.log('[WalletProvider] No account name provided, trying to get accounts from keychain');

        try {
          // Try to get accounts from keychain
          const accounts = await keychain.getAccounts();
          console.log('[WalletProvider] keychain accounts:', accounts);

          if (accounts && accounts.length > 0 && accounts[0]) {
            accountName = accounts[0].name;
            console.log('[WalletProvider] Using first account from keychain:', accountName);
          } else {
            // If no accounts available, prompt user for username
            console.log('[WalletProvider] No accounts in keychain, prompting user for username');
            let userInput: string | null = null;
            let attempts = 0;
            const maxAttempts = 3;

            while (!userInput && attempts < maxAttempts) {
              attempts++;
              const promptMessage = attempts === 1
                ? 'Please enter your Hive username to connect with HiveKeychain:'
                : `Invalid username format. Please try again (${attempts}/${maxAttempts}).\nEnter your Hive username:`;

              userInput = prompt(promptMessage);

              if (!userInput) {
                throw new Error('Username is required to connect. Please try again.');
              }

              userInput = userInput.trim().toLowerCase();

              // Basic validation
              if (!/^[a-z0-9.-]+$/.test(userInput) || userInput.length < 3 || userInput.length > 16) {
                userInput = null; // Reset to retry
                if (attempts === maxAttempts) {
                  throw new Error('Invalid username format. Username must be 3-16 characters and contain only lowercase letters, numbers, dots, and hyphens.');
                }
              }
            }

            if (!userInput) {
              throw new Error('Failed to get valid username after multiple attempts.');
            }

            accountName = userInput;
            console.log('[WalletProvider] User provided username:', accountName);
          }
        } catch (keychainError) {
          console.warn('[WalletProvider] Failed to get accounts from keychain:', keychainError);
          // Fall back to prompting user
          console.log('[WalletProvider] Falling back to user prompt');

          let userInput: string | null = null;
          let attempts = 0;
          const maxAttempts = 3;

          while (!userInput && attempts < maxAttempts) {
            attempts++;
            const promptMessage = attempts === 1
              ? 'Please enter your Hive username to connect with HiveKeychain:'
              : `Invalid username format. Please try again (${attempts}/${maxAttempts}).\nEnter your Hive username:`;

            userInput = prompt(promptMessage);

            if (!userInput) {
              throw new Error('Username is required to connect. Please try again.');
            }

            userInput = userInput.trim().toLowerCase();

            // Basic validation
            if (!/^[a-z0-9.-]+$/.test(userInput) || userInput.length < 3 || userInput.length > 16) {
              userInput = null; // Reset to retry
              if (attempts === maxAttempts) {
                throw new Error('Invalid username format. Username must be 3-16 characters and contain only lowercase letters, numbers, dots, and hyphens.');
              }
            }
          }

          if (!userInput) {
            throw new Error('Failed to get valid username after multiple attempts.');
          }

          accountName = userInput;
          console.log('[WalletProvider] User provided username:', accountName);
        }
      }

      // Validate that we got a proper account name
      if (!accountName || typeof accountName !== 'string' || accountName.trim() === '') {
        console.error('[WalletProvider] Invalid account name received:', accountName);
        throw new Error('Invalid username provided. Please make sure you entered a valid Hive username.');
      }

      // Trim the account name to remove any whitespace
      accountName = accountName.trim();
      console.log('[WalletProvider] Using trimmed account name:', accountName);

      // Fetch account data to verify account exists
      console.log('[WalletProvider] Fetching account data for:', accountName);
      const account = await hiveRPC.getAccount(accountName);
      console.log('[WalletProvider] Account data fetched:', account);

      if (!account) {
        console.log('[WalletProvider] Account not found');
        throw new Error(`Account '${accountName}' not found`);
      }

      // Now authenticate with HiveKeychain by requesting a sign operation
      console.log('[WalletProvider] Authenticating with HiveKeychain');
      const authMessage = `Login to Hive Social Platform\nTimestamp: ${Date.now()}\nAccount: ${accountName}`;

      try {
        const signResult = await keychain.requestSignBuffer(
          accountName,
          authMessage,
          'Posting'
        );

        if (!signResult || !signResult.success) {
          throw new Error('Authentication failed. Please try again.');
        }

        console.log('[WalletProvider] Authentication successful:', signResult);
      } catch (signError) {
        console.error('[WalletProvider] Authentication error:', signError);
        throw new Error('Failed to authenticate with HiveKeychain. Please make sure you approve the signing request.');
      }

      // Ensure the account object has the required properties
      console.log('[WalletProvider] Processing account data');
      const accountData: HiveAccount = {
        id: account.id !== undefined ? account.id : 0,
        name: account.name || accountName,
        owner: account.owner || {},
        active: account.active || { key_auths: [], account_auths: [] },
        posting: account.posting || { key_auths: [], account_auths: [] },
        memo_key: account.memo_key || '',
        json_metadata: account.json_metadata || '',
        posting_json_metadata: account.posting_json_metadata || '',
        proxy: account.proxy || '',
        last_owner_update: account.last_owner_update || '',
        last_account_update: account.last_account_update || '',
        created: account.created || '',
        mined: account.mined !== undefined ? account.mined : false,
        recovery_account: account.recovery_account || '',
        last_account_recovery: account.last_account_recovery || '',
        reset_account: account.reset_account || '',
        comment_count: account.comment_count !== undefined ? account.comment_count : 0,
        lifetime_vote_count: account.lifetime_vote_count !== undefined ? account.lifetime_vote_count : 0,
        post_count: account.post_count !== undefined ? account.post_count : 0,
        can_vote: account.can_vote !== undefined ? account.can_vote : false,
        voting_manabar: account.voting_manabar || { current_mana: '0', last_update_time: 0 },
        downvote_manabar: account.downvote_manabar || { current_mana: '0', last_update_time: 0 },
        balance: account.balance || '0.000 HIVE',
        savings_balance: account.savings_balance || '0.000 HIVE',
        hbd_balance: account.hbd_balance || '0.000 HBD',
        hbd_savings_balance: account.hbd_savings_balance || '0.000 HBD',
        savings_withdraw_requests: account.savings_withdraw_requests !== undefined ? account.savings_withdraw_requests : 0,
        reward_hbd_balance: account.reward_hbd_balance || '0.000 HBD',
        reward_hive_balance: account.reward_hive_balance || '0.000 HIVE',
        reward_vesting_balance: account.reward_vesting_balance || '0.000000 VESTS',
        reward_vesting_hive: account.reward_vesting_hive || '0.000 HIVE',
        vesting_shares: account.vesting_shares || '0.000000 VESTS',
        delegated_vesting_shares: account.delegated_vesting_shares || '0.000000 VESTS',
        received_vesting_shares: account.received_vesting_shares || '0.000000 VESTS',
        vesting_withdraw_rate: account.vesting_withdraw_rate || '0.000000 VESTS',
        next_vesting_withdrawal: account.next_vesting_withdrawal || '',
        withdrawn: account.withdrawn !== undefined ? account.withdrawn : 0,
        to_withdraw: account.to_withdraw !== undefined ? account.to_withdraw : 0,
        withdraw_routes: account.withdraw_routes !== undefined ? account.withdraw_routes : 0,
        curation_rewards: account.curation_rewards !== undefined ? account.curation_rewards : 0,
        posting_rewards: account.posting_rewards !== undefined ? account.posting_rewards : 0,
        proxied_vsf_votes: account.proxied_vsf_votes || [],
        witnesses_voted_for: account.witnesses_voted_for !== undefined ? account.witnesses_voted_for : 0,
        last_post: account.last_post || '',
        last_root_post: account.last_root_post || '',
        last_vote_time: account.last_vote_time || '',
        post_bandwidth: account.post_bandwidth !== undefined ? account.post_bandwidth : 0,
        pending_claimed_accounts: account.pending_claimed_accounts !== undefined ? account.pending_claimed_accounts : 0,
        reputation: account.reputation || '0',
      };

      console.log('[WalletProvider] Dispatching CONNECT_SUCCESS with account data:', accountData);
      dispatch({ type: 'CONNECT_SUCCESS', payload: accountData });

      // Save connection for auto-connect
      console.log('[WalletProvider] Saving username for auto-connect:', accountData.name);
      localStorage.setItem(STORAGE_KEYS.WALLET_USERNAME, accountData.name);
      localStorage.setItem('hive_keychain_last_username', accountData.name);

      // Invalidate and refetch user-related queries
      console.log('[WalletProvider] Invalidating user balance queries');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_BALANCE });

      console.log('[WalletProvider] Showing success notification');
      successNotification(`Connected to @${accountData.name}`);

    } catch (error) {
      console.error('[WalletProvider] Connection error:', error);

      // Provide more helpful error messages
      let message = 'Connection failed';
      if (error instanceof Error) {
        if (error.message.includes('undefined')) {
          message = 'HiveKeychain response is undefined. Please make sure the extension is installed, unlocked, and you have at least one account configured.';
        } else if (error.message.includes('Handshake failed')) {
          message = 'Failed to connect to HiveKeychain. Please make sure the extension is installed and unlocked.';
        } else if (error.message.includes('timeout')) {
          message = 'HiveKeychain did not respond. Please make sure the extension is unlocked and try again.';
        } else {
          message = error.message;
        }
      }

      console.log('[WalletProvider] Dispatching CONNECT_ERROR with message:', message);
      dispatch({ type: 'CONNECT_ERROR', payload: message });
      errorNotification(message);
    }
  }, [queryClient, successNotification, errorNotification]);

  const disconnect = useCallback(() => {
    dispatch({ type: 'DISCONNECT' });

    // Clear saved connection
    localStorage.removeItem(STORAGE_KEYS.WALLET_USERNAME);

    // Clear all user-related cache
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_BALANCE });
    queryClient.removeQueries({ queryKey: QUERY_KEYS.USER_BALANCE });

    successNotification('Wallet disconnected');
  }, [queryClient, successNotification]);

  const signTransaction = useCallback(async (
    operations: Operation[],
    keyType: 'Posting' | 'Active' = 'Posting'
  ) => {
    if (!state.user) {
      throw new Error('Wallet not connected');
    }

    const installed = await keychain.isInstalled();
    if (!installed) {
      throw new Error('HiveKeychain not available');
    }

    try {
      const result = await keychain.requestBroadcast(
        state.user.name,
        operations,
        keyType
      );

      // Invalidate user balance after transaction
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_BALANCE });

      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Transaction failed';
      throw new Error(message);
    }
  }, [state.user, queryClient]);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const refreshUser = useCallback(async () => {
    if (state.user?.name) {
      await refetchUser();
    }
  }, [state.user?.name, refetchUser]);

  const switchAccount = useCallback(async (username: string) => {
    if (state.user?.name === username) {
      return; // Already connected to this account
    }

    // Disconnect current user first
    dispatch({ type: 'DISCONNECT' });

    // Connect to new account
    await connect(username);
  }, [state.user?.name, connect]);

  const value: WalletContextValue = {
    ...state,
    connect,
    disconnect,
    signTransaction,
    clearError,
    refreshUser,
    switchAccount,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

