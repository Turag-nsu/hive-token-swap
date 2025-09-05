# Hooks Directory

This directory contains custom React hooks that encapsulate stateful logic, API interactions, and blockchain operations for the Hive token swap application.

## Overview

Custom hooks provide reusable stateful logic that can be shared across components:
- **Blockchain Hooks**: Interact with Hive blockchain and APIs
- **State Management**: Handle complex state transitions
- **API Integration**: Manage data fetching and caching
- **UI Hooks**: Handle common UI patterns and behaviors
- **Utility Hooks**: Provide helper functionality for components

## Hook Categories

### Blockchain & Wallet Hooks

#### `useWallet.ts`
Core wallet management hook:
- HiveKeychain connection and authentication
- Account information and session management
- Transaction signing and broadcasting
- Multi-account support and switching
- Connection persistence and auto-reconnect

#### `useBalances.ts`
Token balance management:
- Real-time balance fetching for HIVE/HBD
- Hive Engine token balance tracking
- USD value calculations with price feeds
- Balance refresh and cache invalidation
- Historical balance tracking

#### `useSwapQuote.ts`
Swap rate and quote calculations:
- Real-time price quotes between token pairs
- Slippage calculation and price impact
- Route optimization for multi-hop swaps
- Market depth and liquidity analysis
- Rate comparison across exchanges

#### `useTransactions.ts`
Transaction management and monitoring:
- Transaction history retrieval
- Real-time transaction status tracking
- Transaction retry and error handling
- Fee estimation and optimization
- Batch transaction support

### State Management Hooks

#### `useSwapState.ts`
Centralized swap interface state:
- Token selection and amount management
- Swap configuration (slippage, deadline)
- Transaction flow state machine
- Error handling and recovery
- Form validation and submission

#### `useLocalStorage.ts`
Persistent local storage management:
- Type-safe localStorage operations
- Automatic serialization/deserialization
- Storage event synchronization
- Cleanup and migration utilities
- Quota management and fallbacks

#### `useQueryParams.ts`
URL parameter synchronization:
- Sync component state with URL params
- Deep linking support for app states
- History management and navigation
- SEO-friendly URL structures
- Share-friendly state persistence

### API & Data Hooks

#### `useTokenList.ts`
Token metadata and information:
- Hive Engine token list management
- Token metadata caching and updates
- Custom token addition and validation
- Token search and filtering
- Price feed integration

#### `useMarketData.ts`
Market information and analytics:
- Trading pair information
- Volume and liquidity metrics
- Price history and charts
- Market trends and analysis
- Orderbook data integration

#### `usePriceFeeds.ts`
External price data integration:
- Multiple price source aggregation
- Real-time price updates
- Historical price data
- Price alerts and notifications
- Currency conversion utilities

### UI & UX Hooks

#### `useDebounce.ts`
Input debouncing for performance:
- Configurable delay and cleanup
- Multiple debounce instance management
- Cancel and immediate execution options
- TypeScript generic support
- Memory leak prevention

#### `useThrottle.ts`
Rate limiting for frequent operations:
- Configurable throttling intervals
- Leading/trailing edge options
- Cancellation and reset capabilities
- Performance monitoring integration
- Resource usage optimization

#### `useAnimation.ts`
Animation state management:
- GSAP timeline coordination
- Framer Motion integration
- Animation queue management
- Performance optimization
- Accessibility considerations

#### `useMediaQuery.ts`
Responsive design utilities:
- Breakpoint detection and monitoring
- Mobile/desktop behavior switching
- Orientation change handling
- Print media detection
- Accessibility preference detection

### Form & Validation Hooks

#### `useFormValidation.ts`
Comprehensive form validation:
- Schema-based validation with Zod
- Real-time field validation
- Cross-field validation rules
- Error message management
- Accessibility compliance

#### `useAsyncValidation.ts`
Asynchronous validation operations:
- Account name availability checking
- Token validation and verification
- Rate limiting for API calls
- Debounced validation triggers
- Loading state management

## Implementation Standards

### Hook Structure Pattern
```tsx
// useCustomHook.ts
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface HookOptions {
  enabled?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

interface HookReturn {
  data: any;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useCustomHook = (
  params: HookParams,
  options: HookOptions = {}
): HookReturn => {
  const { enabled = true, onSuccess, onError } = options;
  
  // Local state management
  const [localState, setLocalState] = useState<any>(null);
  
  // React Query integration
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['custom-hook', params],
    queryFn: () => fetchData(params),
    enabled,
    onSuccess,
    onError,
    staleTime: 5000,
    cacheTime: 300000,
  });

  // Memoized calculations
  const processedData = useMemo(() => {
    return data ? processData(data) : null;
  }, [data]);

  // Callback functions
  const handleAction = useCallback(async (actionParams: any) => {
    try {
      const result = await performAction(actionParams);
      setLocalState(result);
      return result;
    } catch (error) {
      onError?.(error as Error);
      throw error;
    }
  }, [onError]);

  // Cleanup and side effects
  useEffect(() => {
    return () => {
      // Cleanup logic
    };
  }, []);

  return {
    data: processedData,
    isLoading,
    error,
    refetch,
    handleAction,
  };
};
```

