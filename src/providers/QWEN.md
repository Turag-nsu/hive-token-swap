# Providers Directory

This directory contains React Context providers that manage global application state, theme configuration, and cross-component data sharing.

## Overview

Providers offer centralized state management and configuration:
- **Theme Provider**: Dark/light mode and design system management
- **Wallet Provider**: Global wallet connection state
- **Query Provider**: React Query configuration and cache management
- **Notification Provider**: Toast notifications and alerts
- **Settings Provider**: User preferences and app configuration
- **Animation Provider**: GSAP and motion configuration

## Provider Architecture

```
providers/
├── ThemeProvider.tsx         # Theme and design system
├── WalletProvider.tsx        # Wallet connection state
├── QueryProvider.tsx         # React Query setup
├── NotificationProvider.tsx  # Toast and notifications
├── SettingsProvider.tsx      # User preferences
├── AnimationProvider.tsx     # Animation configuration
├── AppProviders.tsx          # Combined provider wrapper
└── README.md                 # This file
```

## Core Providers

### Theme Provider (`ThemeProvider.tsx`)

Manages application theming and design system:

```typescript
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  computedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem('theme') as Theme) || 'system';
  });

  const [computedTheme, setComputedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      setComputedTheme(systemTheme);
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      setComputedTheme(theme);
      root.classList.toggle('dark', theme === 'dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setComputedTheme(e.matches ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const value = {
    theme,
    computedTheme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

### Wallet Provider (`WalletProvider.tsx`)

Manages global wallet connection state:

```typescript
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { keychain } from '@/lib/blockchain/keychain';
import { hiveRPC } from '@/lib/api/hive-rpc';

interface WalletState {
  user: HiveAccount | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  keychainInstalled: boolean;
}

type WalletAction =
  | { type: 'KEYCHAIN_DETECTED'; payload: boolean }
  | { type: 'CONNECT_START' }
  | { type: 'CONNECT_SUCCESS'; payload: HiveAccount }
  | { type: 'CONNECT_ERROR'; payload: string }
  | { type: 'DISCONNECT' }
  | { type: 'CLEAR_ERROR' };

