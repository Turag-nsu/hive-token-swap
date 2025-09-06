// src/hooks/useFollowing.ts
import { useQuery } from '@tanstack/react-query';
import { hiveSocialAPI } from '@/lib/api/hive-social';
import { QUERY_KEYS } from '@/lib/query-utils';

interface Following {
  follower: string;
  following: string;
  what: string[];
}

export const useFollowing = (username: string, limit: number = 100) => {
  return useQuery<Following[]>({
    queryKey: [QUERY_KEYS.USER_FOLLOWING, username],
    queryFn: async () => {
      if (!username) return [];
      return await hiveSocialAPI.getFollowing(username, '', 'blog', limit);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!username,
  });
};