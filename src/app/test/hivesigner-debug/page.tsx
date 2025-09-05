
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { fixHiveSignerFetchContext, createHiveSignerClient } from '@/lib/hivesigner-utils';

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
    for(let i = 0; i < ca.length; i++) {
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

export default function HiveSignerDebug() {
  const [hivesignerAvailable, setHivesignerAvailable] = useState(false);
  const [clientInitialized, setClientInitialized] = useState(false);
  const [authStatus, setAuthStatus] = useState('unknown');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    // Fix fetch context issue first
    fixHiveSignerFetchContext();
    
    // Only run on client side
    if (typeof window !== 'undefined') {
      setHivesignerAvailable(true);
      
      // Initialize client using utility function
      createHiveSignerClient({
        callbackURL: 'http://localhost:3000/test/hivesigner-debug',
        scope: ['login'],
      })
        .then((clientInstance: any) => {
          setClient(clientInstance);
          setClientInitialized(true);
          
          // Check for access token in cookies
          const accessToken = getCookie('hivesigner_access_token');
          
          if (accessToken) {
            try {
              clientInstance.setAccessToken(accessToken);
              
              // Wrap the me() call with proper error handling
              setTimeout(() => {
                clientInstance.me((err: any, result: any) => {
                  if (err) {
                    console.error('client.me error (with accessToken):', err);
                    setAuthStatus('error');
                    setError(err.message || err.toString() || 'Authentication failed');
                    // Remove invalid token
                    removeCookie('hivesigner_access_token');
                  } else if (result) {
                    setAuthStatus('authenticated');
                    setUser(result);
                  } else {
                    setAuthStatus('unauthenticated');
                  }
                });
              }, 200); // Increased delay for better stability
              
            } catch (err) {
              console.error('Failed to set access token:', err);
              setError('Failed to set access token: ' + (err as Error).message);
              setAuthStatus('error');
              removeCookie('hivesigner_access_token');
            }
          } else {
            // Try to check auth status without token
            setTimeout(() => {
              clientInstance.me((err: any, result: any) => {
                if (err) {
                  console.error('client.me error (no accessToken):', err);
                  // This is expected when not authenticated, so don't show as error
                  setAuthStatus('unauthenticated');
                } else if (result) {
                  setAuthStatus('authenticated');
                  setUser(result);
                } else {
                  setAuthStatus('unauthenticated');
                }
              });
            }, 200);
          }
        })
        .catch((e: any) => {
          console.error('Failed to initialize hivesigner:', e);
          setError('Failed to initialize hivesigner: ' + e.message);
          setAuthStatus('error');
        });
    }
  }, []);

  const handleLogin = () => {
    if (!client) {
      setError('HiveSigner client not initialized');
      return;
    }
    
    try {
      setError(null); // Clear any previous errors
      
      const loginURL = client.getLoginURL('debug-state');
      console.log('Redirecting to login URL:', loginURL);
      
      window.location.href = loginURL;
    } catch (e) {
      console.error('Failed to login:', e);
      setError('Failed to login: ' + (e as Error).message);
    }
  };

  const handleLogout = () => {
    if (!client) {
      // If no client, just clear local state
      setAuthStatus('unauthenticated');
      setUser(null);
      removeCookie('hivesigner_access_token');
      return;
    }
    
    try {
      setError(null); // Clear any previous errors
      
      const accessToken = getCookie('hivesigner_access_token');
      
      if (accessToken) {
        client.setAccessToken(accessToken);
        client.revokeToken((err: any, result: any) => {
          if (err) {
            console.error('Logout error:', err);
            // Even if revoke fails, we should clear local state
          }
          
          // Always clear local state regardless of revoke result
          setAuthStatus('unauthenticated');
          setUser(null);
          removeCookie('hivesigner_access_token');
        });
      } else {
        // No token to revoke, just clear local state
        setAuthStatus('unauthenticated');
        setUser(null);
        removeCookie('hivesigner_access_token');
      }
    } catch (e) {
      console.error('Failed to logout:', e);
      setError('Failed to logout: ' + (e as Error).message);
      
      // Even if logout fails, clear local state
      setAuthStatus('unauthenticated');
      setUser(null);
      removeCookie('hivesigner_access_token');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">HiveSigner Debug</h1>
          <p className="text-muted-foreground">
            Debugging HiveSigner integration
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Library Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Library Available:</span>
                <span className={hivesignerAvailable ? 'text-green-600' : 'text-red-600'}>
                  {hivesignerAvailable ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Client Initialized:</span>
                <span className={clientInitialized ? 'text-green-600' : 'text-red-600'}>
                  {clientInitialized ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Authentication Status:</span>
                <span className={
                  authStatus === 'authenticated' ? 'text-green-600' : 
                  authStatus === 'unauthenticated' ? 'text-yellow-600' : 
                  authStatus === 'error' ? 'text-red-600' : 'text-gray-600'
                }>
                  {authStatus}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Error</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {user && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded overflow-auto max-h-40 text-sm">
                {JSON.stringify(user, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button onClick={handleLogin} disabled={!hivesignerAvailable}>
                Login with HiveSigner
              </Button>
              <Button onClick={handleLogout} variant="outline" disabled={!hivesignerAvailable || authStatus !== 'authenticated'}>
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}