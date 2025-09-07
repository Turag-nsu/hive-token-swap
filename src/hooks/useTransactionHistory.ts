// src/hooks/useTransactionHistory.ts
import { useState, useEffect, useCallback, useMemo } from 'react';
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
  tags?: string[];
  category?: string;
  usdValue?: number;
  memo?: string;
}

export interface TransactionStats {
  totalTransactions: number;
  totalVolume: string;
  avgFee: string;
  successRate: string;
}

export function useTransactionHistory(usernames: string | string[] | null) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<TransactionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

  // Normalize usernames to array
  const usernameArray = useMemo(() => 
    Array.isArray(usernames) ? usernames : (usernames ? [usernames] : []), 
    [usernames]
  );

  const fetchTransactionHistory = useCallback(async (loadMore = false) => {
    console.log('[useTransactionHistory] fetchTransactionHistory called', { loadMore, usernameArray });
    
    if (usernameArray.length === 0) {
      console.log('[useTransactionHistory] No usernames provided, resetting state');
      setTransactions([]);
      setStats(null);
      setLoading(false);
      setError(null);
      setHasMore(true);
      setLoadedCount(0);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const limit = 20;
      const currentCount = loadMore ? loadedCount : 0;
      
      console.log('[useTransactionHistory] Fetching transactions for accounts:', usernameArray);
      
      // Fetch transaction history for all accounts
      const allTransactions: Transaction[] = [];
      
      for (const username of usernameArray) {
        try {
          console.log(`[useTransactionHistory] Fetching transactions for ${username}`);
          const historyData = await HiveTransactionAPI.getTransactionHistory(username, limit);
          console.log(`[useTransactionHistory] Got ${historyData.length} transactions for ${username}`);
          allTransactions.push(...historyData);
        } catch (err) {
          console.warn(`[useTransactionHistory] Failed to fetch transactions for ${username}:`, err);
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch transaction history';
          setError(prevError => prevError ? `${prevError}; ${errorMessage}` : errorMessage);
        }
      }
      
      console.log(`[useTransactionHistory] Total transactions before deduplication: ${allTransactions.length}`);
      
      // Sort all transactions by timestamp (newest first)
      allTransactions.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      // Deduplicate transactions by hash
      const uniqueTransactions = allTransactions.filter((tx, index, self) => 
        index === self.findIndex(t => t.hash === tx.hash)
      );
      
      console.log(`[useTransactionHistory] Total transactions after deduplication: ${uniqueTransactions.length}`);
      
      if (loadMore) {
        // For simplicity, we'll just extend the existing transactions
        const newTransactions = uniqueTransactions.slice(currentCount, currentCount + limit);
        console.log(`[useTransactionHistory] Loading more: ${newTransactions.length} new transactions`);
        setTransactions(prev => [...prev, ...newTransactions]);
        const newCount = currentCount + newTransactions.length;
        setLoadedCount(newCount);
        setHasMore(newTransactions.length === limit);
      } else {
        const limitedTransactions = uniqueTransactions.slice(0, limit);
        console.log(`[useTransactionHistory] Initial load: ${limitedTransactions.length} transactions`);
        setTransactions(limitedTransactions);
        setLoadedCount(limit);
        setHasMore(uniqueTransactions.length > limit);
      }
      
      // Fetch stats only on initial load
      if (initialLoad) {
        console.log('[useTransactionHistory] Fetching stats for accounts:', usernameArray);
        // Aggregate stats from all accounts
        let totalTransactions = 0;
        let totalVolumeHive = 0;
        let totalVolumeHbd = 0;
        let successfulTx = 0;
        let totalTx = 0;
        
        for (const username of usernameArray) {
          try {
            console.log(`[useTransactionHistory] Fetching stats for ${username}`);
            const statsData = await HiveTransactionAPI.getTransactionStats(username);
            console.log(`[useTransactionHistory] Stats for ${username}:`, statsData);
            totalTransactions += statsData.totalTransactions;
            
            // Parse volume data
            const volumeMatch = statsData.totalVolume?.match(/([\d.]+) HIVE \+ ([\d.]+) HBD/);
            if (volumeMatch) {
              totalVolumeHive += parseFloat(volumeMatch[1] || '0') || 0;
              totalVolumeHbd += parseFloat(volumeMatch[2] || '0') || 0;
            }
            
            // Parse success rate
            const successRateMatch = statsData.successRate?.match(/([\d.]+)%/);
            if (successRateMatch) {
              const rate = parseFloat(successRateMatch[1] || '0') || 0;
              successfulTx += (rate / 100) * statsData.totalTransactions;
            }
            
            totalTx += statsData.totalTransactions;
          } catch (err) {
            console.warn(`[useTransactionHistory] Failed to fetch stats for ${username}:`, err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch transaction statistics';
            setError(prevError => prevError ? `${prevError}; ${errorMessage}` : errorMessage);
          }
        }
        
        const aggregatedStats: TransactionStats = {
          totalTransactions,
          totalVolume: `${totalVolumeHive.toFixed(3)} HIVE + ${totalVolumeHbd.toFixed(3)} HBD`,
          avgFee: '0.000 HIVE',
          successRate: totalTx > 0 ? `${((successfulTx / totalTx) * 100).toFixed(1)}%` : '0%'
        };
        
        console.log('[useTransactionHistory] Aggregated stats:', aggregatedStats);
        setStats(aggregatedStats);
        setInitialLoad(false);
      }
    } catch (err) {
      console.error('[useTransactionHistory] Error fetching transaction data:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch transaction history';
      setError(errorMessage);
      if (!loadMore) {
        setTransactions([]);
      }
    } finally {
      setLoading(false);
      console.log('[useTransactionHistory] Finished fetching transaction data');
    }
  }, [usernameArray, loadedCount, initialLoad]);

  useEffect(() => {
    console.log('[useTransactionHistory] Usernames changed, fetching transaction history', usernameArray);
    fetchTransactionHistory(false);
  }, [usernameArray]);

  const refreshHistory = useCallback(async () => {
    console.log('[useTransactionHistory] Refreshing transaction history');
    if (usernameArray.length === 0) {
      console.log('[useTransactionHistory] No usernames to refresh');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Fetch transaction history for all accounts
      const allTransactions: Transaction[] = [];
      
      for (const username of usernameArray) {
        try {
          console.log(`[useTransactionHistory] Refreshing transactions for ${username}`);
          const historyData = await HiveTransactionAPI.getTransactionHistory(username, 20);
          console.log(`[useTransactionHistory] Got ${historyData.length} transactions for ${username} during refresh`);
          allTransactions.push(...historyData);
        } catch (err) {
          console.warn(`[useTransactionHistory] Failed to refresh transactions for ${username}:`, err);
          const errorMessage = err instanceof Error ? err.message : 'Failed to refresh transaction history';
          setError(prevError => prevError ? `${prevError}; ${errorMessage}` : errorMessage);
        }
      }
      
      // Sort all transactions by timestamp (newest first)
      allTransactions.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      // Deduplicate transactions by hash
      const uniqueTransactions = allTransactions.filter((tx, index, self) => 
        index === self.findIndex(t => t.hash === tx.hash)
      );
      
      const limitedTransactions = uniqueTransactions.slice(0, 20);
      console.log(`[useTransactionHistory] Refreshed with ${limitedTransactions.length} transactions`);
      setTransactions(limitedTransactions);
      setLoadedCount(20);
      setHasMore(uniqueTransactions.length > 20);
    } catch (err) {
      console.error('[useTransactionHistory] Error refreshing transaction history:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh transaction history';
      setError(errorMessage);
    } finally {
      setLoading(false);
      console.log('[useTransactionHistory] Finished refreshing transaction history');
    }
  }, [usernameArray]);

  const loadMore = useCallback(() => {
    console.log('[useTransactionHistory] Loading more transactions');
    if (!loading && hasMore) {
      fetchTransactionHistory(true);
    }
  }, [loading, hasMore, fetchTransactionHistory]);

  return {
    transactions,
    stats,
    loading,
    error,
    refreshHistory,
    loadMore,
    hasMore,
  };
}