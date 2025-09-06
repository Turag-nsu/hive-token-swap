// src/hooks/useUserProfile.ts
import { useQuery } from '@tanstack/react-query';
import { hiveSocialAPI } from '@/lib/api/hive-social';
import { UserProfile } from '@/types/social';

export const useUserProfile = (username: string) => {
  return useQuery<UserProfile | null>({
    queryKey: ['user-profile', username],
    queryFn: async () => {
      if (!username) return null;
      console.log('Fetching user profile for:', username);
      return await hiveSocialAPI.getUserProfile(username);
    },
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 1, // Retry once on failure
  });
};