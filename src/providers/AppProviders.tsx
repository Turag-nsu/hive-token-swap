'use client';

import React from 'react';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';
import { NotificationProvider } from './NotificationProvider';
import { WalletProvider } from './WalletProvider';
import { HiveSignerProvider } from './HiveSignerProvider';

// Import hooks to re-export them
import { useTheme, useThemeToggle, useDarkMode } from './ThemeProvider';
import { 
  useNotification, 
  useSuccessNotification, 
  useErrorNotification, 
  useWarningNotification,
  useInfoNotification,
  useLoadingNotification,
  usePromiseNotification 
} from './NotificationProvider';
import { useWallet } from '../hooks/useWallet';
import { 
  useWalletConnection, 
  useWalletUser, 
  useWalletSigning,
  useKeychainStatus 
} from '@/hooks/useWallet';
import { 
  useInvalidateQueries, 
  useClearCache, 
  usePrefetch 
} from './QueryProvider';

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Root provider component that wraps the entire application with all necessary providers.
 * The order of providers is important:
 * 1. QueryProvider - Must be first as other providers may use React Query
 * 2. ThemeProvider - Needed for notification theming
 * 3. NotificationProvider - Needed for wallet notifications
 * 4. WalletProvider - Uses notifications for user feedback
 * 5. HiveSignerProvider - For HiveSigner authentication
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <NotificationProvider>
          <WalletProvider>
            <HiveSignerProvider>
              {children}
            </HiveSignerProvider>
          </WalletProvider>
        </NotificationProvider>
      </ThemeProvider>
    </QueryProvider>
  );
};

// Re-export all provider hooks for convenience
export { 
  useTheme, 
  useThemeToggle, 
  useDarkMode 
};

export { 
  useNotification, 
  useSuccessNotification, 
  useErrorNotification, 
  useWarningNotification,
  useInfoNotification,
  useLoadingNotification,
  usePromiseNotification 
};

export { 
  useWallet, 
  useWalletConnection, 
  useWalletUser, 
  useWalletSigning,
  useKeychainStatus 
};

export { 
  useInvalidateQueries, 
  useClearCache, 
  usePrefetch 
};
