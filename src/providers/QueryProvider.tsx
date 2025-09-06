'use client';

import React, { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  MutationCache,
  QueryCache,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NETWORK_CONFIG } from '@/constants';
import { toast } from 'sonner';

// Global error handler
const handleError = (error: unknown, context?: string) => {
  const message = error instanceof Error ? error.message : 'An unexpected error occurred';
  
  // Don't show notifications for certain errors
  const suppressedErrors = [
    'User rejected',
    'User canceled',
    'User cancelled',
    'Network request failed',
    'Failed to fetch',
    'Load failed',
  ];
  
  const shouldSuppress = suppressedErrors.some(suppressedError =>
    message.toLowerCase().includes(suppressedError.toLowerCase())
  );
  
  if (!shouldSuppress && typeof window !== 'undefined') {
    // Show user-friendly toast notifications
    toast.error(`Error: ${message}`, {
      duration: 5000,
      position: 'bottom-right',
    });
    
    console.error('Query/Mutation error:', message, context);
  }
  
  // Log all errors for debugging
  console.error('Query/Mutation error:', {
    error,
    context,
    message,
    timestamp: new Date().toISOString(),
  });
};

// Performance monitoring
const logQueryPerformance = (queryKey: string[], duration: number) => {
  console.debug(`Query performance: ${queryKey.join(' > ')} took ${duration}ms`);
  
  // In production, you might want to send this to an analytics service
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    // Example: send to analytics service
    // analytics.track('query_performance', { queryKey, duration });
  }
};

// Cache hit/miss tracking
const logCacheEvent = (queryKey: string[], eventType: 'hit' | 'miss') => {
  console.debug(`Cache ${eventType}: ${queryKey.join(' > ')}`);
  
  // In production, you might want to send this to an analytics service
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    // Example: send to analytics service
    // analytics.track(`cache_${eventType}`, { queryKey });
  }
};

// Create query client factory with enhanced error handling
const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: NETWORK_CONFIG.STALE_TIME,
        gcTime: NETWORK_CONFIG.CACHE_TIME, // Updated from cacheTime
        retry: (failureCount, error) => {
          // Don't retry on 4xx errors (client errors)
          if (error instanceof Error) {
            const message = error.message.toLowerCase();
            if (
              message.includes('400') ||
              message.includes('401') ||
              message.includes('403') ||
              message.includes('404') ||
              message.includes('user rejected') ||
              message.includes('user canceled')
            ) {
              return false;
            }
          }
          
          // Exponential backoff retry strategy
          if (failureCount < NETWORK_CONFIG.MAX_RETRIES) {
            // Show retry toast for user feedback
            if (typeof window !== 'undefined') {
              toast.info(`Retrying... (${failureCount + 1}/${NETWORK_CONFIG.MAX_RETRIES})`, {
                duration: 2000,
                position: 'bottom-right',
              });
            }
          }
          
          return failureCount < NETWORK_CONFIG.MAX_RETRIES;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: true,
        // Add network mode for better offline handling
        networkMode: 'online',
        // Add performance tracking
        meta: {
          timing: true,
        },
      },
      mutations: {
        retry: 1,
        retryDelay: NETWORK_CONFIG.RETRY_DELAY,
        // Add network mode for better offline handling
        networkMode: 'online',
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        handleError(error, `Query: ${query.queryKey.join(' > ')}`);
      },
      onSuccess: (data, query) => {
        // Log successful queries for debugging
        console.debug('Query success:', {
          queryKey: query.queryKey.join(' > '),
          data,
          timestamp: new Date().toISOString(),
        });
      },
      onSettled: (data, error, query) => {
        // Log query performance
        if (query.meta?.timing) {
          const duration = Date.now() - query.state.dataUpdatedAt;
          logQueryPerformance(query.queryKey, duration);
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, variables, context, mutation) => {
        handleError(error, `Mutation: ${mutation.options.mutationKey?.join(' > ') || 'unknown'}`);
      },
      onSuccess: (data, variables, context, mutation) => {
        // Log successful mutations for debugging
        console.debug('Mutation success:', {
          mutationKey: mutation.options.mutationKey?.join(' > ') || 'unknown',
          data,
          variables,
          timestamp: new Date().toISOString(),
        });
      },
    }),
  });
};

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  // Create a stable query client instance
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools 
          initialIsOpen={false} 
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
};

// Hook to access the query client
export const useQueryClient = () => {
  const context: any = React.useContext(QueryClientProvider as any);
  return context?.client;
};

// Utility hooks for common query patterns
export const useInvalidateQueries = () => {
  const queryClient = useQueryClient();
  
  return {
    invalidateAll: () => queryClient && (queryClient as any)?.invalidateQueries(),
    invalidateByKey: (queryKey: string[]) => queryClient && (queryClient as any)?.invalidateQueries({ queryKey }),
    invalidateByPrefix: (prefix: string) => {
      queryClient && (queryClient as any)?.invalidateQueries({
        predicate: (query: any) => {
          const key = query.queryKey[0];
          return typeof key === 'string' && key.startsWith(prefix);
        },
      });
    },
  };
};

export const useClearCache = () => {
  const queryClient = useQueryClient();
  
  return {
    clearAll: () => queryClient && (queryClient as any).clear(),
    removeQueries: (queryKey: string[]) => queryClient && (queryClient as any).removeQueries({ queryKey }),
    resetQueries: (queryKey: string[]) => queryClient && (queryClient as any).resetQueries({ queryKey }),
  };
};

// Prefetch utilities
export const usePrefetch = () => {
  const queryClient = useQueryClient();
  
  return {
    prefetchQuery: (queryKey: string[], queryFn: () => Promise<any>) => {
      return queryClient && (queryClient as any).prefetchQuery({
        queryKey,
        queryFn,
        staleTime: NETWORK_CONFIG.STALE_TIME,
      });
    },
    ensureQueryData: (queryKey: string[], queryFn: () => Promise<any>) => {
      return queryClient && (queryClient as any).ensureQueryData({
        queryKey,
        queryFn,
        staleTime: NETWORK_CONFIG.STALE_TIME,
      });
    },
  };
};

// Export the query client for external use
export { createQueryClient };