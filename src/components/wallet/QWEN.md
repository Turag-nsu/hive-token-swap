# Wallet Components Directory

This directory contains all components related to wallet connection, management, and blockchain interactions on the Hive ecosystem.

## Overview

Wallet components handle the critical blockchain interface layer:
- **Connection Management**: Connect/disconnect HiveKeychain wallet
- **Account Information**: Display user account data and balances
- **Transaction Signing**: Handle transaction requests and signatures
- **Security**: Secure key management and permissions
- **Multi-wallet Support**: Support for different wallet types

## Component Architecture

### Core Wallet Components

#### `WalletConnector.tsx`
Main wallet connection orchestrator:
- Detects available wallet extensions (HiveKeychain, etc.)
- Manages connection state and user sessions
- Handles wallet switching and account selection
- Provides fallback options for missing wallets
- Manages connection persistence and auto-reconnect

#### `ConnectButton.tsx`
Primary wallet connection interface:
- One-click wallet connection
- Loading states and connection feedback
- Error handling with retry mechanisms
- Mobile-responsive design
- Accessibility features for screen readers

#### `WalletModal.tsx`
Comprehensive wallet selection and setup:
- Multiple wallet option display
- Installation guides for missing wallets
- QR codes for mobile wallet connections
- Wallet comparison and feature breakdown
- Security warnings and best practices

#### `AccountOverview.tsx`
Connected account information display:
- Account name and reputation score
- HIVE and HBD balance display
- Hive Power (staked HIVE) information
- Resource Credits (RC) status
- Voting power and delegation info

#### `BalanceDisplay.tsx`
Multi-token balance management:
- Native HIVE/HBD balances
- Hive Engine token balances
- USD value calculations
- Balance refresh functionality
- Historical balance tracking

### Advanced Wallet Features

#### `TransactionSigner.tsx`
Transaction request and signing interface:
- Transaction preview with readable details
- Security warnings for suspicious transactions
- Fee estimation and gas calculations
- Batch transaction support
- Transaction history and status tracking

#### `WalletSettings.tsx`
Wallet configuration and preferences:
- Auto-connect preferences
- Transaction signing preferences
- Security settings and permissions
- Backup and recovery options
- Network selection and RPC endpoints

#### `AccountSwitcher.tsx`
Multi-account management:
- Switch between connected accounts
- Account-specific settings and preferences
- Permission management per account
- Account verification status
- Recent activity summary

#### `SecurityPanel.tsx`
Security features and warnings:
- Active key vs posting key usage
- Permission levels and access control
- Recent transaction monitoring
- Suspicious activity alerts
- Security best practices guide

## Implementation Patterns

### Wallet Connection Hook
```tsx
// useWallet.ts - Main wallet management hook
import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface WalletState {
  user: HiveAccount | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  keychainInstalled: boolean;
}

export const useWallet = () => {
  const [state, setState] = useState<WalletState>({
    user: null,
    isConnected: false,
    isConnecting: false,
    error: null,
    keychainInstalled: false,
  });

  const queryClient = useQueryClient();

  // Check for HiveKeychain installation
  useEffect(() => {
    const checkKeychain = () => {
      setState(prev => ({
        ...prev,
        keychainInstalled: !!(window as any).hive_keychain,
      }));
    };

    checkKeychain();
    
    // Listen for extension installation
    const interval = setInterval(checkKeychain, 1000);
    return () => clearInterval(interval);
  }, []);

  // Restore previous connection
  useEffect(() => {
    const savedUsername = localStorage.getItem('hive-username');
    if (savedUsername && state.keychainInstalled) {
      connect(savedUsername);
    }
  }, [state.keychainInstalled]);

  const connect = useCallback(async (username?: string) => {
    if (!state.keychainInstalled) {
      setState(prev => ({ ...prev, error: 'HiveKeychain not installed' }));
      return;
    }

    setState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      if (username) {
        // Direct connection with username
        const account = await getAccount(username);
        setState(prev => ({
          ...prev,
          user: account,
          isConnected: true,
          isConnecting: false,
        }));
        localStorage.setItem('hive-username', username);
      } else {
        // Request account selection from Keychain
        return new Promise<void>((resolve, reject) => {
          (window as any).hive_keychain.requestHandshake((response: any) => {
            if (response.success) {
              connect(response.data.username).then(resolve).catch(reject);
            } else {
              setState(prev => ({
                ...prev,
                isConnecting: false,
                error: response.message || 'Connection failed',
              }));
              reject(new Error(response.message));
            }
          });
        });
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: error instanceof Error ? error.message : 'Connection failed',
      }));
    }
  }, [state.keychainInstalled]);

  const disconnect = useCallback(() => {
    setState({
      user: null,
      isConnected: false,
      isConnecting: false,
      error: null,
      keychainInstalled: state.keychainInstalled,
    });
    localStorage.removeItem('hive-username');
    queryClient.clear();
  }, [queryClient, state.keychainInstalled]);

  const signTransaction = useCallback(async (
    operations: Operation[],
    keyType: 'posting' | 'active' = 'posting'
  ) => {
    if (!state.user || !state.keychainInstalled) {
      throw new Error('Wallet not connected');
    }

    return new Promise((resolve, reject) => {
      (window as any).hive_keychain.requestBroadcast(
        state.user.name,
        operations,
        keyType,
        (response: any) => {
          if (response.success) {
            resolve(response.result);
          } else {
            reject(new Error(response.message || 'Transaction failed'));
          }
        }
      );
    });
  }, [state.user, state.keychainInstalled]);

  return {
    ...state,
    connect,
    disconnect,
    signTransaction,
  };
};
```

