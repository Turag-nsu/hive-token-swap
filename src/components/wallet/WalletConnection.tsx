"use client";

import { useState, useEffect } from 'react';
import {
  Wallet,
  Download,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Key,
  RefreshCw,
  User
} from 'lucide-react';
import { AccountManager } from './AccountManager';
import { Button } from '@/components/ui/Button';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';


interface WalletConnectionProps {
  children: React.ReactNode;
}

export function WalletConnection({ children }: WalletConnectionProps) {
  const [isKeychainInstalled, setIsKeychainInstalled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [authMethod, setAuthMethod] = useState<'keychain' | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualUsername, setManualUsername] = useState('');


  useEffect(() => {
    // Check if HiveKeychain is installed
    const checkKeychain = () => {
      setIsKeychainInstalled(!!(window as any).hive_keychain);
    };

    checkKeychain();

    // Listen for extension installation
    const interval = setInterval(checkKeychain, 1000);
    return () => clearInterval(interval);
  }, []);


  const connectWithKeychain = async () => {
    if (!isKeychainInstalled) {
      setError('HiveKeychain not installed');
      return;
    }

    setIsConnecting(true);
    setError(null);
    setAuthMethod('keychain');
    setShowManualInput(false);

    try {
      const keychain = (window as any).hive_keychain;

      // First verify keychain is installed
      keychain.requestHandshake((response: any) => {
        if (response?.success) {
          // Now request user to verify their identity
          // We'll use a simple message for verification
          const message = `Login to Hive Social - ${new Date().toISOString()}`;

          // Request user to sign the message
          keychain.requestSignBuffer('', message, 'Posting', (signResponse: any) => {
            if (signResponse?.success) {
              // For now, we'll just set a placeholder username
              // In a real implementation, you'd verify the signature on the backend
              setIsConnected(true);
              // We don't have the username yet, so we'll prompt for it
              const user = prompt('Enter your Hive username:');
              if (user) {
                setUsername(user);
              } else {
                setUsername('Hive User');
              }
            } else {
              setError(signResponse?.message || 'Failed to authenticate');
            }
            setIsConnecting(false);
          });
        } else if (response === undefined || response === null) {
          // Handle known issue where HiveKeychain doesn't return data
          setError('HiveKeychain extension did not return any data. This is a known issue with some versions of the extension. Please try refreshing the page, or manually enter your Hive username.');
          setShowManualInput(true);
          setIsConnecting(false);
        } else {
          setError(response?.message || 'Failed to connect to Keychain');
          setIsConnecting(false);
        }
      });
    } catch {
      setError('Connection failed');
      setIsConnecting(false);
    }
  };

  const connectWithManualUsername = () => {
    if (!manualUsername.trim()) {
      setError('Please enter a valid Hive username');
      return;
    }

    // Validate username format (basic validation)
    const usernameRegex = /^[a-z][a-z0-9.-]*[a-z0-9]$/;
    if (!usernameRegex.test(manualUsername.trim())) {
      setError('Invalid username format. Hive usernames should contain only lowercase letters, numbers, dots, and hyphens.');
      return;
    }

    setIsConnected(true);
    setUsername(manualUsername.trim());
    setAuthMethod('keychain');
    setError(null);
    setShowManualInput(false);
  };

  const refreshPage = () => {
    window.location.reload();
  };


  const disconnectWallet = () => {
    setIsConnected(false);
    setUsername('');
    setAuthMethod(null);
    setError(null);
  };

  if (!isKeychainInstalled) {
    return (
      <div className="space-y-4">
        <Alert>
          <Download className="h-4 w-4" />
          <AlertDescription>
            HiveKeychain extension is required to use this feature.
          </AlertDescription>
        </Alert>

        <div className="text-center py-8">
          <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Connect Wallet</h3>
          <p className="text-muted-foreground mb-4">
            Choose a method to connect your Hive wallet
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <a
                href="https://chrome.google.com/webstore/detail/hive-keychain/jcacnejopjdphbnjgfaaobbfafkihpep"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-4 w-4 mr-2" />
                Install HiveKeychain
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
              {error.includes('HiveKeychain extension did not return any data') && (
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline" onClick={refreshPage}>
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Refresh Page
                  </Button>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        {showManualInput && (
          <div className="bg-muted p-4 rounded-lg border">
            <h4 className="font-medium mb-2">Manual Username Entry</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Enter your Hive username to continue. This is a fallback option when HiveKeychain doesn't respond properly.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your Hive username"
                value={manualUsername}
                onChange={(e) => setManualUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && connectWithManualUsername()}
              />
              <Button onClick={connectWithManualUsername}>
                <User className="h-4 w-4 mr-1" />
                Connect
              </Button>
            </div>
          </div>
        )}

        <div className="text-center py-8">
          <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Connect Wallet</h3>
          <p className="text-muted-foreground mb-4">
            Connect your Hive wallet to start creating content
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {isKeychainInstalled && (
              <Button
                onClick={connectWithKeychain}
                disabled={isConnecting}
              >
                {isConnecting ? 'Connecting...' : 'Connect with Keychain'}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950 rounded-lg border">
        <div className="flex items-center space-x-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <div className="font-medium">Wallet Connected</div>
            <div className="text-sm text-muted-foreground">
              @{username} via HiveKeychain
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="success">Connected</Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={disconnectWallet}
          >
            Disconnect
          </Button>
        </div>
      </div>

      {/* Account Manager */}
      <AccountManager username={username} authMethod={authMethod} />

      {children}
    </div>
  );
}