// src/app/test-hive-api/page.tsx
'use client';

import { useState } from 'react';
import { HiveAccountAPI } from '@/lib/api/hive-api';

export default function TestHiveAPI() {
  const [account, setAccount] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await HiveAccountAPI.getAccount('alice');
      setAccount(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('API Test Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testAPIRoute = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/test-hive');
      const result = await response.json();
      if (result.success) {
        setAccount(result.account);
      } else {
        setError(result.message || result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('API Route Test Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Hive API Test</h1>
      
      <div className="mb-6 flex gap-4">
        <button
          onClick={testAPI}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Hive API (Direct)'}
        </button>
        
        <button
          onClick={testAPIRoute}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Hive API (Route)'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
          <h2 className="font-bold mb-2">Error:</h2>
          <p>{error}</p>
        </div>
      )}

      {account && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded">
          <h2 className="font-bold mb-2">Account Data:</h2>
          <pre className="bg-white p-4 rounded overflow-auto">
            {JSON.stringify(account, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="font-bold mb-2">Instructions:</h2>
        <p>Click the "Test Hive API" button to test the connection to the Hive blockchain through the proxy.</p>
        <p>If successful, you'll see account data for the user "alice".</p>
        <p className="mt-2">
          <strong>Test Hive API (Direct):</strong> Tests the direct client-side API call through the proxy<br/>
          <strong>Test Hive API (Route):</strong> Tests the server-side API route
        </p>
      </div>
    </div>
  );
}