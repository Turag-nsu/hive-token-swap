// src/providers/HiveSignerProvider.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HIVESIGNER_CONFIG } from '@/constants';
import { HiveSignerUser } from '@/types';
import { fixHiveSignerFetchContext, createHiveSignerClient } from '@/lib/hivesigner-utils';

// Apply fetch context fix immediately
fixHiveSignerFetchContext();

interface HiveSignerContextType {
  user: HiveSignerUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  refreshUser: () => void;
}

const HiveSignerContext = createContext<HiveSignerContextType | undefined>(undefined);

interface HiveSignerProviderProps {
  children: ReactNode;
}

// Cookie utility functions
const setCookie = (name: string, value: string, days: number = 7) => {
  if (typeof document !== 'undefined') {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }
};

const getCookie = (name: string): string | null => {
  if (typeof document !== 'undefined') {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
};

const removeCookie = (name: string) => {
  if (typeof document !== 'undefined') {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
};

export function HiveSignerProvider({ children }: HiveSignerProviderProps) {
  const [user, setUser] = useState<HiveSignerUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    // Only initialize client on the client side
    if (typeof window !== 'undefined') {
      createHiveSignerClient({
        app: HIVESIGNER_CONFIG.APP_NAME,
        callbackURL: HIVESIGNER_CONFIG.CALLBACK_URL,
        scope: [...HIVESIGNER_CONFIG.SCOPE],
      })
        .then((clientInstance: any) => {
          setClient(clientInstance);

          // First, check if we have an access token in the URL (OAuth callback)
          const urlParams = new URLSearchParams(window.location.search);
          const urlAccessToken = urlParams.get('access_token');

          if (urlAccessToken) {
            console.log('Found access token in URL, storing it');
            // Store access token in cookie
            setCookie('hivesigner_access_token', urlAccessToken);

            // Set the access token and fetch user info
            try {
              clientInstance.setAccessToken(urlAccessToken);
              // Add delay to ensure proper initialization
              setTimeout(() => {
                checkAuthStatus(clientInstance);
              }, 200);
            } catch (error) {
              console.error('Failed to set access token from URL:', error);
              removeCookie('hivesigner_access_token');
              setIsLoading(false);
            }

            // Remove the access token from the URL
            window.history.replaceState({}, document.title, window.location.pathname);
          } else {
            // Check if we have an access token in cookies
            const cookieAccessToken = getCookie('hivesigner_access_token');

            if (cookieAccessToken) {
              console.log('Found access token in cookies, using it');
              // Set the access token and fetch user info
              try {
                clientInstance.setAccessToken(cookieAccessToken);
                // Add delay to ensure proper initialization
                setTimeout(() => {
                  checkAuthStatus(clientInstance);
                }, 200);
              } catch (error) {
                console.error('Failed to set access token from cookies:', error);
                removeCookie('hivesigner_access_token');
                setIsLoading(false);
              }
            } else {
              // No token available, just check if already authenticated
              console.log('No access token found, checking auth status');
              setTimeout(() => {
                checkAuthStatus(clientInstance);
              }, 200);
            }
          }
        })
        .catch((error) => {
          console.error('Failed to initialize HiveSigner:', error);
          setIsLoading(false);
        });
    }
  }, []);

  const checkAuthStatus = (clientInstance: any = client) => {
    if (!clientInstance || typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Ensure fetch context is properly bound before making requests
    fixHiveSignerFetchContext();

    // Add a delay to ensure proper context binding and initialization
    setTimeout(() => {
      try {
        // Check if client has an access token
        const accessToken = getCookie('hivesigner_access_token');

        if (accessToken) {
          // Set the access token before checking authentication
          try {
            clientInstance.setAccessToken(accessToken);
          } catch (tokenError) {
            console.error('Failed to set access token:', tokenError);
            removeCookie('hivesigner_access_token');
            setUser(null);
            setIsLoading(false);
            return;
          }
        }

        // Use bound method call to prevent "Illegal invocation" error
        const meMethod = clientInstance.me.bind(clientInstance);
        meMethod((err: any, result: HiveSignerUser) => {
          if (err) {
            console.error('HiveSigner auth check error:', err);
            setUser(null);
            // If error indicates invalid token, remove it
            if (err.message && (err.message.includes('token') || err.message.includes('unauthorized'))) {
              removeCookie('hivesigner_access_token');
            }
          } else if (result) {
            console.log('HiveSigner authentication successful:', result.user);
            setUser(result);
          } else {
            setUser(null);
          }
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Failed to check auth status:', error);
        setUser(null);
        setIsLoading(false);
      }
    }, 200); // Increased delay for better stability
  };

  const login = () => {
    if (client && typeof window !== 'undefined') {
      // Redirect to HiveSigner login page
      const loginURL = client.getLoginURL();
      window.location.href = loginURL;
    }
  };

  const logout = () => {
    if (client && typeof window !== 'undefined') {
      const accessToken = getCookie('hivesigner_access_token');

      if (accessToken) {
        try {
          // Ensure fetch context is properly bound
          fixHiveSignerFetchContext();

          client.setAccessToken(accessToken);
          // Use bound method call to prevent "Illegal invocation" error
          const revokeMethod = client.revokeToken.bind(client);
          revokeMethod((err: any) => {
            if (err) {
              console.error('HiveSigner logout failed:', err);
            }
            // Always clear local state regardless of revoke result
            setUser(null);
            removeCookie('hivesigner_access_token');
          });
        } catch (error) {
          console.error('Failed to revoke token:', error);
          // Still clear local state
          setUser(null);
          removeCookie('hivesigner_access_token');
        }
      } else {
        // No token to revoke, just clear local state
        setUser(null);
        removeCookie('hivesigner_access_token');
      }
    } else {
      setUser(null);
      removeCookie('hivesigner_access_token');
    }
  };

  const refreshUser = () => {
    checkAuthStatus();
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refreshUser
  };

  return (
    <HiveSignerContext.Provider value={value}>
      {children}
    </HiveSignerContext.Provider>
  );
}

export function useHiveSigner() {
  const context = useContext(HiveSignerContext);
  if (context === undefined) {
    throw new Error('useHiveSigner must be used within a HiveSignerProvider');
  }
  return context;
}