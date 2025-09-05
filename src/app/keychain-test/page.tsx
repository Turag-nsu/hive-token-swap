'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { keychain } from '@/lib/blockchain/keychain';

export default function KeychainTest() {
  const [isInstalled, setIsInstalled] = useState(false);
  const [version, setVersion] = useState<string | null>(null);
  const [features, setFeatures] = useState<Record<string, boolean>>({});
  const [testResult, setTestResult] = useState<string>('');
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    // Check keychain status
    const checkKeychain = async () => {
      const installed = await keychain.isInstalled();
      setIsInstalled(installed);

      if (installed) {
        setVersion(keychain.getVersion());
        setFeatures({
          handshake: true, // Assume basic features are available
          broadcast: true,
          signBuffer: true,
          encodeMessage: true,
          decodeMessage: true,
        });
      }
    };

    checkKeychain();

    // Set up listener for keychain installation changes
    const unsubscribe = keychain.onInstallationChange(checkKeychain);

    return unsubscribe;
  }, []);

  const testHandshake = async () => {
    setIsTesting(true);
    setTestResult('');

    try {
      if (!isInstalled) {
        setTestResult('HiveKeychain is not installed');
        return;
      }

      console.log('Testing handshake...');
      const username = await keychain.requestLogin();
      setTestResult(`Handshake successful! Connected as: @${username}`);
    } catch (error) {
      console.error('Handshake error:', error);
      setTestResult(`Handshake failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>HiveKeychain Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Keychain Status</h3>
            <div className="space-y-2">
              <p><strong>Installed:</strong> {isInstalled ? 'Yes' : 'No'}</p>
              {version && <p><strong>Version:</strong> {version}</p>}
            </div>
          </div>

          {isInstalled && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Available Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(features).map(([feature, available]) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <div className={`h-2 w-2 rounded-full ${available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="capitalize">{feature}: {available ? 'Yes' : 'No'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-2">Test Connection</h3>
            <Button onClick={testHandshake} disabled={!isInstalled || isTesting}>
              {isTesting ? 'Testing...' : 'Test Handshake'}
            </Button>
            {testResult && (
              <Alert className="mt-2">
                <AlertDescription>{testResult}</AlertDescription>
              </Alert>
            )}
          </div>

          {!isInstalled && (
            <Alert>
              <AlertDescription>
                HiveKeychain extension is not installed. Please install it from the Chrome Web Store to use wallet features.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}