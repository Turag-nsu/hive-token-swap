// src/hooks/useWalletData.ts
import { useState, useEffect } from 'react';
import { HiveAccount } from '@/types';
import { HiveAccountAPI } from '@/lib/api/hive-api';

export function useWalletData(username: string, authMethod: 'keychain' | 'hivesigner' | null) {
  const [account, setAccount] = useState<HiveAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [balances, setBalances] = useState<{
    hive: string;
    hbd: string;
    hive_power: string;
    delegated_hp: string;
    received_hp: string;
  } | null>(null);

  useEffect(() => {
    if (!username || !authMethod) {
      setAccount(null);
      setBalances(null);
      setLoading(false);
      return;
    }

    const fetchAccountData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch real account data from Hive blockchain
        const [accountData, balanceData] = await Promise.all([
          HiveAccountAPI.getAccount(username),
          HiveAccountAPI.getAccountBalances(username)
        ]);
        
        if (!accountData) {
          throw new Error(`Account @${username} not found on Hive blockchain`);
        }
        
        setAccount(accountData);
        setBalances(balanceData);
      } catch (err) {
        console.error('Error fetching account data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch account data');
        setAccount(null);
        setBalances(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, [username, authMethod]);

  const refreshAccountData = async () => {
    if (!username || !authMethod) return;
    
    try {
      setLoading(true);
      const [accountData, balanceData] = await Promise.all([
        HiveAccountAPI.getAccount(username),
        HiveAccountAPI.getAccountBalances(username)
      ]);
      
      if (accountData) {
        setAccount(accountData);
        setBalances(balanceData);
      }
    } catch (err) {
      console.error('Error refreshing account data:', err);
      setError(err instanceof Error ? err.message : 'Failed to refresh account data');
    } finally {
      setLoading(false);
    }
  };

  return { 
    account, 
    balances, 
    loading, 
    error, 
    refreshAccountData 
  };
}