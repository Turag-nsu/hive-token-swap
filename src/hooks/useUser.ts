// src/hooks/useUser.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { useAuthStore } from '@/stores/auth';
import { hiveSocialAPI } from '@/lib/api/hive-social';
import { QUERY_KEYS } from '@/constants';
import { UserProfile } from '@/types/social';

/**
 * Custom hook that integrates Zustand auth state with React Query for user data
 * Provides reactive user data that can be used throughout the application
 */
export const useUser = () => {
  const { isAuthenticated, username, userProfile, login, logout, updateProfile } = useAuthStore();
  const queryClient = useQueryClient();

  // Fetch user profile with React Query
  const { 
    data: profile, 
    isLoading, 
    error, 
    refetch,
    isFetching
  } = useQuery<UserProfile | null>({
    queryKey: [...QUERY_KEYS.USER_PROFILE, username],
    queryFn: async () => {
      if (!username) return null;
      console.log('Fetching user profile for:', username);
      return await hiveSocialAPI.getUserProfile(username);
    },
    enabled: isAuthenticated && !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 1, // Retry once on failure
  });

  // Sync profile data to auth store when it changes
  useEffect(() => {
    if (profile && profile.username === username) {
      updateProfile(profile);
    }
  }, [profile, username, updateProfile]);

  // Auto-fetch user profile on mount if user is authenticated but profile is missing
  useEffect(() => {
    if (isAuthenticated && username && !userProfile) {
      refetch();
    }
  }, [isAuthenticated, username, userProfile, refetch]);

  // Update profile in both Zustand and React Query
  const updateProfileData = useCallback(async (newProfile: UserProfile) => {
    // Update Zustand store
    updateProfile(newProfile);
    
    // Update React Query cache
    queryClient.setQueryData([...QUERY_KEYS.USER_PROFILE, username], newProfile);
  }, [updateProfile, queryClient, username]);

  // Login function that updates both stores
  const loginUser = useCallback(async (username: string, method: 'keychain' | 'hivesigner', profile?: UserProfile) => {
    // Login in Zustand store
    login(username, method, profile);
    
    // Invalidate and refetch user profile
    if (username) {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_PROFILE });
    }
  }, [login, queryClient]);

  // Logout function that clears both stores
  const logoutUser = useCallback(() => {
    // Logout in Zustand store
    logout();
    
    // Clear React Query cache for user data
    queryClient.removeQueries({ queryKey: QUERY_KEYS.USER_PROFILE });
  }, [logout, queryClient]);

  // Refresh user data
  const refreshUser = useCallback(async () => {
    if (!username) return null;
    
    try {
      await refetch();
      return profile;
    } catch (err) {
      console.error('Error refreshing user data:', err);
      throw err;
    }
  }, [username, refetch, profile]);

  return {
    // Auth state from Zustand
    isAuthenticated,
    username,
    userProfile: profile || userProfile, // Prefer React Query data if available
    
    // Loading and error states from React Query
    isLoading: isLoading || isFetching,
    isFetching,
    error,
    
    // Actions
    login: loginUser,
    logout: logoutUser,
    updateProfile: updateProfileData,
    refreshUser,
    refetch,
  };
};