### Error Handling Pattern
```tsx
// useErrorHandler.ts
export const useErrorHandler = () => {
  const handleError = useCallback((error: Error, context?: string) => {
    // Log error for debugging
    console.error(`[${context}]`, error);
    
    // Show user-friendly message
    if (error.message.includes('network')) {
      toast.error('Network connection error. Please check your internet.');
    } else if (error.message.includes('unauthorized')) {
      toast.error('Please connect your wallet to continue.');
    } else {
      toast.error(error.message || 'An unexpected error occurred.');
    }

    // Report to error monitoring service
    reportError(error, context);
  }, []);

  return { handleError };
};
```

### Data Fetching Pattern
```tsx
// useDataFetcher.ts
export const useDataFetcher = <T>(
  key: string[],
  fetcher: () => Promise<T>,
  options?: UseQueryOptions<T>
) => {
  const { handleError } = useErrorHandler();
  
  return useQuery({
    queryKey: key,
    queryFn: fetcher,
    retry: (failureCount, error) => {
      // Custom retry logic
      if (error.message.includes('404')) return false;
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    onError: (error) => handleError(error as Error, key.join('-')),
    staleTime: 30000,
    cacheTime: 300000,
    ...options,
  });
};
```

## Advanced Hook Examples

### Wallet Integration Hook
```tsx
// useWallet.ts - Complete implementation
import { useState, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useWallet = () => {
  const [state, setState] = useState({
    user: null as HiveAccount | null,
    isConnected: false,
    isConnecting: false,
    error: null as string | null,
    keychainInstalled: false,
  });

  const queryClient = useQueryClient();

  // Check HiveKeychain installation
  const checkKeychain = useCallback(() => {
    const installed = !!(window as any).hive_keychain;
    setState(prev => ({ ...prev, keychainInstalled: installed }));
    return installed;
  }, []);

  // Connect to wallet
  const connect = useCallback(async (username?: string) => {
    if (!checkKeychain()) {
      setState(prev => ({ ...prev, error: 'HiveKeychain not installed' }));
      return;
    }

    setState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      const result = username 
        ? await connectDirectly(username)
        : await requestConnection();
        
      setState(prev => ({
        ...prev,
        user: result,
        isConnected: true,
        isConnecting: false,
      }));

      // Cache connection
      localStorage.setItem('hive-username', result.name);
      
    } catch (error) {
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: error instanceof Error ? error.message : 'Connection failed',
      }));
    }
  }, [checkKeychain]);

  // Disconnect wallet
  const disconnect = useCallback(() => {
    setState(prev => ({
      ...prev,
      user: null,
      isConnected: false,
      error: null,
    }));
    
    localStorage.removeItem('hive-username');
    queryClient.clear();
  }, [queryClient]);

  // Sign transaction
  const signTransaction = useCallback(async (
    operations: Operation[],
    keyType: 'posting' | 'active' = 'posting'
  ) => {
    if (!state.user || !state.keychainInstalled) {
      throw new Error('Wallet not connected');
    }

    return new Promise((resolve, reject) => {
      (window as any).hive_keychain.requestBroadcast(
        state.user.name,
        operations,
        keyType,
        (response: any) => {
          if (response.success) {
            resolve(response.result);
          } else {
            reject(new Error(response.message || 'Transaction failed'));
          }
        }
      );
    });
  }, [state.user, state.keychainInstalled]);

  // Auto-connect on mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('hive-username');
    if (savedUsername && checkKeychain()) {
      connect(savedUsername);
    }
  }, [connect, checkKeychain]);

  return {
    ...state,
    connect,
    disconnect,
    signTransaction,
    refresh: checkKeychain,
  };
};
```