### Balance Management
```tsx
// useBalances.ts - Token balance management
export const useBalances = (username?: string) => {
  const { data: hiveBalances } = useQuery({
    queryKey: ['balances', 'hive', username],
    queryFn: () => getHiveBalances(username!),
    enabled: !!username,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: engineBalances } = useQuery({
    queryKey: ['balances', 'engine', username],
    queryFn: () => getHiveEngineBalances(username!),
    enabled: !!username,
    refetchInterval: 30000,
  });

  const { data: prices } = useQuery({
    queryKey: ['prices'],
    queryFn: getTokenPrices,
    refetchInterval: 60000, // Refresh prices every minute
  });

  const totalUsdValue = useMemo(() => {
    let total = 0;
    
    if (hiveBalances && prices?.HIVE) {
      total += parseFloat(hiveBalances.balance) * prices.HIVE;
      total += parseFloat(hiveBalances.hbd_balance) * (prices.HBD || 1);
    }

    if (engineBalances && prices) {
      engineBalances.forEach(balance => {
        const price = prices[balance.symbol] || 0;
        total += parseFloat(balance.balance) * price;
      });
    }

    return total;
  }, [hiveBalances, engineBalances, prices]);

  return {
    hiveBalances,
    engineBalances,
    prices,
    totalUsdValue,
    isLoading: !hiveBalances || !engineBalances,
  };
};
```

### Transaction Handling
```tsx
// TransactionSigner.tsx - Transaction signing component
export const TransactionSigner: React.FC<TransactionSignerProps> = ({
  operations,
  onSuccess,
  onCancel,
  keyType = 'posting',
}) => {
  const { signTransaction, user } = useWallet();
  const [isSigning, setIsSigning] = useState(false);
  const [preview, setPreview] = useState<TransactionPreview | null>(null);

  useEffect(() => {
    // Generate human-readable transaction preview
    const generatePreview = async () => {
      const preview = await parseOperations(operations);
      setPreview(preview);
    };
    generatePreview();
  }, [operations]);

  const handleSign = async () => {
    if (!user) return;

    setIsSigning(true);
    try {
      const result = await signTransaction(operations, keyType);
      
      toast.success('Transaction signed successfully!');
      onSuccess(result);
    } catch (error) {
      toast.error(`Transaction failed: ${error.message}`);
    } finally {
      setIsSigning(false);
    }
  };

  if (!preview) {
    return <TransactionSkeleton />;
  }

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Sign Transaction</DialogTitle>
          <DialogDescription>
            Please review the transaction details before signing.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Transaction Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Transaction Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {preview.operations.map((op, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted rounded">
                  <div>
                    <div className="font-medium">{op.type}</div>
                    <div className="text-sm text-muted-foreground">{op.description}</div>
                  </div>
                  {op.amount && (
                    <Badge variant="secondary">{op.amount}</Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Security Warnings */}
          {keyType === 'active' && (
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertTitle>Active Key Required</AlertTitle>
              <AlertDescription>
                This transaction requires your active key. Only sign if you trust this action.
              </AlertDescription>
            </Alert>
          )}

          {preview.estimatedFee && (
            <div className="flex justify-between text-sm">
              <span>Estimated Fee:</span>
              <span>{preview.estimatedFee}</span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSign} 
            disabled={isSigning}
            className="min-w-[100px]"
          >
            {isSigning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing...
              </>
            ) : (
              'Sign Transaction'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
```

### Account Switcher
```tsx
// AccountSwitcher.tsx - Multi-account management
export const AccountSwitcher: React.FC = () => {
  const { user, connect, disconnect } = useWallet();
  const [savedAccounts, setSavedAccounts] = useState<string[]>([]);

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem('hive-accounts') || '[]');
    setSavedAccounts(accounts);
  }, []);

  const addAccount = (username: string) => {
    const accounts = [...savedAccounts];
    if (!accounts.includes(username)) {
      accounts.push(username);
      setSavedAccounts(accounts);
      localStorage.setItem('hive-accounts', JSON.stringify(accounts));
    }
  };

  const removeAccount = (username: string) => {
    const accounts = savedAccounts.filter(acc => acc !== username);
    setSavedAccounts(accounts);
    localStorage.setItem('hive-accounts', JSON.stringify(accounts));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" />
          {user?.name || 'Select Account'}
          <ChevronDown className="ml-auto h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {user && (
          <>
            <DropdownMenuItem disabled>
              <Badge variant="secondary" className="mr-2">Connected</Badge>
              @{user.name}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {savedAccounts
          .filter(acc => acc !== user?.name)
          .map(account => (
            <DropdownMenuItem
              key={account}
              onClick={() => connect(account)}
            >
              <User className="mr-2 h-4 w-4" />
              @{account}
            </DropdownMenuItem>
          ))}

        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => connect()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Account
        </DropdownMenuItem>

        {user && (
          <DropdownMenuItem 
            onClick={disconnect}
            className="text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
```

