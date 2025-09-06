# Authentication Architecture

This document explains how authentication state is managed in the Hive Token Swap application using Zustand for local state and React Query for data fetching and caching.

## Overview

The authentication system combines:
- **Zustand** for managing local authentication state (isAuthenticated, username, etc.)
- **React Query** for fetching and caching user profile data
- **Custom `useUser` hook** that integrates both systems seamlessly

## Key Components

### 1. Zustand Auth Store (`src/stores/auth.ts`)

Manages the core authentication state:

```typescript
interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  userProfile: UserProfile | null;
  authMethod: 'keychain' | 'hivesigner' | null;
  login: (username: string, method: 'keychain' | 'hivesigner', profile?: UserProfile) => void;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
  setAuthMethod: (method: 'keychain' | 'hivesigner') => void;
}
```

### 2. React Query Integration (`src/hooks/useUser.ts`)

The `useUser` hook provides a unified interface that combines Zustand state with React Query data fetching:

```typescript
export const useUser = () => {
  const { isAuthenticated, username, userProfile, login, logout, updateProfile } = useAuthStore();
  const queryClient = useQueryClient();

  // Fetch user profile with React Query
  const { data: profile, isLoading, error, refetch } = useQuery({
    queryKey: [...QUERY_KEYS.USER_PROFILE, username],
    queryFn: async () => {
      if (!username) return null;
      return await hiveSocialAPI.getUserProfile(username);
    },
    enabled: isAuthenticated && !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  // ... rest of the hook
}
```

### 3. Usage in Components

Components can use the `useUser` hook to access both authentication state and user profile data:

```typescript
import { useUser } from '@/hooks/useUser';

export function MyComponent() {
  const { 
    isAuthenticated, 
    username, 
    userProfile, 
    login, 
    logout, 
    isLoading, 
    error 
  } = useUser();

  // ... component logic
}
```

## Benefits of This Approach

1. **Separation of Concerns**: Authentication state (login/logout) is managed by Zustand, while user data fetching is handled by React Query
2. **Automatic Caching**: React Query provides automatic caching and background updates
3. **Consistent State**: The `useUser` hook ensures both stores are kept in sync
4. **Easy to Use**: Components only need to import one hook to access all auth-related data
5. **Performance**: Caching reduces unnecessary API calls
6. **Offline Support**: Cached data can be shown when offline

## Data Flow

1. User logs in via `useUser().login()`
2. Zustand store is updated with authentication state
3. React Query automatically fetches user profile data
4. Profile data is cached and made available through the hook
5. When user data changes, components automatically re-render with updated data
6. On logout, both stores are cleared

## Error Handling

The system handles errors gracefully:
- Network errors are caught and displayed to the user
- Failed profile fetches don't break the authentication state
- Retry mechanisms are built into React Query
- Error states are exposed through the hook for UI handling

## Best Practices

1. **Always use the `useUser` hook** instead of accessing the auth store directly
2. **Handle loading states** in UI components
3. **Check authentication state** before performing user-specific actions
4. **Use React Query's caching** to minimize API calls
5. **Keep both stores in sync** through the provided actions