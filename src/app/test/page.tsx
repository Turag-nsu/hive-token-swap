'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Alert, AlertDescription } from '@/components/ui/Alert';

// Cookie utility functions
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

export default function HiveSignerTest() {
  const [hivesignerAvailable, setHivesignerAvailable] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Dynamically import hivesigner and check auth status
      const checkHiveSigner = async () => {
        try {
          const hivesignerModule = await import('hivesigner');
          console.log('Hivesigner module loaded:', hivesignerModule);

          if (hivesignerModule.default) {
            setHivesignerAvailable(true);

            // Initialize client
            const client = new hivesignerModule.default.Client({
              callbackURL: 'http://localhost:3000/test',
              scope: ['login'],
            });

            // Check for access token in cookies
            const accessToken = getCookie('hivesigner_access_token');

            if (accessToken) {
              // Set access token and check auth status
              try {
                client.setAccessToken(accessToken);
                client.me((err: any, result: any) => {
                  setIsLoading(false);
                  if (err || !result) {
                    setIsAuthenticated(false);
                    setUser(null);
                  } else {
                    setIsAuthenticated(true);
                    setUser(result);
                  }
                });
              } catch (err) {
                console.error('Failed to set access token:', err);
                setIsLoading(false);
              }
            } else {
              // Check if user is already authenticated
              client.me((err: any, result: any) => {
                setIsLoading(false);
                if (err || !result) {
                  setIsAuthenticated(false);
                  setUser(null);
                } else {
                  setIsAuthenticated(true);
                  setUser(result);
                }
              });
            }
          } else {
            setIsLoading(false);
          }
        } catch (e) {
          console.error('Failed to load hivesigner:', e);
          setIsLoading(false);
        }
      };

      checkHiveSigner();
    }
  }, []);

  const handleLogin = async () => {
    try {
      const hivesignerModule = await import('hivesigner');
      const client = new hivesignerModule.default.Client({
        callbackURL: 'http://localhost:3000/test',
        scope: ['login'],
      });

      // Redirect to login page
      const loginURL = client.getLoginURL('login-state');
      window.location.href = loginURL;
    } catch (e) {
      console.error('Failed to login:', e);
    }
  };

  const handleLogout = async () => {
    try {
      const hivesignerModule = await import('hivesigner');
      const client = new hivesignerModule.default.Client({
        callbackURL: 'http://localhost:3000/test',
        scope: ['login'],
      });

      client.revokeToken((err: any, result: any) => {
        if (err) {
          console.error('Logout failed', err);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      });

      // Clear access token from cookies
      if (typeof document !== 'undefined') {
        document.cookie = 'hivesigner_access_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      }
    } catch (e) {
      console.error('Failed to logout:', e);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">HiveSigner Test</h1>
          <p className="text-muted-foreground">
            Test the HiveSigner integration
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>HiveSigner Status</CardTitle>
          </CardHeader>
          <CardContent>
            {hivesignerAvailable ? (
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                <AlertDescription className="text-green-800 dark:text-green-200">
                  HiveSigner library is available
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <AlertDescription>
                  HiveSigner library is not available. Please check your internet connection.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading...</p>
            ) : isAuthenticated ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Logged in as:</h3>
                  <p>@{user?.user}</p>
                </div>
                <Button onClick={handleLogout} variant="outline">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p>Not authenticated</p>
                <Button onClick={handleLogin}>
                  Login with HiveSigner
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Debugging</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">If you're experiencing issues with HiveSigner, you can use the debug pages for more detailed information:</p>
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link href="/test/hivesigner-debug">
                  Open HiveSigner Debug Page
                </Link>
              </Button>
              <Button asChild>
                <Link href="/test/hivesigner-callback">
                  Open HiveSigner Callback Test
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}