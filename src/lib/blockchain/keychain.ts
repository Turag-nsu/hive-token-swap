import { KeychainSDK } from 'keychain-sdk';
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
        method: keyType.toLowerCase() as any
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
        method: keyType.toLowerCase() as any
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

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    keychain.destroy();
  });
}

export type { KeychainRequest, TransactionData };