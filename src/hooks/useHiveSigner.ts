// src/hooks/useHiveSigner.ts
import { useState, useCallback } from 'react';
import { useHiveSigner } from '@/providers/HiveSignerProvider';

export function useHiveSignerAuth() {
  const { user, isAuthenticated, isLoading, login, logout, refreshUser } = useHiveSigner();
  
  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshUser
  };
}

export function useHiveSignerOperations() {
  const [isOperationLoading, setIsOperationLoading] = useState(false);
  const [operationError, setOperationError] = useState<string | null>(null);
  const { user, isAuthenticated } = useHiveSigner();

  const executeOperation = useCallback(
    (operation: (callback: (err: any, res: any) => void) => void) => {
      return new Promise((resolve, reject) => {
        setIsOperationLoading(true);
        setOperationError(null);
        
        if (!isAuthenticated) {
          setIsOperationLoading(false);
          setOperationError('User not authenticated');
          reject(new Error('User not authenticated'));
          return;
        }
        
        operation((err: any, res: any) => {
          setIsOperationLoading(false);
          if (err) {
            setOperationError(err.message || 'Operation failed');
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    },
    [isAuthenticated]
  );

  const vote = useCallback(
    (voter: string, author: string, permlink: string, weight: number) => {
      return executeOperation((callback) => {
        // This would need to be implemented with the proper HiveSigner client
        // For now, we'll simulate the operation
        console.warn('Vote operation not fully implemented');
        callback(null, { success: true });
      });
    },
    [executeOperation]
  );

  const comment = useCallback(
    (
      parentAuthor: string,
      parentPermlink: string,
      author: string,
      permlink: string,
      title: string,
      body: string,
      jsonMetadata: string
    ) => {
      return executeOperation((callback) => {
        // This would need to be implemented with the proper HiveSigner client
        // For now, we'll simulate the operation
        console.warn('Comment operation not fully implemented');
        callback(null, { success: true });
      });
    },
    [executeOperation]
  );

  const customJson = useCallback(
    (
      requiredAuths: string[],
      requiredPostingAuths: string[],
      id: string,
      json: string
    ) => {
      return executeOperation((callback) => {
        // This would need to be implemented with the proper HiveSigner client
        // For now, we'll simulate the operation
        console.warn('Custom JSON operation not fully implemented');
        callback(null, { success: true });
      });
    },
    [executeOperation]
  );

  const reblog = useCallback(
    (account: string, author: string, permlink: string) => {
      return executeOperation((callback) => {
        // This would need to be implemented with the proper HiveSigner client
        // For now, we'll simulate the operation
        console.warn('Reblog operation not fully implemented');
        callback(null, { success: true });
      });
    },
    [executeOperation]
  );

  const follow = useCallback(
    (follower: string, following: string) => {
      return executeOperation((callback) => {
        // This would need to be implemented with the proper HiveSigner client
        // For now, we'll simulate the operation
        console.warn('Follow operation not fully implemented');
        callback(null, { success: true });
      });
    },
    [executeOperation]
  );

  const unfollow = useCallback(
    (unfollower: string, unfollowing: string) => {
      return executeOperation((callback) => {
        // This would need to be implemented with the proper HiveSigner client
        // For now, we'll simulate the operation
        console.warn('Unfollow operation not fully implemented');
        callback(null, { success: true });
      });
    },
    [executeOperation]
  );

  return {
    isOperationLoading,
    operationError,
    vote,
    comment,
    customJson,
    reblog,
    follow,
    unfollow
  };
}