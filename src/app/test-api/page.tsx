// src/app/test-api/page.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { HiveAccountAPI, HiveTransactionAPI } from '@/lib/api/hive-api';

export default function TestApiPage() {
    const [results, setResults] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const testAccount = async () => {
        setLoading(true);
        setError(null);
        try {
            const account = await HiveAccountAPI.getAccount('hiveio');
            setResults({ type: 'account', data: account });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    const testBalances = async () => {
        setLoading(true);
        setError(null);
        try {
            const balances = await HiveAccountAPI.getAccountBalances('hiveio');
            setResults({ type: 'balances', data: balances });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    const testHistory = async () => {
        setLoading(true);
        setError(null);
        try {
            const history = await HiveTransactionAPI.getTransactionHistory('hiveio', 10);
            setResults({ type: 'history', data: history });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    const testStats = async () => {
        setLoading(true);
        setError(null);
        try {
            const stats = await HiveTransactionAPI.getTransactionStats('hiveio');
            setResults({ type: 'stats', data: stats });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Hive API Test Page</h1>
            <p className="text-muted-foreground">
                Test the real Hive blockchain API integration using the @hiveio account as an example.
            </p>

            <div className="flex gap-4 flex-wrap">
                <Button onClick={testAccount} disabled={loading}>
                    Test Get Account
                </Button>
                <Button onClick={testBalances} disabled={loading}>
                    Test Get Balances
                </Button>
                <Button onClick={testHistory} disabled={loading}>
                    Test Transaction History
                </Button>
                <Button onClick={testStats} disabled={loading}>
                    Test Transaction Stats
                </Button>
            </div>

            {loading && (
                <div className="text-center py-8">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                    <p className="mt-2 text-muted-foreground">Loading from Hive blockchain...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-red-700 font-medium">Error:</div>
                    <div className="text-red-600 text-sm mt-1">{error}</div>
                </div>
            )}

            {results && (
                <div className="bg-gray-50 border rounded-lg p-4">
                    <div className="font-medium mb-2">
                        Results ({results.type}):
                    </div>
                    <pre className="text-sm bg-white border rounded p-3 overflow-auto max-h-96">
                        {JSON.stringify(results.data, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
