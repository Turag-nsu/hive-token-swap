'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  Wallet as WalletIcon,
  RefreshCw,
  ExternalLink,
  AlertCircle,
  Download,
  Coins,
  TrendingUp,
  Settings,
  ArrowUpRight,
  ArrowDownLeft,
  Plus
} from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import { useWallet } from '@/hooks/useWallet';
import { useWalletData } from '@/hooks/useWalletData';
import { useTransactionHistory } from '@/hooks/useTransactionHistory';
import { keychain } from '@/lib/blockchain/keychain';
import { WalletStats } from '@/components/wallet/WalletStats';
import { SendTokens } from '@/components/wallet/SendTokens';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Input } from '@/components/ui/Input';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/components/ui/Modal';

export default function WalletPage() {
  const { isAuthenticated, username, login } = useUser();
  const { connect, disconnect, isConnecting, error: walletError } = useWallet();
  const { account, balances, loading: accountLoading, error: accountError, refreshAccountData } = useWalletData(username || '', isAuthenticated ? 'keychain' : null);
  const { transactions, loading: transactionsLoading, error: transactionsError, refreshHistory } = useTransactionHistory(username || null);
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'send' | 'receive' | 'swap'>('overview');
  const [usernameInput, setUsernameInput] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [hiveEngineTokens, setHiveEngineTokens] = useState<any[]>([]);
  const [loadingTokens, setLoadingTokens] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);

  // Fetch Hive Engine tokens
  const fetchHiveEngineTokens = async () => {
    if (!username) return;
    
    setLoadingTokens(true);
    try {
      // This would be implemented with actual Hive Engine API calls
      // For now, we'll use placeholder data
      const tokens = [
        { symbol: 'LEO', balance: '100.000', precision: 3 },
        { symbol: 'SWAP.HIVE', balance: '50.000', precision: 8 },
        { symbol: 'POB', balance: '25.000', precision: 3 }
      ];
      setHiveEngineTokens(tokens);
    } catch (error) {
      console.error('Failed to fetch Hive Engine tokens:', error);
    } finally {
      setLoadingTokens(false);
    }
  };

  // Load Hive Engine tokens when username changes
  useEffect(() => {
    if (username) {
      fetchHiveEngineTokens();
    }
  }, [username]);
  
  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      toast.info('Refreshing wallet data...');
      
      // Refresh transaction history
      refreshHistory();
      
      // Refresh account data
      await refreshAccountData();
      
      toast.success('Wallet data refreshed successfully');
    } catch (error) {
      console.error('Failed to refresh wallet data:', error);
      toast.error('Failed to refresh wallet data. Please try again.');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Format currency values with proper precision
  const formatCurrency = (value: string | number, precision: number = 3) => {
    if (typeof value === 'number') {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision
      });
    }
    
    // If value is a string like "10.000 HIVE", extract the number part
    if (typeof value === 'string') {
      const parts = value.split(' ');
      const num = parseFloat(parts[0] || '0');
      if (!isNaN(num)) {
        return num.toLocaleString(undefined, {
          minimumFractionDigits: precision,
          maximumFractionDigits: precision
        });
      }
    }
    
    return value;
  };

  // Format Hive Power with proper calculation
  const formatHivePower = (account: any, balances: any) => {
    if (balances && balances.hive_power) {
      // balances.hive_power is already formatted as "X.XXX HP"
      return balances.hive_power;
    }
    
    if (account?.vesting_shares) {
      // Calculate HP from VESTS
      const vestingShares = parseFloat(account.vesting_shares.split(' ')[0]);
      // Simplified conversion - in reality this would use dynamic global properties
      const hpValue = vestingShares / 1000; // Approximate conversion
      return `~${hpValue.toFixed(0)} HP`;
    }
    
    return '0 HP';
  };

  // Format transaction timestamp
  const formatTransactionTimestamp = (timestamp: string) => {
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
      case 'order_create':
      case 'order_filled':
      case 'order_cancel':
        return '📈';
      case 'account_creation':
      case 'account_created':
      case 'account_update':
        return '👤';
      case 'vote':
      case 'effective_vote':
        return '👍';
      case 'content':
        return '📝';
      case 'custom':
        return '⚙️';
      case 'other':
        return '📋';
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

  // Function to get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transfer':
        return 'bg-blue-100 text-blue-800';
      case 'staking':
        return 'bg-purple-100 text-purple-800';
      case 'income':
        return 'bg-green-100 text-green-800';
      case 'exchange':
        return 'bg-cyan-100 text-cyan-800';
      case 'trading':
        return 'bg-orange-100 text-orange-800';
      case 'social':
        return 'bg-pink-100 text-pink-800';
      case 'other':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle wallet connection using the same strategy as SocialSidebar
  const handleConnect = async () => {
    try {
      toast.info('Connecting to wallet...');
      
      // Check if Keychain is installed
      const isInstalled = await keychain.isInstalled();
      if (!isInstalled) {
        toast.error('Please install Hive Keychain extension');
        return;
      }

      // Get username from input or prompt
      let accountName = usernameInput.trim();
      
      // Perform authentication using sign buffer
      const authMessage = `Login to Hive Social Platform\nTimestamp: ${Date.now()}\nAccount: ${accountName || 'any'}`;

      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Authentication timeout - please try again')), 30000)
      );

      const signResult = await Promise.race([
        keychain.requestSignBuffer(
          accountName || '', // Empty string will prompt user to select account
          authMessage,
          'Posting'
        ),
        timeoutPromise
      ]);

      if (signResult && signResult.success) {
        // Extract the username from the sign result if not provided
        if (!accountName) {
          accountName = signResult.data?.username || signResult.username;
          if (!accountName) {
            throw new Error('Could not determine account name from authentication response.');
          }
        }

        // Login in auth store first
        login(accountName, 'keychain', undefined);
        
        // Also connect the wallet provider for consistency
        try {
          await connect(accountName);
        } catch (walletError) {
          console.warn('Failed to sync with wallet provider:', walletError);
        }

        toast.success(`Successfully connected to @${accountName}`);
        setUsernameInput('');
      } else {
        const errorMsg = signResult?.message || signResult?.error || 'Authentication failed. Please try again.';
        throw new Error(errorMsg);
      }
    } catch (error: any) {
      console.error('Wallet page: connect failed', error);
      toast.error(error.message || 'Failed to login with Hive Keychain');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Wallet</h1>
            <p className="text-muted-foreground">
              Connect your wallet to manage your Hive tokens and transactions
            </p>
          </div>
          
          <Card className="border-2 border-dashed border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center py-8">
                <WalletIcon className="h-16 w-16 mx-auto text-blue-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
                <p className="text-muted-foreground mb-6">
                  Connect with HiveKeychain to access your wallet features
                </p>
                
                <div className="max-w-md mx-auto space-y-4">
                  <Button 
                    onClick={() => setShowUsernameModal(true)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  >
                    <WalletIcon className="mr-2 h-4 w-4" />
                    Connect Wallet
                  </Button>
                </div>
                
                <div className="mt-6 text-xs text-muted-foreground space-y-1">
                  <p>• Requires Hive Keychain browser extension</p>
                  <p>• Your keys never leave your device</p>
                  <p>• Secure blockchain authentication</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Username Input Modal */}
        <Modal open={showUsernameModal} onOpenChange={setShowUsernameModal}>
          <ModalContent className="sm:max-w-md">
            <ModalHeader>
              <ModalTitle>Connect Wallet</ModalTitle>
              <ModalDescription>
                Enter your Hive username to connect your wallet
              </ModalDescription>
            </ModalHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input
                  id="modal-username"
                  label="Hive Username"
                  placeholder="Enter your Hive username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isConnecting) {
                      handleConnect();
                      setShowUsernameModal(false);
                    }
                  }}
                />
              </div>
              {walletError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{walletError}</AlertDescription>
                </Alert>
              )}
            </div>
            <ModalFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setShowUsernameModal(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={async () => {
                  try {
                    await handleConnect();
                    setShowUsernameModal(false);
                  } catch (error) {
                    console.error('Failed to connect wallet:', error);
                    toast.error('Failed to connect wallet. Please try again.');
                  }
                }}
                disabled={isConnecting}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              >
                {isConnecting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Connect'
                )}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Wallet</h1>
            <p className="text-muted-foreground">
              Manage your Hive tokens and transactions
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={async () => {
                try {
                  setIsRefreshing(true);
                  toast.info('Refreshing wallet data...');
                  await handleRefresh();
                } catch (error) {
                  console.error('Failed to refresh wallet data:', error);
                  toast.error('Failed to refresh wallet data. Please try again.');
                } finally {
                  setIsRefreshing(false);
                }
              }}
              disabled={accountLoading || transactionsLoading || isRefreshing}
              className="border-blue-500/30 hover:bg-blue-500/10"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={async () => {
                try {
                  setIsDisconnecting(true);
                  toast.info('Disconnecting wallet...');
                  await disconnect();
                  toast.success('Wallet disconnected successfully');
                } catch (error) {
                  console.error('Failed to disconnect wallet:', error);
                  toast.error('Failed to disconnect wallet. Please try again.');
                } finally {
                  setIsDisconnecting(false);
                }
              }}
              disabled={isDisconnecting}
              className="border-red-500/30 hover:bg-red-500/10"
            >
              <Download className="h-4 w-4 mr-2" />
              {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
            </Button>
          </div>
        </div>

        {/* Wallet Stats */}
        <WalletStats className="mb-8" />

        {/* Account Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Account Card */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <WalletIcon className="h-5 w-5 text-blue-500" />
                Account Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">@{username}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {isAuthenticated ? 'Connected' : 'Disconnected'}
                  </Badge>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold">
                    {username?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Coins className="h-5 w-5 text-red-500" />
                  <div>
                    <div className="text-sm text-muted-foreground">HIVE</div>
                    <div className="font-semibold">
                      {accountLoading ? (
                        <Skeleton className="h-4 w-20" />
                      ) : (
                        balances ? formatCurrency(balances.hive) : formatCurrency(account?.balance || '0.000 HIVE')
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <Coins className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="text-sm text-muted-foreground">HBD</div>
                    <div className="font-semibold">
                      {accountLoading ? (
                        <Skeleton className="h-4 w-20" />
                      ) : (
                        balances ? formatCurrency(balances.hbd) : formatCurrency(account?.hbd_balance || '0.000 HBD')
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-sm text-muted-foreground">Hive Power</div>
                    <div className="font-semibold">
                      {accountLoading ? (
                        <Skeleton className="h-4 w-20" />
                      ) : (
                        formatHivePower(account, balances)
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Hive Engine Tokens */}
              <div className="border-t border-border/50 pt-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Hive Engine Tokens</h4>
                {loadingTokens ? (
                  <div className="grid grid-cols-2 gap-2">
                    <Skeleton className="h-12 rounded-lg" />
                    <Skeleton className="h-12 rounded-lg" />
                    <Skeleton className="h-12 rounded-lg" />
                    <Skeleton className="h-12 rounded-lg" />
                  </div>
                ) : hiveEngineTokens.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {hiveEngineTokens.map((token, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                        <div className="flex items-center space-x-2">
                          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{token.symbol.charAt(0)}</span>
                          </div>
                          <span className="text-sm font-medium">{token.symbol}</span>
                        </div>
                        <span className="text-sm font-semibold">{formatCurrency(token.balance, token.precision || 3)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No Hive Engine tokens found</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-cyan-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="h-16 flex flex-col items-center justify-center gap-1 border-cyan-500/30 hover:bg-cyan-500/10"
                  onClick={() => {
                    setIsNavigating(true);
                    setActiveTab('send');
                    setTimeout(() => setIsNavigating(false), 300);
                  }}
                  disabled={isNavigating}
                >
                  <ArrowUpRight className="h-5 w-5 text-cyan-500" />
                  <span className="text-xs">Send</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-16 flex flex-col items-center justify-center gap-1 border-green-500/30 hover:bg-green-500/10"
                  onClick={() => {
                    setIsNavigating(true);
                    setActiveTab('receive');
                    setTimeout(() => setIsNavigating(false), 300);
                  }}
                  disabled={isNavigating}
                >
                  <ArrowDownLeft className="h-5 w-5 text-green-500" />
                  <span className="text-xs">Receive</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-16 flex flex-col items-center justify-center gap-1 border-purple-500/30 hover:bg-purple-500/10"
                  onClick={() => {
                    setIsNavigating(true);
                    setActiveTab('swap');
                    setTimeout(() => setIsNavigating(false), 300);
                  }}
                  disabled={isNavigating}
                >
                  <Plus className="h-5 w-5 text-purple-500" />
                  <span className="text-xs">Swap</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-16 flex flex-col items-center justify-center gap-1 border-orange-500/30 hover:bg-orange-500/10"
                  asChild
                  disabled={!username}
                >
                  <a 
                    href={username ? `https://hiveblocks.com/@${username}` : '#'}
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!username) {
                        e.preventDefault();
                        toast.error('Username not available. Please connect your wallet first.');
                      }
                    }}
                  >
                    <ExternalLink className="h-5 w-5 text-orange-500" />
                    <span className="text-xs">Explorer</span>
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            onClick={() => {
              setIsNavigating(true);
              setActiveTab('overview');
              setTimeout(() => setIsNavigating(false), 300);
            }}
            disabled={isNavigating}
            className={activeTab === 'overview' ? 'bg-blue-500 hover:bg-blue-600' : ''}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'transactions' ? 'default' : 'outline'}
            onClick={() => {
              setIsNavigating(true);
              setActiveTab('transactions');
              setTimeout(() => setIsNavigating(false), 300);
            }}
            disabled={isNavigating}
            className={activeTab === 'transactions' ? 'bg-blue-500 hover:bg-blue-600' : ''}
          >
            Transactions
          </Button>
          <Button
            variant={activeTab === 'send' ? 'default' : 'outline'}
            onClick={() => {
              setIsNavigating(true);
              setActiveTab('send');
              setTimeout(() => setIsNavigating(false), 300);
            }}
            disabled={isNavigating}
            className={activeTab === 'send' ? 'bg-blue-500 hover:bg-blue-600' : ''}
          >
            Send
          </Button>
          <Button
            variant={activeTab === 'receive' ? 'default' : 'outline'}
            onClick={() => {
              setIsNavigating(true);
              setActiveTab('receive');
              setTimeout(() => setIsNavigating(false), 300);
            }}
            disabled={isNavigating}
            className={activeTab === 'receive' ? 'bg-blue-500 hover:bg-blue-600' : ''}
          >
            Receive
          </Button>
          <Button
            variant={activeTab === 'swap' ? 'default' : 'outline'}
            onClick={() => {
              setIsNavigating(true);
              setActiveTab('swap');
              setTimeout(() => setIsNavigating(false), 300);
            }}
            disabled={isNavigating}
            className={activeTab === 'swap' ? 'bg-blue-500 hover:bg-blue-600' : ''}
          >
            Swap
          </Button>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {accountError && (
              <Alert variant="destructive">
                <AlertDescription>{accountError}</AlertDescription>
              </Alert>
            )}
            
            {transactionsError && (
              <Alert variant="destructive">
                <AlertDescription>{transactionsError}</AlertDescription>
              </Alert>
            )}
            
            {/* Account Details */}
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Account Header */}
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <WalletIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold">@{account?.name || username}</h3>
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
                        <div className="font-semibold">
                          {accountLoading ? (
                            <Skeleton className="h-4 w-20" />
                          ) : (
                            balances ? formatCurrency(balances.hive) : formatCurrency(account?.balance || '0.000 HIVE')
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                      <Coins className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">HBD</div>
                        <div className="font-semibold">
                          {accountLoading ? (
                            <Skeleton className="h-4 w-20" />
                          ) : (
                            balances ? formatCurrency(balances.hbd) : formatCurrency(account?.hbd_balance || '0.000 HBD')
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">Hive Power</div>
                        <div className="font-semibold">
                          {accountLoading ? (
                            <Skeleton className="h-4 w-20" />
                          ) : (
                            formatHivePower(account, balances)
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hive Engine Tokens */}
                  <div className="border-t border-border/50 pt-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Hive Engine Tokens</h4>
                    {loadingTokens ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <Skeleton className="h-12 rounded-lg" />
                        <Skeleton className="h-12 rounded-lg" />
                        <Skeleton className="h-12 rounded-lg" />
                        <Skeleton className="h-12 rounded-lg" />
                      </div>
                    ) : hiveEngineTokens.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {hiveEngineTokens.map((token, index) => (
                          <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                            <div className="flex items-center space-x-2">
                              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                                <span className="text-xs font-bold text-white">{token.symbol.charAt(0)}</span>
                              </div>
                              <span className="text-sm font-medium">{token.symbol}</span>
                            </div>
                            <span className="text-sm font-semibold">{formatCurrency(token.balance, token.precision || 3)}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">No Hive Engine tokens found</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Transactions Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactionsLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                    ))
                  ) : transactions.length > 0 ? (
                    transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-lg">
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">{transaction.description}</div>
                            <div className="flex items-center space-x-2">
                              <div className="text-xs text-muted-foreground">
                                {formatTransactionTimestamp(transaction.timestamp)}
                              </div>
                              <Badge 
                                className={`text-xs ${getStatusColor(transaction.status)}`}
                              >
                                {transaction.status}
                              </Badge>
                              {transaction.category && (
                                <Badge 
                                  className={`text-xs ${getCategoryColor(transaction.category)}`}
                                >
                                  {transaction.category}
                                </Badge>
                              )}
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
                          {transaction.usdValue && transaction.usdValue > 0 && (
                            <div className="text-xs text-muted-foreground">
                              ${transaction.usdValue.toFixed(2)} USD
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-muted-foreground mb-2">📋</div>
                      <div className="text-sm text-muted-foreground">
                        No transactions found for this account
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab === 'transactions' && (
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactionsLoading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  ))
                ) : transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-lg">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{transaction.description}</div>
                          <div className="flex items-center space-x-2">
                            <div className="text-xs text-muted-foreground">
                              {formatTransactionTimestamp(transaction.timestamp)}
                            </div>
                            <Badge 
                              className={`text-xs ${getStatusColor(transaction.status)}`}
                            >
                              {transaction.status}
                            </Badge>
                            {transaction.category && (
                              <Badge 
                                className={`text-xs ${getCategoryColor(transaction.category)}`}
                              >
                                {transaction.category}
                              </Badge>
                            )}
                          </div>
                          {transaction.memo && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Memo: {transaction.memo}
                            </div>
                          )}
                          {transaction.tags && transaction.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {transaction.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm font-medium">
                          {transaction.amount !== '0' ? transaction.amount : 'N/A'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {transaction.currency}
                        </div>
                        {transaction.usdValue && transaction.usdValue > 0 && (
                          <div className="text-xs text-muted-foreground">
                            ${transaction.usdValue.toFixed(2)} USD
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="text-muted-foreground mb-2">📋</div>
                    <div className="text-sm text-muted-foreground">
                      No transactions found for this account
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'send' && <SendTokens className="mb-6" />}
        
        {activeTab === 'receive' && (
          <Card>
            <CardHeader>
              <CardTitle>Receive Tokens</CardTitle>
            </CardHeader>
            <CardContent className="py-8">
              <div className="text-center">
                <ArrowDownLeft className="h-12 w-12 mx-auto text-green-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Receive Tokens</h3>
                <p className="text-muted-foreground mb-4">
                  Share your account name to receive tokens
                </p>
                <div className="bg-muted p-4 rounded-lg inline-block">
                  <code className="text-lg font-mono">@{username}</code>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Anyone can send you tokens by entering your username above
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'swap' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-purple-500" />
                Token Swap
              </CardTitle>
            </CardHeader>
            <CardContent className="py-8">
              <div className="text-center">
                <Plus className="h-12 w-12 mx-auto text-purple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Swap Tokens</h3>
                <p className="text-muted-foreground mb-4">
                  Exchange between HIVE, HBD, and other tokens
                </p>
                <div className="max-w-md mx-auto space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">From</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>HIVE</option>
                        <option>HBD</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">To</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>HBD</option>
                        <option>HIVE</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount</label>
                    <Input type="number" placeholder="0.000" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                    Swap Tokens
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Note: Swaps are processed through the Hive blockchain
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}