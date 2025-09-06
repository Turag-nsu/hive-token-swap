// src/hooks/useUserPosts.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { hiveSocialAPI } from '@/lib/api/hive-social';
import { SocialFeedItem } from '@/types/social';
import { QUERY_KEYS } from '@/lib/query-utils';

interface UseUserPostsParams {
  username: string;
  limit?: number;
}

export const useUserPosts = ({ username, limit = 10 }: UseUserPostsParams) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.USER_POSTS, username],
    queryFn: async ({ pageParam }) => {
      if (!username) return [];
      
      // For now, we're using getPostsByAuthor which fetches blog posts
      // In the future, we might want to implement pagination properly
      const posts = await hiveSocialAPI.getPostsByAuthor(username, limit);
      return posts;
    },
    getNextPageParam: (lastPage, pages) => {
      // Simple pagination - if we got results, we can try to fetch more
      // This is a basic implementation and might need refinement
      if (lastPage.length > 0) {
        return pages.length * limit;
      }
      return undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!username,
  });
};