### Swap Quote Hook
```tsx
// useSwapQuote.ts - Real-time price quotes
export const useSwapQuote = (
  fromToken: HiveEngineToken | null,
  toToken: HiveEngineToken | null,
  amount: string
) => {
  const [debouncedAmount] = useDebounce(amount, 500);
  
  return useQuery({
    queryKey: ['swap-quote', fromToken?.symbol, toToken?.symbol, debouncedAmount],
    queryFn: async () => {
      if (!fromToken || !toToken || !debouncedAmount) return null;
      
      const numAmount = parseFloat(debouncedAmount);
      if (isNaN(numAmount) || numAmount <= 0) return null;

      // Fetch quote from multiple sources
      const [hiveEngineQuote, externalQuote] = await Promise.allSettled([
        getHiveEngineQuote(fromToken, toToken, numAmount),
        getExternalQuote(fromToken, toToken, numAmount),
      ]);

      // Return best quote
      const quotes = [hiveEngineQuote, externalQuote]
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as PromiseFulfilledResult<any>).value);

      return getBestQuote(quotes);
    },
    enabled: !!(fromToken && toToken && debouncedAmount),
    staleTime: 5000, // 5 second stale time
    cacheTime: 30000, // 30 second cache
    refetchInterval: 10000, // Refetch every 10 seconds
    retry: 2,
    retryDelay: 1000,
  });
};
```

### Form Validation Hook
```tsx
// useFormValidation.ts - Schema-based validation
import { z } from 'zod';

const swapFormSchema = z.object({
  fromToken: z.string().min(1, 'Please select a token'),
  toToken: z.string().min(1, 'Please select a token'),
  amount: z.string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, 'Invalid amount'),
  slippage: z.number().min(0.1).max(10),
}).refine((data) => data.fromToken !== data.toToken, {
  message: "From and to tokens must be different",
  path: ["toToken"],
});

export const useSwapFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const validateField = useCallback((field: string, value: any, formData: any) => {
    try {
      swapFormSchema.pick({ [field]: true }).parse({ [field]: value });
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find(e => e.path[0] === field);
        if (fieldError) {
          setErrors(prev => ({ ...prev, [field]: fieldError.message }));
        }
      }
    }
  }, []);

  const validateForm = useCallback((formData: any) => {
    try {
      swapFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          const field = err.path[0] as string;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  }, []);

  const markFieldTouched = useCallback((field: string) => {
    setTouchedFields(prev => new Set(prev).add(field));
  }, []);

  const isFieldValid = useCallback((field: string) => {
    return !errors[field] && touchedFields.has(field);
  }, [errors, touchedFields]);

  return {
    errors,
    validateField,
    validateForm,
    markFieldTouched,
    isFieldValid,
    hasErrors: Object.keys(errors).length > 0,
  };
};
```

## Testing Hooks

### Hook Testing Pattern
```tsx
// useWallet.test.ts
import { renderHook, act } from '@testing-library/react';
import { useWallet } from './useWallet';

// Mock HiveKeychain
const mockKeychain = {
  requestHandshake: jest.fn(),
  requestBroadcast: jest.fn(),
};

(global as any).window = {
  hive_keychain: mockKeychain,
};

describe('useWallet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('detects HiveKeychain installation', () => {
    const { result } = renderHook(() => useWallet());
    expect(result.current.keychainInstalled).toBe(true);
  });

  it('connects wallet successfully', async () => {
    const mockResponse = { success: true, data: { username: 'testuser' } };
    mockKeychain.requestHandshake.mockImplementation(cb => cb(mockResponse));

    const { result } = renderHook(() => useWallet());

    await act(async () => {
      await result.current.connect();
    });

    expect(result.current.isConnected).toBe(true);
    expect(result.current.user?.name).toBe('testuser');
  });

  it('handles connection errors', async () => {
    const mockResponse = { success: false, message: 'User rejected' };
    mockKeychain.requestHandshake.mockImplementation(cb => cb(mockResponse));

    const { result } = renderHook(() => useWallet());

    await act(async () => {
      await result.current.connect();
    });

    expect(result.current.isConnected).toBe(false);
    expect(result.current.error).toBe('User rejected');
  });
});
```

## Performance Best Practices

### Memoization Guidelines
- Use `useMemo()` for expensive calculations
- Use `useCallback()` for functions passed as props
- Implement proper dependency arrays
- Avoid creating new objects/arrays in render

### Query Optimization
- Set appropriate `staleTime` and `cacheTime`
- Implement proper retry strategies
- Use `enabled` flag to prevent unnecessary requests
- Implement proper loading states

### Memory Management
- Clean up subscriptions and timers in `useEffect`
- Avoid memory leaks in async operations
- Implement proper error boundaries
- Monitor and optimize bundle size

## Future Enhancements

Planned improvements:
- WebSocket integration for real-time data
- Service Worker integration for offline support
- Enhanced error recovery mechanisms
- Performance monitoring and analytics
- Advanced caching strategies
- Hook composition utilities