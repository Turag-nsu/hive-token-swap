'use client';

import { TrendingUp, TrendingDown, Wallet, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useTransactionHistory } from '@/hooks/useTransactionHistory';
import { useWallet } from '@/hooks/useWallet';
import { Skeleton } from '@/components/ui/Skeleton';
import { Alert, AlertDescription } from '@/components/ui/Alert';

interface WalletStatsProps {
  className?: string;
}

export function WalletStats({ className }: WalletStatsProps) {
  console.log('[WalletStats] Component rendering');
  const { user } = useWallet();
  console.log('[WalletStats] User from wallet:', user?.name);
  
  const { stats, loading, error } = useTransactionHistory(user?.name || null);
  console.log('[WalletStats] Stats data:', { stats, loading, error });

  // Format currency with USD conversion
  const formatCurrencyWithUSD = (value: string) => {
    if (!value) return '$0.00';
    
    // Extract numeric value and currency
    const parts = value.split(' ');
    if (parts.length < 2) {
      const num = parseFloat(value);
      return isNaN(num) ? '$0.00' : `$${num.toFixed(2)}`;
    }
    
    const amount = parseFloat(parts[0] || "0");
    if (isNaN(amount)) return '$0.00';
    
    const currency = parts[1];
    
    // Convert to USD based on currency type
    let usdValue = 0;
    if (currency) {
      switch (currency.toUpperCase()) {
      case 'HIVE':
        usdValue = amount * 0.35; // Approximate HIVE price
        break;
      case 'HBD':
        usdValue = amount * 1.00; // HBD is ~$1
        break;
      default:
        usdValue = amount; // Assume already in USD
    }
    } else {
      usdValue = amount; // Assume already in USD
    }
    
    return `$${usdValue.toFixed(2)}`;
  };

  // Format large numbers with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  if (loading) {
    console.log('[WalletStats] Loading stats');
    return (
      <div className={className}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
        </div>
      </div>
    );
  }

  if (error) {
    console.log('[WalletStats] Error loading stats:', error);
    return (
      <div className={className}>
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load wallet statistics: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  console.log('[WalletStats] Rendering stats cards');
  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Wallet className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.totalTransactions ? formatNumber(stats.totalTransactions) : '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.totalVolume || '0 HIVE'}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.totalVolume ? formatCurrencyWithUSD(stats.totalVolume) : '$0.00'}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Fee</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.avgFee || '0.000 HIVE'}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.avgFee ? formatCurrencyWithUSD(stats.avgFee) : '$0.00'}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-cyan-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingDown className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.successRate || '100%'}
            </div>
            <p className="text-xs text-muted-foreground">
              Same as last month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}