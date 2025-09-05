// src/hooks/useTransactionHistory.ts
import { useState, useEffect } from 'react';
import { HiveTransactionAPI } from '@/lib/api/hive-api';

export interface Transaction {
  id: string;
  type: string;
  description: string;
  amount: string;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  hash: string;
  from?: string;
  to?: string;
}

export interface TransactionStats {
  totalTransactions: number;
  totalVolume: string;
  avgFee: string;
  successRate: string;
}

export function useTransactionHistory(username: string | null) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<TransactionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setTransactions([]);
      setStats(null);
      setLoading(false);
      return;
    }

    const fetchTransactionHistory = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch both transaction history and stats in parallel
        const [historyData, statsData] = await Promise.all([
          HiveTransactionAPI.getTransactionHistory(username, 50),
          HiveTransactionAPI.getTransactionStats(username)
        ]);
        
        setTransactions(historyData);
        setStats(statsData);
      } catch (err) {
        console.error('Error fetching transaction data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch transaction history');
        setTransactions([]);
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionHistory();
  }, [username]);

  const refreshHistory = async () => {
    if (!username) return;
    
    try {
      setLoading(true);
      const historyData = await HiveTransactionAPI.getTransactionHistory(username, 50);
      setTransactions(historyData);
    } catch (err) {
      console.error('Error refreshing transaction history:', err);
      setError(err instanceof Error ? err.message : 'Failed to refresh transaction history');
    } finally {
      setLoading(false);
    }
  };

  return {
    transactions,
    stats,
    loading,
    error,
    refreshHistory,
  };
}