## Security Considerations

### Key Management
```tsx
// Secure key handling principles
const SecurityGuidelines = {
  // Never store private keys in component state
  NEVER_STORE_KEYS: 'Use HiveKeychain for all key operations',
  
  // Always validate signatures
  VALIDATE_SIGNATURES: 'Verify all transaction signatures',
  
  // Use appropriate key types
  KEY_PERMISSIONS: {
    posting: ['social', 'voting', 'custom_json'],
    active: ['transfers', 'power_up', 'market_orders'],
    owner: ['account_recovery', 'key_changes'],
  },
  
  // Implement timeouts
  TRANSACTION_TIMEOUT: 30000,
  
  // Rate limiting
  MAX_REQUESTS_PER_MINUTE: 10,
};
```

### Input Validation
```tsx
// Validate all user inputs
const validateHiveUsername = (username: string): boolean => {
  const pattern = /^[a-z0-9-]{3,16}$/;
  return pattern.test(username) && !username.includes('--');
};

const validateAmount = (amount: string, precision: number): boolean => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0 && num.toFixed(precision) === amount;
};
```

## Testing Strategies

### Wallet Connection Testing
```tsx
describe('WalletConnector', () => {
  beforeEach(() => {
    // Mock HiveKeychain
    (global as any).window = {
      hive_keychain: {
        requestHandshake: jest.fn(),
        requestBroadcast: jest.fn(),
      },
    };
  });

  it('connects wallet successfully', async () => {
    const mockResponse = { success: true, data: { username: 'testuser' } };
    window.hive_keychain.requestHandshake.mockImplementation(cb => cb(mockResponse));

    render(<WalletConnector />);
    
    fireEvent.click(screen.getByText('Connect Wallet'));
    
    await waitFor(() => {
      expect(screen.getByText('@testuser')).toBeInTheDocument();
    });
  });

  it('handles connection errors gracefully', async () => {
    const mockResponse = { success: false, message: 'User rejected' };
    window.hive_keychain.requestHandshake.mockImplementation(cb => cb(mockResponse));

    render(<WalletConnector />);
    
    fireEvent.click(screen.getByText('Connect Wallet'));
    
    await waitFor(() => {
      expect(screen.getByText(/user rejected/i)).toBeInTheDocument();
    });
  });
});
```

### Transaction Testing
```tsx
describe('TransactionSigner', () => {
  it('displays transaction preview correctly', async () => {
    const operations = [
      ['transfer', {
        from: 'alice',
        to: 'bob',
        amount: '10.000 HIVE',
        memo: 'Test transfer'
      }]
    ];

    render(<TransactionSigner operations={operations} />);
    
    expect(screen.getByText('Transfer')).toBeInTheDocument();
    expect(screen.getByText('10.000 HIVE')).toBeInTheDocument();
    expect(screen.getByText('alice → bob')).toBeInTheDocument();
  });
});
```

## Performance Optimization

### Connection Persistence
```tsx
// Efficient connection state management
const usePersistedConnection = () => {
  const [connectionState, setConnectionState] = useLocalStorage('wallet-connection', {
    username: null,
    lastConnected: null,
  });

  const shouldAutoConnect = useMemo(() => {
    if (!connectionState.username || !connectionState.lastConnected) return false;
    
    // Auto-connect if last connection was within 24 hours
    const twentyFourHours = 24 * 60 * 60 * 1000;
    return Date.now() - connectionState.lastConnected < twentyFourHours;
  }, [connectionState]);

  return { connectionState, setConnectionState, shouldAutoConnect };
};
```

### Balance Caching
```tsx
// Smart balance caching with background updates
const useSmartBalanceCache = (username: string) => {
  return useQuery({
    queryKey: ['balances', username],
    queryFn: () => fetchAllBalances(username),
    staleTime: 30000, // Data is fresh for 30 seconds
    cacheTime: 300000, // Keep in cache for 5 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
```

## Future Enhancements

Planned improvements:
- Hardware wallet support (Ledger, etc.)
- Mobile wallet integration (Hive Wallet, etc.)
- Multi-signature support
- Batch transaction optimization
- Enhanced security monitoring
- Wallet analytics and insights