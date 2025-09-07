// src/hooks/useWalletOperations.ts
import { useCallback } from 'react';
import { useNotification } from '@/providers/NotificationProvider';

interface TransferParams {
  username: string;
  to: string;
  amount: string;
  currency: 'HIVE' | 'HBD';
  memo?: string;
}

interface SignBufferParams {
  username: string;
  message: string;
  keyType: 'Posting' | 'Active' | 'Memo';
}

// Define the response interface for Hive Keychain operations
export interface KeychainResponse {
  success: boolean;
  message?: string;
  error?: string;
  result?: any;
  data?: any;
  id?: string;
  publicKey?: string;
  encoding?: string;
  signature?: string;
}

export function useWalletOperations() {
  const { success: successNotification, error: errorNotification } = useNotification();

  const transfer = useCallback(
    async (params: TransferParams, authMethod: 'keychain' | 'hivesigner' | null) => {
      if (!authMethod) {
        const errorMsg = 'No wallet connected';
        errorNotification(errorMsg);
        throw new Error(errorMsg);
      }

      if (authMethod === 'keychain') {
        // Hive Keychain transfer
        return new Promise<KeychainResponse>((resolve, reject) => {
          if (!(window as any).hive_keychain) {
            const errorMsg = 'Hive Keychain not installed';
            errorNotification(errorMsg);
            reject(new Error(errorMsg));
            return;
          }

          const keychain = (window as any).hive_keychain;
          keychain.requestTransfer(
            params.username,
            params.to,
            params.amount,
            params.memo || '',
            params.currency,
            (response: KeychainResponse) => {
              console.log('[useWalletOperations] Transfer response:', response);
              if (response && response.success) {
                successNotification(`Successfully sent ${params.amount} ${params.currency} to @${params.to}`);
                resolve(response);
              } else {
                const errorMessage = response?.message || response?.error || 'Transfer failed';
                errorNotification(errorMessage);
                reject(new Error(errorMessage));
              }
            }
          );
        });
      } else {
        // HiveSigner transfer
        // This would need to be implemented with the proper HiveSigner client
        const errorMsg = 'HiveSigner transfer not implemented';
        errorNotification(errorMsg);
        throw new Error(errorMsg);
      }
    },
    [successNotification, errorNotification]
  );

  const signBuffer = useCallback(
    async (params: SignBufferParams, authMethod: 'keychain' | 'hivesigner' | null) => {
      if (!authMethod) {
        const errorMsg = 'No wallet connected';
        errorNotification(errorMsg);
        throw new Error(errorMsg);
      }

      if (authMethod === 'keychain') {
        // Hive Keychain sign buffer
        return new Promise<KeychainResponse>((resolve, reject) => {
          if (!(window as any).hive_keychain) {
            const errorMsg = 'Hive Keychain not installed';
            errorNotification(errorMsg);
            reject(new Error(errorMsg));
            return;
          }

          const keychain = (window as any).hive_keychain;
          keychain.requestSignBuffer(
            params.username,
            params.message,
            params.keyType,
            (response: KeychainResponse) => {
              if (response && response.success) {
                successNotification('Successfully signed message');
                resolve(response);
              } else {
                const errorMessage = response?.message || response?.error || 'Sign buffer failed';
                errorNotification(errorMessage);
                reject(new Error(errorMessage));
              }
            }
          );
        });
      } else {
        // HiveSigner sign buffer
        // This would need to be implemented with the proper HiveSigner client
        const errorMsg = 'HiveSigner sign buffer not implemented';
        errorNotification(errorMsg);
        throw new Error(errorMsg);
      }
    },
    [successNotification, errorNotification]
  );

  const broadcast = useCallback(
    async (username: string, operations: any[], keyType: 'Posting' | 'Active', authMethod: 'keychain' | 'hivesigner' | null) => {
      if (!authMethod) {
        const errorMsg = 'No wallet connected';
        errorNotification(errorMsg);
        throw new Error(errorMsg);
      }

      if (authMethod === 'keychain') {
        // Hive Keychain broadcast
        return new Promise<KeychainResponse>((resolve, reject) => {
          if (!(window as any).hive_keychain) {
            const errorMsg = 'Hive Keychain not installed';
            errorNotification(errorMsg);
            reject(new Error(errorMsg));
            return;
          }

          const keychain = (window as any).hive_keychain;
          keychain.requestBroadcast(
            username,
            operations,
            keyType,
            (response: KeychainResponse) => {
              if (response && response.success) {
                successNotification('Transaction broadcast successfully');
                resolve(response);
              } else {
                const errorMessage = response?.message || response?.error || 'Broadcast failed';
                errorNotification(errorMessage);
                reject(new Error(errorMessage));
              }
            }
          );
        });
      } else {
        // HiveSigner broadcast
        // This would need to be implemented with the proper HiveSigner client
        const errorMsg = 'HiveSigner broadcast not implemented';
        errorNotification(errorMsg);
        throw new Error(errorMsg);
      }
    },
    [successNotification, errorNotification]
  );

  return {
    transfer,
    signBuffer,
    broadcast
  };
}