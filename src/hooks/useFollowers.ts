// src/hooks/useFollowers.ts
import { useQuery } from '@tanstack/react-query';
import { hiveSocialAPI } from '@/lib/api/hive-social';
import { QUERY_KEYS } from '@/lib/query-utils';

interface Follower {
  follower: string;
  following: string;
  what: string[];
}

export const useFollowers = (username: string, limit: number = 100) => {
  return useQuery<Follower[]>({
    queryKey: [QUERY_KEYS.USER_FOLLOWERS, username],
    queryFn: async () => {
      if (!username) return [];
      return await hiveSocialAPI.getFollowers(username, '', 'blog', limit);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!username,
  });
};