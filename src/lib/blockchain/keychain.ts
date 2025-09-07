import { KeychainSDK } from 'keychain-sdk';
import { KeychainKeyTypes } from 'hive-keychain-commons/lib/interfaces/keychain';
import type { Operation } from '@/types';

interface KeychainRequest {
  username: string;
  message?: string;
  method?: string;
  params?: any;
  type: 'Posting' | 'Active' | 'Memo';
}

interface TransactionData {
  operations: Operation[];
  keyType: 'Posting' | 'Active';
  broadcast: boolean;
}

class KeychainManager {
  private static instance: KeychainManager;
  private keychain: KeychainSDK | null = null;
  private checkInterval: NodeJS.Timeout | null = null;
  private listeners: Set<(installed: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      console.log('[KeychainManager] Constructor called');
      this.initializeKeychain();
      this.startMonitoring();
    }
  }

  static getInstance(): KeychainManager {
    if (!KeychainManager.instance) {
      KeychainManager.instance = new KeychainManager();
    }
    return KeychainManager.instance;
  }

  private initializeKeychain(): void {
    console.log('[KeychainManager] Initializing keychain with SDK');
    
    try {
      // Create KeychainSDK instance
      this.keychain = new KeychainSDK(window);
      console.log('[KeychainManager] KeychainSDK instance created');
    } catch (error) {
      console.error('[KeychainManager] Failed to create KeychainSDK instance:', error);
      this.keychain = null;
    }
  }

  private startMonitoring(): void {
    console.log('[KeychainManager] Starting keychain monitoring');
    
    // Check for keychain installation every 2 seconds
    this.checkInterval = setInterval(async () => {
      const wasInstalled = this.lastKnownState;
      const isInstalled = await this.checkKeychainInstalled();
      
      if (wasInstalled !== isInstalled) {
        console.log(`[KeychainManager] Keychain installation status changed: ${wasInstalled} -> ${isInstalled}`);
        this.lastKnownState = isInstalled;
        this.notifyListeners(isInstalled);
      }
    }, 2000);
  }

  private lastKnownState = false;

  private async checkKeychainInstalled(): Promise<boolean> {
    try {
      if (!this.keychain) return false;
      return await this.keychain.isKeychainInstalled();
    } catch (error) {
      console.error('[KeychainManager] Error checking keychain installation:', error);
      return false;
    }
  }

  private notifyListeners(installed: boolean): void {
    console.log(`[KeychainManager] Notifying ${this.listeners.size} listeners about keychain status: ${installed}`);
    this.listeners.forEach(listener => listener(installed));
  }

  // Public methods
  async isInstalled(): Promise<boolean> {
    try {
      if (!this.keychain) return false;
      const installed = await this.keychain.isKeychainInstalled();
      console.log(`[KeychainManager] isInstalled check: ${installed}`);
      return installed;
    } catch (error) {
      console.error('[KeychainManager] Error checking if keychain is installed:', error);
      return false;
    }
  }

  getVersion(): string | null {
    // KeychainSDK doesn't expose version directly
    return 'Unknown';
  }

  getInstallationUrl(): string {
    return 'https://chrome.google.com/webstore/detail/hive-keychain/jcacnejopjdphbnjgfaaobbfafkihpep';
  }

  onInstallationChange(callback: (installed: boolean) => void): () => void {
    console.log('[KeychainManager] Adding installation change listener');
    this.listeners.add(callback);
    // Return unsubscribe function
    return () => {
      console.log('[KeychainManager] Removing installation change listener');
      this.listeners.delete(callback);
    };
  }

  async getAccounts(): Promise<{ name: string }[]> {
    console.log('[KeychainManager] getAccounts called');
    
    // For now, return empty array since KeychainSDK doesn't have direct account listing
    // User will need to provide username manually
    console.log('[KeychainManager] KeychainSDK does not support direct account listing');
    return [];
  }

  async requestBroadcast(
    username: string,
    operations: Operation[],
    keyType: 'Posting' | 'Active' = 'Posting'
  ): Promise<any> {
    console.log(`[KeychainManager] requestBroadcast called for user: ${username}`);
    
    if (!this.keychain) {
      throw new Error('HiveKeychain SDK not initialized');
    }

    const installed = await this.isInstalled();
    if (!installed) {
      throw new Error('HiveKeychain extension not installed');
    }

    try {
      const result = await this.keychain.broadcast({
        username,
        operations,
        method: keyType === 'Posting' ? KeychainKeyTypes.posting : KeychainKeyTypes.active
      });

      if (result.success) {
        return result.result;
      } else {
        throw new Error(result.message || 'Transaction failed');
      }
    } catch (error) {
      console.error('[KeychainManager] Broadcast error:', error);
      throw error;
    }
  }

  async requestSignBuffer(
    username: string,
    message: string,
    keyType: 'Posting' | 'Active' = 'Posting'
  ): Promise<any> {
    console.log(`[KeychainManager] requestSignBuffer called for user: ${username}`);
    
    if (!this.keychain) {
      throw new Error('HiveKeychain SDK not initialized');
    }

    const installed = await this.isInstalled();
    if (!installed) {
      throw new Error('HiveKeychain extension not installed');
    }

    try {
      // Try using the direct window.hive_keychain API if SDK doesn't work
      if (typeof window !== 'undefined' && (window as any).hive_keychain) {
        console.log('[KeychainManager] Using direct window.hive_keychain API');
        
        return new Promise((resolve, reject) => {
          (window as any).hive_keychain.requestSignBuffer(
            username,
            message,
            keyType,
            (response: any) => {
              console.log('[KeychainManager] Direct API response:', response);
              if (response.success) {
                resolve(response);
              } else {
                reject(new Error(response.message || 'Sign buffer failed'));
              }
            }
          );
        });
      }

      // Fallback to SDK
      console.log('[KeychainManager] Using KeychainSDK');
      const result = await this.keychain.signBuffer({
        username,
        message,
        method: keyType === 'Posting' ? KeychainKeyTypes.posting : KeychainKeyTypes.active
      });

      if (result.success) {
        return result;
      } else {
        throw new Error(result.message || 'Sign buffer failed');
      }
    } catch (error) {
      console.error('[KeychainManager] Sign buffer error:', error);
      throw error;
    }
  }

  /**
   * Follow a user on Hive
   */
  async followUser(follower: string, following: string): Promise<any> {
    console.log(`[KeychainManager] followUser called: ${follower} -> ${following}`);
    
    if (!this.keychain) {
      throw new Error('HiveKeychain SDK not initialized');
    }

    const installed = await this.isInstalled();
    if (!installed) {
      throw new Error('HiveKeychain extension not installed');
    }

    // Create the follow operation
    const followOp: Operation = [
      'custom_json',
      {
        required_auths: [],
        required_posting_auths: [follower],
        id: 'follow',
        json: JSON.stringify([
          'follow',
          {
            follower,
            following,
            what: ['blog'] // Follow type
          }
        ])
      }
    ];

    try {
      // Try using the direct window.hive_keychain API if SDK doesn't work
      if (typeof window !== 'undefined' && (window as any).hive_keychain) {
        console.log('[KeychainManager] Using direct window.hive_keychain API for follow');
        
        return new Promise((resolve, reject) => {
          (window as any).hive_keychain.requestBroadcast(
            follower,
            [followOp],
            'Posting',
            (response: any) => {
              console.log('[KeychainManager] Direct API follow response:', response);
              if (response.success) {
                // Show success notification if available
                if (typeof window !== 'undefined' && (window as any).toast) {
                  (window as any).toast.success(`Successfully followed @${following}`);
                }
                resolve(response);
              } else {
                // Show error notification if available
                if (typeof window !== 'undefined' && (window as any).toast) {
                  (window as any).toast.error(response.message || 'Follow operation failed');
                }
                reject(new Error(response.message || 'Follow operation failed'));
              }
            }
          );
        });
      }

      // Fallback to SDK
      console.log('[KeychainManager] Using KeychainSDK for follow');
      const result = await this.keychain.broadcast({
        username: follower,
        operations: [followOp],
        method: KeychainKeyTypes.posting
      });

      if (result.success) {
        // Show success notification if available
        if (typeof window !== 'undefined' && (window as any).toast) {
          (window as any).toast.success(`Successfully followed @${following}`);
        }
        return result.result;
      } else {
        // Show error notification if available
        if (typeof window !== 'undefined' && (window as any).toast) {
          (window as any).toast.error(result.message || 'Follow operation failed');
        }
        throw new Error(result.message || 'Follow operation failed');
      }
    } catch (error) {
      console.error('[KeychainManager] Follow error:', error);
      // Show error notification if available
      if (typeof window !== 'undefined' && (window as any).toast) {
        (window as any).toast.error((error as Error).message || 'Follow operation failed');
      }
      throw error;
    }
  }

  /**
   * Unfollow a user on Hive
   */
  async unfollowUser(follower: string, following: string): Promise<any> {
    console.log(`[KeychainManager] unfollowUser called: ${follower} -> ${following}`);
    
    if (!this.keychain) {
      throw new Error('HiveKeychain SDK not initialized');
    }

    const installed = await this.isInstalled();
    if (!installed) {
      throw new Error('HiveKeychain extension not installed');
    }

    // Create the unfollow operation (same as follow but with empty what array)
    const unfollowOp: Operation = [
      'custom_json',
      {
        required_auths: [],
        required_posting_auths: [follower],
        id: 'follow',
        json: JSON.stringify([
          'follow',
          {
            follower,
            following,
            what: [] // Empty array means unfollow
          }
        ])
      }
    ];

    try {
      // Try using the direct window.hive_keychain API if SDK doesn't work
      if (typeof window !== 'undefined' && (window as any).hive_keychain) {
        console.log('[KeychainManager] Using direct window.hive_keychain API for unfollow');
        
        return new Promise((resolve, reject) => {
          (window as any).hive_keychain.requestBroadcast(
            follower,
            [unfollowOp],
            'Posting',
            (response: any) => {
              console.log('[KeychainManager] Direct API unfollow response:', response);
              if (response.success) {
                // Show success notification if available
                if (typeof window !== 'undefined' && (window as any).toast) {
                  (window as any).toast.success(`Successfully unfollowed @${following}`);
                }
                resolve(response);
              } else {
                // Show error notification if available
                if (typeof window !== 'undefined' && (window as any).toast) {
                  (window as any).toast.error(response.message || 'Unfollow operation failed');
                }
                reject(new Error(response.message || 'Unfollow operation failed'));
              }
            }
          );
        });
      }

      // Fallback to SDK
      console.log('[KeychainManager] Using KeychainSDK for unfollow');
      const result = await this.keychain.broadcast({
        username: follower,
        operations: [unfollowOp],
        method: KeychainKeyTypes.posting
      });

      if (result.success) {
        // Show success notification if available
        if (typeof window !== 'undefined' && (window as any).toast) {
          (window as any).toast.success(`Successfully unfollowed @${following}`);
        }
        return result.result;
      } else {
        // Show error notification if available
        if (typeof window !== 'undefined' && (window as any).toast) {
          (window as any).toast.error(result.message || 'Unfollow operation failed');
        }
        throw new Error(result.message || 'Unfollow operation failed');
      }
    } catch (error) {
      console.error('[KeychainManager] Unfollow error:', error);
      // Show error notification if available
      if (typeof window !== 'undefined' && (window as any).toast) {
        (window as any).toast.error((error as Error).message || 'Unfollow operation failed');
      }
      throw error;
    }
  }

  forceDetection(): void {
    console.log('[KeychainManager] Forcing keychain detection');
    this.initializeKeychain();
  }

  destroy(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    this.listeners.clear();
  }
}

// Create and export singleton instance
export const keychain = KeychainManager.getInstance();

// Export utility functions
export const forceKeychainDetection = () => {
  keychain.forceDetection();
};

// Export types
export type { KeychainRequest, TransactionData };

// Create a hiveKeychainAPI object for backward compatibility
export const hiveKeychainAPI = {
  followUser: keychain.followUser.bind(keychain),
  unfollowUser: keychain.unfollowUser.bind(keychain)
};

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    keychain.destroy();
  });
}
