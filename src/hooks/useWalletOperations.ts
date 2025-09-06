// src/hooks/useWalletOperations.ts
import { useCallback } from 'react';

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
  const transfer = useCallback(
    async (params: TransferParams, authMethod: 'keychain' | 'hivesigner' | null) => {
      if (!authMethod) {
        throw new Error('No wallet connected');
      }

      if (authMethod === 'keychain') {
        // Hive Keychain transfer
        return new Promise<KeychainResponse>((resolve, reject) => {
          if (!(window as any).hive_keychain) {
            reject(new Error('Hive Keychain not installed'));
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
              if (response.success) {
                resolve(response);
              } else {
                reject(new Error(response.message || 'Transfer failed'));
              }
            }
          );
        });
      } else {
        // HiveSigner transfer
        // This would need to be implemented with the proper HiveSigner client
        throw new Error('HiveSigner transfer not implemented');
      }
    },
    []
  );

  const signBuffer = useCallback(
    async (params: SignBufferParams, authMethod: 'keychain' | 'hivesigner' | null) => {
      if (!authMethod) {
        throw new Error('No wallet connected');
      }

      if (authMethod === 'keychain') {
        // Hive Keychain sign buffer
        return new Promise<KeychainResponse>((resolve, reject) => {
          if (!(window as any).hive_keychain) {
            reject(new Error('Hive Keychain not installed'));
            return;
          }

          const keychain = (window as any).hive_keychain;
          keychain.requestSignBuffer(
            params.username,
            params.message,
            params.keyType,
            (response: KeychainResponse) => {
              if (response.success) {
                resolve(response);
              } else {
                reject(new Error(response.message || 'Sign buffer failed'));
              }
            }
          );
        });
      } else {
        // HiveSigner sign buffer
        // This would need to be implemented with the proper HiveSigner client
        throw new Error('HiveSigner sign buffer not implemented');
      }
    },
    []
  );

  const broadcast = useCallback(
    async (username: string, operations: any[], keyType: 'Posting' | 'Active', authMethod: 'keychain' | 'hivesigner' | null) => {
      if (!authMethod) {
        throw new Error('No wallet connected');
      }

      if (authMethod === 'keychain') {
        // Hive Keychain broadcast
        return new Promise<KeychainResponse>((resolve, reject) => {
          if (!(window as any).hive_keychain) {
            reject(new Error('Hive Keychain not installed'));
            return;
          }

          const keychain = (window as any).hive_keychain;
          keychain.requestBroadcast(
            username,
            operations,
            keyType,
            (response: KeychainResponse) => {
              if (response.success) {
                resolve(response);
              } else {
                reject(new Error(response.message || 'Broadcast failed'));
              }
            }
          );
        });
      } else {
        // HiveSigner broadcast
        // This would need to be implemented with the proper HiveSigner client
        throw new Error('HiveSigner broadcast not implemented');
      }
    },
    []
  );

  return {
    transfer,
    signBuffer,
    broadcast
  };
}