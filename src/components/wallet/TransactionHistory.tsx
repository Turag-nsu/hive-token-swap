// src/components/wallet/TransactionHistory.tsx
"use client";

import { useState } from 'react';
import { useTransactionHistory, Transaction } from '@/hooks/useTransactionHistory';
import { useWallet } from '@/hooks/useWallet';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';

// Function to get transaction icon based on type
const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'transfer':
      return '💸';
    case 'power_up':
      return '🔋';
    case 'power_down':
      return '📉';
    case 'delegation':
      return '🤝';
    case 'reward':
      return '🏆';
    case 'conversion':
      return '💱';
    default:
      return '📋';
  }
};

// Function to get status color class based on status
const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function TransactionHistory() {
    const { user } = useWallet();
    const { transactions, stats, loading, error, refreshHistory } = useTransactionHistory(user?.name || null);
    const [filter, setFilter] = useState<string>('');
    const [typeFilter, setTypeFilter] = useState<string>('');

    // Filter transactions based on search and type
    const filteredTransactions = transactions.filter(tx => {
        const matchesSearch = !filter ||
            tx.description.toLowerCase().includes(filter.toLowerCase()) ||
            tx.hash.toLowerCase().includes(filter.toLowerCase()) ||
            (tx.from && tx.from.toLowerCase().includes(filter.toLowerCase())) ||
            (tx.to && tx.to.toLowerCase().includes(filter.toLowerCase()));

        const matchesType = !typeFilter || tx.type === typeFilter;

        return matchesSearch && matchesType;
    });

    if (!user) {
        return (
            <div className="bg-card rounded-lg border p-6 text-center">
                <div className="text-muted-foreground mb-4">
                    🔒 Connect your wallet to view transaction history
                </div>
                <p className="text-sm text-muted-foreground">
                    Your transaction history will appear here once you connect your Hive account.
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-card rounded-lg border p-6">
                <Alert className="mb-4">
                    <div className="font-medium">Error loading transaction history</div>
                    <div className="text-sm mt-1">{error}</div>
                </Alert>
                <Button onClick={refreshHistory} disabled={loading}>
                    {loading ? 'Retrying...' : 'Retry'}
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-lg border">
            {/* Header with stats */}
            <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Transaction History</h3>
                    <Button
                        onClick={refreshHistory}
                        disabled={loading}
                        className="text-sm"
                        variant="outline"
                    >
                        {loading ? '🔄 Loading...' : '🔄 Refresh'}
                    </Button>
                </div>

                {/* Quick Stats */}
                {stats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <div className="text-lg font-bold">{stats.totalTransactions}</div>
                            <div className="text-xs text-muted-foreground">Total Transactions</div>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <div className="text-lg font-bold">{stats.totalVolume}</div>
                            <div className="text-xs text-muted-foreground">Total Volume</div>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <div className="text-lg font-bold">{stats.avgFee}</div>
                            <div className="text-xs text-muted-foreground">Avg. Fee</div>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <div className="text-lg font-bold">{stats.successRate}</div>
                            <div className="text-xs text-muted-foreground">Success Rate</div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search by description, hash, or account..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg bg-background text-sm"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="px-3 py-2 border rounded-lg bg-background text-sm"
                            title="Filter transactions by type"
                            aria-label="Filter transactions by type"
                        >
                            <option value="">All Types</option>
                            <option value="transfer">Transfers</option>
                            <option value="power_up">Power Up</option>
                            <option value="power_down">Power Down</option>
                            <option value="delegation">Delegations</option>
                            <option value="reward">Rewards</option>
                            <option value="conversion">Conversions</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Transaction List */}
            <div className="p-6">
                {loading && transactions.length === 0 ? (
                    <TransactionListSkeleton />
                ) : filteredTransactions.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="text-muted-foreground mb-2">📋</div>
                        <div className="text-sm text-muted-foreground">
                            {transactions.length === 0
                                ? 'No transactions found for this account'
                                : 'No transactions match your filters'
                            }
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredTransactions.map((transaction) => (
                            <TransactionRow key={transaction.id} transaction={transaction} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Individual transaction row component
function TransactionRow({ transaction }: { transaction: Transaction }) {
    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();

        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else if (hours < 24) {
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else if (days < 7) {
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    return (
        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
            <div className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-lg">
                    {getTransactionIcon(transaction.type)}
                </div>
                <div className="space-y-1">
                    <div className="text-sm font-medium">{transaction.description}</div>
                    <div className="flex items-center space-x-2">
                        <div className="text-xs text-muted-foreground">
                            {formatTimestamp(transaction.timestamp)}
                        </div>
                        <Badge className={`text-xs ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                        </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                        {transaction.hash.substring(0, 12)}...
                    </div>
                </div>
            </div>
            <div className="text-right space-y-1">
                <div className="text-sm font-medium">
                    {transaction.amount !== '0' ? transaction.amount : 'N/A'}
                </div>
                <div className="text-xs text-muted-foreground">
                    {transaction.currency}
                </div>
            </div>
        </div>
    );
}

// Loading skeleton component
function TransactionListSkeleton() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-muted rounded-full animate-pulse"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-muted rounded w-32 animate-pulse"></div>
                            <div className="h-3 bg-muted rounded w-24 animate-pulse"></div>
                            <div className="h-3 bg-muted rounded w-20 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="text-right space-y-2">
                        <div className="h-4 bg-muted rounded w-20 animate-pulse"></div>
                        <div className="h-3 bg-muted rounded w-16 animate-pulse"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}