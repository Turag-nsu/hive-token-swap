"use client";

import { useState } from 'react';
import {
  User,
  Copy,
  ExternalLink,
  Coins,
  TrendingUp,
  Activity,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useWalletData } from '@/hooks/useWalletData';

interface AccountManagerProps {
  username: string;
  authMethod: 'keychain' | 'hivesigner' | null;
}

export function AccountManager({ username, authMethod }: AccountManagerProps) {
  const { account, balances, loading, error, refreshAccountData } = useWalletData(username, authMethod);
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshAccountData();
    setRefreshing(false);
  };

  const formatBalance = (balance: string) => {
    if (!balance) return '0.000';
    return balance;
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-destructive">
          <p>{error}</p>
        </div>
      </Card>
    );
  }

  if (!account) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No account connected</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Account Header */}
      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">@{account.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(account.name)}
                className="h-6 w-6 p-0"
              >
                {copied ? (
                  <span className="text-xs">Copied!</span>
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="h-6 w-6 p-0"
              >
                <a
                  href={`https://peakd.com/@${account.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="outline">Active</Badge>
            </div>
          </div>
        </div>

        {/* Balances */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
            <Coins className="h-5 w-5 text-red-500" />
            <div>
              <div className="text-sm text-muted-foreground">HIVE</div>
              <div className="font-semibold">{balances ? balances.hive : formatBalance(account.balance)}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
            <Coins className="h-5 w-5 text-green-500" />
            <div>
              <div className="text-sm text-muted-foreground">HBD</div>
              <div className="font-semibold">{balances ? balances.hbd : formatBalance(account.hbd_balance)}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <div>
              <div className="text-sm text-muted-foreground">Hive Power</div>
              <div className="font-semibold">{balances ? balances.hive_power : `~${(parseFloat(account.vesting_shares?.split(' ')[0] || '0') / 1000).toFixed(0)} HP`}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Quick Actions</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center space-x-1"
          >
            <RefreshCw className={`h-3 w-3 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>View Activity</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            asChild
          >
            <a
              href={`https://hiveblocks.com/@${account.name}`}
              target="_blank"
              rel="noopener noreferrer"
              title={`View @${account.name} on Hive block explorer`}
            >
              <ExternalLink className="h-4 w-4" />
              <span>View on Block Explorer</span>
            </a>
          </Button>
        </div>
      </Card>

      {/* Account Stats */}
      <Card className="p-6">
        <h4 className="font-semibold mb-4">Account Information</h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Authentication Method:</span>
            <span className="font-medium">
              {authMethod === 'keychain' ? 'Hive Keychain' : 'HiveSigner'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Account Name:</span>
            <span className="font-medium">@{account.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">HIVE Balance:</span>
            <span className="font-medium">{balances ? balances.hive : formatBalance(account.balance)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">HBD Balance:</span>
            <span className="font-medium">{balances ? balances.hbd : formatBalance(account.hbd_balance)}</span>
          </div>
          {balances && (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hive Power:</span>
                <span className="font-medium">{balances.hive_power}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delegated HP:</span>
                <span className="font-medium">{balances.delegated_hp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Received HP:</span>
                <span className="font-medium">{balances.received_hp}</span>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}