'use client';

import { useEffect, useState } from 'react';

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

export default function HiveSignerCallbackTest() {
  const [urlParams, setUrlParams] = useState('');
  const [authStatus, setAuthStatus] = useState('checking');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Log URL parameters for debugging
      setUrlParams(window.location.search);

      // Check for access token in URL (callback from HiveSigner)
      const urlParamsObj = new URLSearchParams(window.location.search);
      const accessToken = urlParamsObj.get('access_token');

      if (accessToken) {
        // Store access token in cookie
        setCookie('hivesigner_access_token', accessToken);
        setAuthStatus('token_stored');

        // Try to load hivesigner and get user info
        import('hivesigner').then((hivesignerModule) => {
          const hivesigner = hivesignerModule.default;

          // Initialize client
          const client = new hivesigner.Client({
            callbackURL: 'http://localhost:3000/test/hivesigner-callback',
            scope: ['login'],
          });

          // Set access token
          try {
            client.setAccessToken(accessToken);

            // Get user info
            client.me((err: any, result: any) => {
              if (err) {
                setError(err.message || 'Failed to get user info');
                setAuthStatus('error');
              } else {
                setUser(result);
                setAuthStatus('authenticated');
              }
            });
          } catch (err) {
            setError(err.message || 'Failed to set access token');
            setAuthStatus('error');
          }
        }).catch((err) => {
          setError(err.message || 'Failed to load hivesigner');
          setAuthStatus('error');
        });

        // Remove the access token from the URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        // Check for access token in cookies
        const cookieToken = getCookie('hivesigner_access_token');
        if (cookieToken) {
          setAuthStatus('token_found');

          // Try to load hivesigner and get user info
          import('hivesigner').then((hivesignerModule) => {
            const hivesigner = hivesignerModule.default;

            // Initialize client
            const client = new hivesigner.Client({
              callbackURL: 'http://localhost:3000/test/hivesigner-callback',
              scope: ['login'],
            });

            // Set access token
            try {
              client.setAccessToken(cookieToken);

              // Get user info
              client.me((err: any, result: any) => {
                if (err) {
                  setError(err.message || 'Failed to get user info');
                  setAuthStatus('error');
                } else {
                  setUser(result);
                  setAuthStatus('authenticated');
                }
              });
            } catch (err) {
              setError(err.message || 'Failed to set access token');
              setAuthStatus('error');
            }
          }).catch((err) => {
            setError(err.message || 'Failed to load hivesigner');
            setAuthStatus('error');
          });
        } else {
          setAuthStatus('not_authenticated');
        }
      }
    }
  }, []);

  const handleLogin = () => {
    // Redirect to hivesigner login
    import('hivesigner').then((hivesignerModule) => {
      const hivesigner = hivesignerModule.default;

      // Initialize client
      const client = new hivesigner.Client({
        callbackURL: 'http://localhost:3000/test/hivesigner-callback',
        scope: ['login'],
      });

      // Redirect to login page
      const loginURL = client.getLoginURL('login-state');
      window.location.href = loginURL;
    }).catch((err) => {
      setError(err.message || 'Failed to load hivesigner');
    });
  };

  const handleLogout = () => {
    // Clear access token from cookies
    removeCookie('hivesigner_access_token');
    setAuthStatus('not_authenticated');
    setUser(null);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">HiveSigner Callback Test</h1>

        <div className="bg-muted p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">URL Parameters</h2>
          <pre className="whitespace-pre-wrap break-all text-sm">{urlParams || 'No URL parameters'}</pre>
        </div>

        <div className="bg-muted p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Authentication Status</h2>
          <div className="space-y-2">
            <div>Status: {authStatus}</div>
            <div>User: {user ? user.user : 'None'}</div>
            {error && <div className="text-red-500">Error: {error}</div>}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login with HiveSigner
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}