const walletReducer = (state: WalletState, action: WalletAction): WalletState => {
  switch (action.type) {
    case 'KEYCHAIN_DETECTED':
      return { ...state, keychainInstalled: action.payload };
    case 'CONNECT_START':
      return { ...state, isConnecting: true, error: null };
    case 'CONNECT_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isConnected: true,
        isConnecting: false,
        error: null,
      };
    case 'CONNECT_ERROR':
      return {
        ...state,
        isConnecting: false,
        error: action.payload,
      };
    case 'DISCONNECT':
      return {
        ...state,
        user: null,
        isConnected: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

interface WalletContextValue extends WalletState {
  connect: (username?: string) => Promise<void>;
  disconnect: () => void;
  signTransaction: (
    operations: Operation[],
    keyType?: 'posting' | 'active'
  ) => Promise<any>;
  clearError: () => void;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [state, dispatch] = useReducer(walletReducer, {
    user: null,
    isConnected: false,
    isConnecting: false,
    error: null,
    keychainInstalled: false,
  });

  // Check for HiveKeychain installation
  useEffect(() => {
    const checkKeychain = () => {
      const installed = keychain.isInstalled();
      dispatch({ type: 'KEYCHAIN_DETECTED', payload: installed });
    };

    checkKeychain();
    const interval = setInterval(checkKeychain, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Auto-connect on mount if previously connected
  useEffect(() => {
    const savedUsername = localStorage.getItem('hive-username');
    if (savedUsername && state.keychainInstalled && !state.isConnected) {
      connect(savedUsername);
    }
  }, [state.keychainInstalled]);

  const connect = async (username?: string) => {
    if (!state.keychainInstalled) {
      dispatch({ 
        type: 'CONNECT_ERROR', 
        payload: 'HiveKeychain extension not found. Please install it first.' 
      });
      return;
    }

    dispatch({ type: 'CONNECT_START' });

    try {
      let accountName = username;
      
      if (!accountName) {
        // Request account selection from Keychain
        accountName = await keychain.requestHandshake();
      }

      // Fetch account data
      const account = await hiveRPC.getAccount(accountName);
      
      if (!account) {
        throw new Error(`Account '${accountName}' not found`);
      }

      dispatch({ type: 'CONNECT_SUCCESS', payload: account });
      localStorage.setItem('hive-username', account.name);
      
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Connection failed';
      dispatch({ type: 'CONNECT_ERROR', payload: message });
    }
  };

  const disconnect = () => {
    dispatch({ type: 'DISCONNECT' });
    localStorage.removeItem('hive-username');
  };

  const signTransaction = async (
    operations: Operation[],
    keyType: 'posting' | 'active' = 'posting'
  ) => {
    if (!state.user) {
      throw new Error('Wallet not connected');
    }

    try {
      const result = await keychain.requestBroadcast(
        state.user.name,
        operations,
        keyType
      );
      
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Transaction failed';
      throw new Error(message);
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: WalletContextValue = {
    ...state,
    connect,
    disconnect,
    signTransaction,
    clearError,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextValue => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
```

### Query Provider (`QueryProvider.tsx`)

Configures React Query for the application:

```typescript
import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  MutationCache,
  QueryCache,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { toast } from 'sonner';

// Global error handler
const handleError = (error: unknown) => {
  const message = error instanceof Error ? error.message : 'An unexpected error occurred';
  
  // Don't show toast for certain errors
  const suppressedErrors = [
    'User rejected',
    'User canceled',
    'Network request failed',
  ];
  
  const shouldSuppress = suppressedErrors.some(suppressedError =>
    message.includes(suppressedError)
  );
  
  if (!shouldSuppress) {
    toast.error(message);
  }
  
  console.error('Query/Mutation error:', error);
};

// Create query client with custom configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000, // 30 seconds
      cacheTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error instanceof Error && error.message.includes('4')) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
  queryCache: new QueryCache({
    onError: handleError,
  }),
  mutationCache: new MutationCache({
    onError: handleError,
  }),
});

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools 
          initialIsOpen={false} 
          position="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
};

export { queryClient };
```

### Notification Provider (`NotificationProvider.tsx`)

Manages toast notifications and alerts:

```typescript
import React, { createContext, useContext, useCallback } from 'react';
import { Toaster, toast } from 'sonner';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

interface NotificationContextValue {
  success: (message: string, options?: NotificationOptions) => void;
  error: (message: string, options?: NotificationOptions) => void;
  warning: (message: string, options?: NotificationOptions) => void;
  info: (message: string, options?: NotificationOptions) => void;
  loading: (message: string, promise: Promise<any>) => Promise<any>;
}

interface NotificationOptions {
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const success = useCallback((message: string, options?: NotificationOptions) => {
    toast.success(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      icon: <CheckCircle className="h-4 w-4" />,
      action: options?.action && {
        label: options.action.label,
        onClick: options.action.onClick,
      },
    });
  }, []);

  const error = useCallback((message: string, options?: NotificationOptions) => {
    toast.error(message, {
      description: options?.description,
      duration: options?.duration || 6000,
      icon: <XCircle className="h-4 w-4" />,
      action: options?.action && {
        label: options.action.label,
        onClick: options.action.onClick,
      },
    });
  }, []);

  const warning = useCallback((message: string, options?: NotificationOptions) => {
    toast.warning(message, {
      description: options?.description,
      duration: options?.duration || 5000,
      icon: <AlertTriangle className="h-4 w-4" />,
      action: options?.action && {
        label: options.action.label,
        onClick: options.action.onClick,
      },
    });
  }, []);

  const info = useCallback((message: string, options?: NotificationOptions) => {
    toast.info(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      icon: <Info className="h-4 w-4" />,
      action: options?.action && {
        label: options.action.label,
        onClick: options.action.onClick,
      },
    });
  }, []);

  const loading = useCallback(async (message: string, promise: Promise<any>) => {
    return toast.promise(promise, {
      loading: message,
      success: 'Operation completed successfully',
      error: (error) => error.message || 'Operation failed',
    });
  }, []);

  const value = {
    success,
    error,
    warning,
    info,
    loading,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Toaster 
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextValue => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
```

### Settings Provider (`SettingsProvider.tsx`)

Manages user preferences and app settings:

```typescript
import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface AppSettings {
  slippage: number;
  autoConnect: boolean;
  compactMode: boolean;
  animationsEnabled: boolean;
  soundEnabled: boolean;
  currency: 'USD' | 'EUR' | 'GBP';
  language: 'en' | 'es' | 'fr' | 'de';
  notifications: {
    transactions: boolean;
    priceAlerts: boolean;
    news: boolean;
  };
  privacy: {
    analytics: boolean;
    crashReports: boolean;
  };
}

const defaultSettings: AppSettings = {
  slippage: 0.5,
  autoConnect: true,
  compactMode: false,
  animationsEnabled: true,
  soundEnabled: false,
  currency: 'USD',
  language: 'en',
  notifications: {
    transactions: true,
    priceAlerts: true,
    news: false,
  },
  privacy: {
    analytics: false,
    crashReports: true,
  },
};

type SettingsAction =
  | { type: 'LOAD_SETTINGS'; payload: Partial<AppSettings> }
  | { type: 'UPDATE_SETTING'; payload: { key: keyof AppSettings; value: any } }
  | { type: 'UPDATE_NESTED_SETTING'; payload: { parent: keyof AppSettings; key: string; value: any } }
  | { type: 'RESET_SETTINGS' };

const settingsReducer = (state: AppSettings, action: SettingsAction): AppSettings => {
  switch (action.type) {
    case 'LOAD_SETTINGS':
      return { ...state, ...action.payload };
    case 'UPDATE_SETTING':
      return { ...state, [action.payload.key]: action.payload.value };
    case 'UPDATE_NESTED_SETTING':
      const { parent, key, value } = action.payload;
      return {
        ...state,
        [parent]: {
          ...(state[parent] as object),
          [key]: value,
        },
      };
    case 'RESET_SETTINGS':
      return { ...defaultSettings };
    default:
      return state;
  }
};

interface SettingsContextValue {
  settings: AppSettings;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  updateNestedSetting: (parent: keyof AppSettings, key: string, value: any) => void;
  resetSettings: () => void;
  exportSettings: () => string;
  importSettings: (data: string) => boolean;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [settings, dispatch] = useReducer(settingsReducer, defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('app-settings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        dispatch({ type: 'LOAD_SETTINGS', payload: parsed });
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('app-settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }, [settings]);

  const updateSetting = <K extends keyof AppSettings>(
    key: K, 
    value: AppSettings[K]
  ) => {
    dispatch({ type: 'UPDATE_SETTING', payload: { key, value } });
  };

  const updateNestedSetting = (
    parent: keyof AppSettings, 
    key: string, 
    value: any
  ) => {
    dispatch({ type: 'UPDATE_NESTED_SETTING', payload: { parent, key, value } });
  };

  const resetSettings = () => {
    dispatch({ type: 'RESET_SETTINGS' });
  };

  const exportSettings = () => {
    return JSON.stringify(settings, null, 2);
  };

  const importSettings = (data: string): boolean => {
    try {
      const parsed = JSON.parse(data);
      dispatch({ type: 'LOAD_SETTINGS', payload: parsed });
      return true;
    } catch (error) {
      console.error('Failed to import settings:', error);
      return false;
    }
  };

  const value = {
    settings,
    updateSetting,
    updateNestedSetting,
    resetSettings,
    exportSettings,
    importSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextValue => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
```

### Combined App Providers (`AppProviders.tsx`)

Combines all providers in the correct order:

```typescript
import React from 'react';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';
import { WalletProvider } from './WalletProvider';
import { NotificationProvider } from './NotificationProvider';
import { SettingsProvider } from './SettingsProvider';
import { AnimationProvider } from './AnimationProvider';

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryProvider>
      <SettingsProvider>
        <ThemeProvider>
          <NotificationProvider>
            <WalletProvider>
              <AnimationProvider>
                {children}
              </AnimationProvider>
            </WalletProvider>
          </NotificationProvider>
        </ThemeProvider>
      </SettingsProvider>
    </QueryProvider>
  );
};
```

## Usage Patterns

### Provider Composition
```typescript
// app/layout.tsx or _app.tsx
import { AppProviders } from '@/providers/AppProviders';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
```

### Hook Usage in Components
```typescript
// Component example
import { useWallet, useTheme, useNotification } from '@/providers';

export const SwapInterface = () => {
  const { user, connect, signTransaction } = useWallet();
  const { theme, toggleTheme } = useTheme();
  const { success, error } = useNotification();

  const handleSwap = async () => {
    try {
      const result = await signTransaction(operations);
      success('Swap completed successfully!');
    } catch (err) {
      error('Swap failed: ' + err.message);
    }
  };

  return (
    <div className={`swap-interface ${theme}`}>
      {/* Component JSX */}
    </div>
  );
};
```

## Testing Providers

### Provider Testing Pattern
```typescript
// ThemeProvider.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeProvider';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('ThemeProvider', () => {
  it('provides default theme', () => {
    renderWithProvider(<TestComponent />);
    expect(screen.getByTestId('theme')).toHaveTextContent('system');
  });

  it('toggles theme correctly', () => {
    renderWithProvider(<TestComponent />);
    
    const toggleButton = screen.getByText('Toggle');
    fireEvent.click(toggleButton);
    
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });
});
```

## Performance Considerations

### Context Optimization
- Split large contexts into smaller, focused ones
- Use `useMemo` and `useCallback` for expensive operations
- Implement proper dependency arrays
- Avoid unnecessary re-renders with React.memo

### State Management
- Keep state as flat as possible
- Use reducers for complex state logic
- Implement proper error boundaries
- Monitor context performance with React DevTools

## Future Enhancements

Planned improvements:
- Persistence layer for offline support
- Real-time synchronization across tabs
- Enhanced error recovery mechanisms
- Performance monitoring and analytics
- A/B testing framework integration
- Advanced notification targeting