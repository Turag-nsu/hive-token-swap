import React from 'react';
import { render, screen } from '@testing-library/react';
import WalletPage from './page';
import { WalletProvider } from '@/providers/WalletProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

// Mock the useWallet hook
jest.mock('@/hooks/useWallet', () => ({
  useWallet: () => ({
    user: { name: 'testuser' },
    isConnected: true,
    isConnecting: false,
    connect: jest.fn(),
    disconnect: jest.fn(),
  }),
}));

// Mock the useWalletData hook
jest.mock('@/hooks/useWalletData', () => ({
  useWalletData: () => ({
    account: { name: 'testuser', balance: '10.000 HIVE', hbd_balance: '5.000 HBD' },
    balances: { hive: '10.000 HIVE', hbd: '5.000 HBD', hive_power: '100.000 HP' },
    loading: false,
    error: null,
    refreshAccountData: jest.fn(),
  }),
}));

// Mock the useTransactionHistory hook
jest.mock('@/hooks/useTransactionHistory', () => ({
  useTransactionHistory: () => ({
    transactions: [
      {
        id: '1',
        type: 'transfer',
        description: 'Sent to user2',
        amount: '1.000',
        currency: 'HIVE',
        status: 'completed',
        timestamp: '2023-01-01T00:00:00Z',
        hash: 'abc123',
      },
    ],
    stats: {
      totalTransactions: 10,
      totalVolume: '50.000 HIVE',
      avgFee: '0.001 HIVE',
      successRate: '100%',
    },
    loading: false,
    error: null,
    refreshHistory: jest.fn(),
  }),
}));

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/wallet',
}));

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  Wallet: () => <div data-testid="wallet-icon" />,
  RefreshCw: () => <div data-testid="refresh-icon" />,
  Send: () => <div data-testid="send-icon" />,
  Download: () => <div data-testid="download-icon" />,
  Settings: () => <div data-testid="settings-icon" />,
  Shield: () => <div data-testid="shield-icon" />,
  Activity: () => <div data-testid="activity-icon" />,
  TrendingUp: () => <div data-testid="trending-up-icon" />,
  Coins: () => <div data-testid="coins-icon" />,
  ArrowUpRight: () => <div data-testid="arrow-up-right-icon" />,
  ArrowDownLeft: () => <div data-testid="arrow-down-left-icon" />,
  Plus: () => <div data-testid="plus-icon" />,
  ExternalLink: () => <div data-testid="external-link-icon" />,
}));

describe('WalletPage', () => {
  const renderWithProviders = (component: React.ReactNode) => {
    return render(
      <ThemeProvider>
        <QueryProvider>
          <WalletProvider>
            {component}
          </WalletProvider>
        </QueryProvider>
      </ThemeProvider>
    );
  };

  it('renders wallet page with connected state', () => {
    renderWithProviders(<WalletPage />);
    
    // Check that the main heading is present
    expect(screen.getByText('Wallet')).toBeInTheDocument();
    
    // Check that account information is displayed
    expect(screen.getByText('@testuser')).toBeInTheDocument();
    
    // Check that balances are displayed
    expect(screen.getByText('10.000 HIVE')).toBeInTheDocument();
    expect(screen.getByText('5.000 HBD')).toBeInTheDocument();
    expect(screen.getByText('100.000 HP')).toBeInTheDocument();
    
    // Check that navigation tabs are present
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Transactions')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
    expect(screen.getByText('Receive')).toBeInTheDocument();
  });

  it('renders transaction history', () => {
    renderWithProviders(<WalletPage />);
    
    // Check that transaction is displayed
    expect(screen.getByText('Sent to user2')).toBeInTheDocument();
    expect(screen.getByText('1.000')).toBeInTheDocument();
    expect(screen.getByText('HIVE')).toBeInTheDocument();
  });

  it('renders wallet stats', () => {
    renderWithProviders(<WalletPage />);
    
    // Check that stats are displayed
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('50.000 HIVE')).toBeInTheDocument();
    expect(screen.getByText('0.001 HIVE')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
});