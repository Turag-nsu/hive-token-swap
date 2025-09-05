// HiveSigner utilities and context fixes
"use client";

/**
 * Fix for HiveSigner fetch context binding issue
 * This ensures that fetch calls maintain proper window context
 */
export function fixHiveSignerFetchContext() {
  if (typeof window !== 'undefined') {
    // Fix fetch context binding
    if (window.fetch && !window.fetch.toString().includes('[native code]')) {
      const originalFetch = window.fetch;
      
      // Bind fetch to window context to prevent "Illegal invocation" errors
      window.fetch = function(...args: Parameters<typeof fetch>): Promise<Response> {
        return originalFetch.apply(window, args);
      };
    }
    
    // Also handle XMLHttpRequest if needed
    if (window.XMLHttpRequest) {
      const originalXHR = window.XMLHttpRequest;
      
      // Ensure XMLHttpRequest maintains proper context
      if (!window.XMLHttpRequest.toString().includes('[native code]')) {
        window.XMLHttpRequest = function() {
          return new originalXHR();
        } as any;
      }
    }
    
    // Additional fix for potential issues with other network methods
    if (window.Request && !window.Request.toString().includes('[native code]')) {
      const originalRequest = window.Request;
      window.Request = function(input: RequestInfo | URL, init?: RequestInit) {
        return new originalRequest(input, init);
      } as any;
    }
  }
}

/**
 * Create a bound method wrapper for HiveSigner client methods
 * This prevents "Illegal invocation" errors when methods lose their context
 */
export function createBoundHiveSignerMethods(client: any) {
  return {
    me: client.me.bind(client),
    revokeToken: client.revokeToken.bind(client),
    sign: client.sign ? client.sign.bind(client) : undefined,
    broadcast: client.broadcast ? client.broadcast.bind(client) : undefined,
    vote: client.vote ? client.vote.bind(client) : undefined,
    comment: client.comment ? client.comment.bind(client) : undefined,
    transfer: client.transfer ? client.transfer.bind(client) : undefined,
    // Add other commonly used methods as needed
  };
}

/**
 * Initialize HiveSigner with proper error handling and context fixes
 */
export async function initializeHiveSigner() {
  if (typeof window === 'undefined') {
    throw new Error('HiveSigner can only be initialized in browser environment');
  }
  
  // Apply fetch context fix
  fixHiveSignerFetchContext();
  
  try {
    // Dynamic import to ensure client-side only
    const hivesignerModule = await import('hivesigner');
    return hivesignerModule.default;
  } catch (error) {
    console.error('Failed to load HiveSigner:', error);
    throw new Error('Failed to load HiveSigner library');
  }
}

/**
 * Safe wrapper for HiveSigner client methods
 */
export function safeHiveSignerCall<T>(
  fn: () => Promise<T> | T,
  fallback?: T
): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      // Add small delay to ensure proper context
      setTimeout(async () => {
        try {
          const result = await fn();
          resolve(result);
        } catch (error) {
          if (fallback !== undefined) {
            resolve(fallback);
          } else {
            reject(error);
          }
        }
      }, 50);
    } catch (error) {
      if (fallback !== undefined) {
        resolve(fallback);
      } else {
        reject(error);
      }
    }
  });
}

/**
 * Create HiveSigner client with proper configuration
 */
export function createHiveSignerClient(config: {
  app?: string;
  callbackURL: string;
  scope: string[];
  accessToken?: string;
}) {
  return new Promise((resolve, reject) => {
    // Apply fetch context fix first
    fixHiveSignerFetchContext();
    
    initializeHiveSigner()
      .then((HiveSigner) => {
        try {
          const clientConfig: any = {
            callbackURL: config.callbackURL,
            scope: config.scope,
          };
          
          if (config.app && config.app.trim() !== '') {
            clientConfig.app = config.app;
          }
          
          const client = new HiveSigner.Client(clientConfig);
          
          if (config.accessToken) {
            try {
              client.setAccessToken(config.accessToken);
            } catch (tokenError) {
              console.warn('Failed to set access token during client creation:', tokenError);
            }
          }
          
          // Add a small delay to ensure client is fully initialized
          setTimeout(() => {
            resolve(client);
          }, 50);
        } catch (error) {
          reject(error);
        }
      })
      .catch(reject);
  });
}