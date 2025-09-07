// src/components/wallet/TransactionHistory.tsx
"use client";

import { useState, useEffect } from 'react';
import { useTransactionHistory, Transaction } from '@/hooks/useTransactionHistory';
import { useTransactionNotifications } from '@/hooks/useTransactionNotifications';
import { useWallet } from '@/hooks/useWallet';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { TransactionDetailsModal } from '@/components/wallet/TransactionDetailsModal';

// Function to group transactions by date
const groupTransactionsByDate = (transactions: Transaction[]) => {
  console.log('[TransactionHistory] Grouping transactions by date', transactions.length);
  const groups: { [key: string]: Transaction[] } = {};
  
  transactions.forEach(transaction => {
    const date = new Date(transaction.timestamp);
    const dateKey = date.toDateString(); // This will group by day
    
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(transaction);
  });
  
  // Convert to array and sort by date (newest first)
  const result = Object.entries(groups)
    .map(([date, txs]) => ({
      date,
      transactions: txs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  console.log('[TransactionHistory] Grouped transactions:', result.length);
  return result;
};

// Function to get relative date description
const getRelativeDateDescription = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
};

// Function to get transaction type summary
const getTransactionTypeSummary = (transactions: Transaction[]) => {
  console.log('[TransactionHistory] Getting transaction type summary', transactions.length);
  const typeCounts: { [key: string]: number } = {};
  
  transactions.forEach(tx => {
    typeCounts[tx.type] = (typeCounts[tx.type] || 0) + 1;
  });
  
  // Sort by count descending
  const result = Object.entries(typeCounts)
    .map(([type, count]) => ({
      type,
      count,
      label: getTypeLabel(type)
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // Top 5 types
  
  console.log('[TransactionHistory] Transaction type summary:', result);
  return result;
};

// Function to get transaction category summary
const getTransactionCategorySummary = (transactions: Transaction[]) => {
  console.log('[TransactionHistory] Getting transaction category summary', transactions.length);
  const categoryCounts: { [key: string]: number } = {};
  
  transactions.forEach(tx => {
    const category = tx.category || 'uncategorized';
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });
  
  // Sort by count descending
  const result = Object.entries(categoryCounts)
    .map(([category, count]) => ({
      category,
      count,
      label: getCategoryLabel(category)
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // Top 5 categories
  
  console.log('[TransactionHistory] Transaction category summary:', result);
  return result;
};

// Function to get recent activity summary
const getRecentActivitySummary = (transactions: Transaction[]) => {
  console.log('[TransactionHistory] Getting recent activity summary', transactions.length);
  const activityCounts: { [key: string]: number } = {};
  
  // Group by date (last 7 days)
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateKey = date.toDateString();
    activityCounts[dateKey] = 0;
  }
  
  transactions.forEach(tx => {
    const txDate = new Date(tx.timestamp);
    const dateKey = txDate.toDateString();
    
    // Only count if within the last 7 days
    if (activityCounts.hasOwnProperty(dateKey)) {
      activityCounts[dateKey] = (activityCounts[dateKey] || 0) + 1;
    }
  });
  
  // Convert to array and sort by date
  const result = Object.entries(activityCounts)
    .map(([date, count]) => ({
      date: getRelativeDateDescription(date),
      count
    }))
    .filter(item => item.count > 0 || item.date === 'Today' || item.date === 'Yesterday');
  
  console.log('[TransactionHistory] Recent activity summary:', result);
  return result;
};

// Helper function to get type label
const getTypeLabel = (type: string) => {
  const labels: { [key: string]: string } = {
    transfer: 'Transfers',
    power_up: 'Power Up',
    power_down: 'Power Down',
    delegation: 'Delegations',
    reward: 'Rewards',
    conversion: 'Conversions',
    conversion_filled: 'Conversion Filled',
    order_create: 'Order Create',
    order_cancel: 'Order Cancel',
    order_filled: 'Order Filled',
    custom: 'Custom Operations'
  };
  
  return labels[type] || type;
};

// Helper function to get category label
const getCategoryLabel = (category: string) => {
  const labels: { [key: string]: string } = {
    transfer: 'Transfers',
    staking: 'Staking',
    income: 'Income',
    exchange: 'Exchange',
    trading: 'Trading',
    other: 'Other'
  };
  
  return labels[category] || category;
};

// Function to export transactions to CSV
const exportToCSV = (transactions: Transaction[], username: string) => {
  console.log('[TransactionHistory] Exporting to CSV', transactions.length);
  const headers = ['ID', 'Type', 'Description', 'Amount', 'Currency', 'Status', 'Timestamp', 'Hash', 'From', 'To'];
  const csvContent = [
    headers.join(','),
    ...transactions.map(tx => [
      tx.id,
      tx.type,
      `"${tx.description.replace(/"/g, '""')}"`,
      tx.amount,
      tx.currency,
      tx.status,
      tx.timestamp,
      tx.hash,
      tx.from || '',
      tx.to || ''
    ].map(field => `"${field}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `hive-transactions-${username}-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Function to export transactions to JSON
const exportToJSON = (transactions: Transaction[], username: string) => {
  console.log('[TransactionHistory] Exporting to JSON', transactions.length);
  const data = {
    exportedAt: new Date().toISOString(),
    username,
    transactionCount: transactions.length,
    transactions
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `hive-transactions-${username}-${new Date().toISOString().split('T')[0]}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

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
    case 'conversion_filled':
      return '💱';
    case 'order_create':
    case 'order_cancel':
    case 'order_filled':
      return '📊';
    case 'custom':
      return '🔧';
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
    console.log('[TransactionHistory] Component rendering');
    const { user } = useWallet();
    console.log('[TransactionHistory] User from wallet:', user?.name);
    
    // Support multiple accounts - for now just use the current user
    const usernames = user?.name ? [user.name] : null;
    console.log('[TransactionHistory] Usernames for transaction history:', usernames);
    
    const { transactions, stats, loading, error, refreshHistory, loadMore, hasMore } = useTransactionHistory(usernames);
    console.log('[TransactionHistory] Transaction data:', { transactions: transactions.length, stats, loading, error });
    
    const { newTransactions, hasNewTransactions } = useTransactionNotifications();
    const [filter, setFilter] = useState<string>('');
    const [typeFilter, setTypeFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [dateFilter, setDateFilter] = useState<string>('');
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Show notification when new transactions are detected
    useEffect(() => {
      if (hasNewTransactions && newTransactions.length > 0) {
        // In a real implementation, you would show a toast notification or similar
        console.log(`[TransactionHistory] You have ${newTransactions.length} new transaction(s)`);
      }
    }, [hasNewTransactions, newTransactions]);

    // Filter transactions based on search and type
    const filteredTransactions = transactions.filter(tx => {
        const matchesSearch = !filter ||
            tx.description.toLowerCase().includes(filter.toLowerCase()) ||
            tx.hash.toLowerCase().includes(filter.toLowerCase()) ||
            (tx.from && tx.from.toLowerCase().includes(filter.toLowerCase())) ||
            (tx.to && tx.to.toLowerCase().includes(filter.toLowerCase())) ||
            (tx.amount && tx.amount.toLowerCase().includes(filter.toLowerCase())) ||
            (tx.currency && tx.currency.toLowerCase().includes(filter.toLowerCase()));

        const matchesType = !typeFilter || tx.type === typeFilter;
        const matchesStatus = !statusFilter || tx.status === statusFilter;
        
        // Date filter
        let matchesDate = true;
        if (dateFilter) {
          const txDate = new Date(tx.timestamp);
          const today = new Date();
          
          switch (dateFilter) {
            case 'today':
              matchesDate = txDate.toDateString() === today.toDateString();
              break;
            case 'yesterday':
              const yesterday = new Date(today);
              yesterday.setDate(yesterday.getDate() - 1);
              matchesDate = txDate.toDateString() === yesterday.toDateString();
              break;
            case 'week':
              const weekAgo = new Date(today);
              weekAgo.setDate(weekAgo.getDate() - 7);
              matchesDate = txDate >= weekAgo;
              break;
            case 'month':
              const monthAgo = new Date(today);
              monthAgo.setMonth(monthAgo.getMonth() - 1);
              matchesDate = txDate >= monthAgo;
              break;
            default:
              matchesDate = true;
          }
        }

        return matchesSearch && matchesType && matchesStatus && matchesDate;
    });
    
    console.log('[TransactionHistory] Filtered transactions:', filteredTransactions.length);

    const openTransactionDetails = (transaction: Transaction) => {
      console.log('[TransactionHistory] Opening transaction details', transaction.id);
      setSelectedTransaction(transaction);
      setIsModalOpen(true);
    };

    const closeTransactionDetails = () => {
      console.log('[TransactionHistory] Closing transaction details');
      setIsModalOpen(false);
      setSelectedTransaction(null);
    };

    if (!user) {
        console.log('[TransactionHistory] No user, showing connect message');
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
        console.log('[TransactionHistory] Error occurred:', error);
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
                    <div className="flex gap-2">
                        <Button
                          onClick={() => exportToCSV(filteredTransactions, user?.name || 'user')}
                          disabled={filteredTransactions.length === 0}
                          className="text-sm"
                          variant="outline"
                        >
                          Export CSV
                        </Button>
                        <Button
                          onClick={() => exportToJSON(filteredTransactions, user?.name || 'user')}
                          disabled={filteredTransactions.length === 0}
                          className="text-sm"
                          variant="outline"
                        >
                          Export JSON
                        </Button>
                        <Button
                          onClick={refreshHistory}
                          disabled={loading}
                          className="text-sm"
                          variant="outline"
                        >
                          {loading ? '🔄 Loading...' : '🔄 Refresh'}
                        </Button>
                    </div>
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

                {/* Transaction Summary Cards */}
                {transactions.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">By Type</h4>
                      <div className="space-y-1 text-sm">
                        {getTransactionTypeSummary(transactions).map(({ type, count, label }) => (
                          <div key={type} className="flex justify-between">
                            <span>{label}</span>
                            <span>{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">By Category</h4>
                      <div className="space-y-1 text-sm">
                        {getTransactionCategorySummary(transactions).map(({ category, count, label }) => (
                          <div key={category} className="flex justify-between">
                            <span>{label}</span>
                            <span>{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">Recent Activity</h4>
                      <div className="space-y-1 text-sm">
                        {getRecentActivitySummary(transactions).map(({ date, count }) => (
                          <div key={date} className="flex justify-between">
                            <span>{date}</span>
                            <span>{count} transactions</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Filters */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Search by description, hash, account, amount, or currency..."
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
                        <option value="conversion_filled">Conversion Filled</option>
                        <option value="order_create">Order Create</option>
                        <option value="order_cancel">Order Cancel</option>
                        <option value="order_filled">Order Filled</option>
                        <option value="custom">Custom</option>
                      </select>
                      
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border rounded-lg bg-background text-sm"
                        title="Filter transactions by status"
                        aria-label="Filter transactions by status"
                      >
                        <option value="">All Statuses</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setDateFilter('')}
                      className={`px-3 py-1 text-xs rounded-full ${!dateFilter ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                    >
                      All Time
                    </button>
                    <button
                      onClick={() => setDateFilter('today')}
                      className={`px-3 py-1 text-xs rounded-full ${dateFilter === 'today' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                    >
                      Today
                    </button>
                    <button
                      onClick={() => setDateFilter('yesterday')}
                      className={`px-3 py-1 text-xs rounded-full ${dateFilter === 'yesterday' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                    >
                      Yesterday
                    </button>
                    <button
                      onClick={() => setDateFilter('week')}
                      className={`px-3 py-1 text-xs rounded-full ${dateFilter === 'week' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                    >
                      Last 7 Days
                    </button>
                    <button
                      onClick={() => setDateFilter('month')}
                      className={`px-3 py-1 text-xs rounded-full ${dateFilter === 'month' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                    >
                      Last 30 Days
                    </button>
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
                  <div className="space-y-6">
                    {groupTransactionsByDate(filteredTransactions).map(({ date, transactions: dateTransactions }) => (
                      <div key={date} className="space-y-3">
                        <div className="text-sm font-medium text-muted-foreground border-b pb-2">
                          {getRelativeDateDescription(date)}
                        </div>
                        {dateTransactions.map((transaction) => (
                          <TransactionRow 
                            key={transaction.id} 
                            transaction={transaction} 
                            onTransactionClick={openTransactionDetails}
                          />
                        ))}
                      </div>
                    ))}
                    
                    {hasMore && (
                      <div className="flex justify-center py-4">
                        <Button 
                          onClick={loadMore} 
                          disabled={loading}
                          variant="outline"
                        >
                          {loading ? 'Loading...' : 'Load More'}
                        </Button>
                      </div>
                    )}
                  </div>
                )}
            </div>
            
            <TransactionDetailsModal 
              transaction={selectedTransaction} 
              isOpen={isModalOpen} 
              onClose={closeTransactionDetails} 
            />
        </div>
    );
}

// Individual transaction row component
function TransactionRow({ transaction, onTransactionClick }: { transaction: Transaction; onTransactionClick: (transaction: Transaction) => void; }) {
    console.log('[TransactionRow] Rendering transaction row', transaction.id);
    
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

    // Format amount for display, handling various cases
    const formatAmount = (amount: string) => {
        if (!amount || amount === '0' || amount === 'N/A') {
            return '';
        }
        return amount;
    };

    // Format currency for display, handling various cases
    const formatCurrency = (currency: string) => {
        if (!currency || currency === 'N/A' || currency === 'MIXED') {
            return '';
        }
        return currency;
    };

    // Determine if we should show amount/currency
    const shouldShowAmount = transaction.amount && transaction.amount !== '0' && transaction.amount !== 'N/A';
    const shouldShowCurrency = transaction.currency && transaction.currency !== 'N/A' && transaction.currency !== 'MIXED';

    return (
        <div 
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
          onClick={() => onTransactionClick(transaction)}
        >
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
                {shouldShowAmount ? (
                    <div className="text-sm font-medium">
                        {formatAmount(transaction.amount)}
                    </div>
                ) : null}
                {shouldShowCurrency ? (
                    <div className="text-xs text-muted-foreground">
                        {formatCurrency(transaction.currency)}
                    </div>
                ) : null}
                {!shouldShowAmount && !shouldShowCurrency && transaction.type !== 'reward' ? (
                    <div className="text-xs text-muted-foreground">
                        No amount
                    </div>
                ) : null}
            </div>
        </div>
    );
}

// Loading skeleton component
function TransactionListSkeleton() {
    console.log('[TransactionListSkeleton] Rendering skeleton');
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