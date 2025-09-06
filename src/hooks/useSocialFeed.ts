import { useInfiniteQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hiveSocialAPI } from '@/lib/api/hive-social';
import { SocialFeedItem } from '@/types/social';
import { QUERY_KEYS } from '@/lib/query-utils';

// Define the type for page parameters
interface PageParam {
  startAuthor?: string;
  startPermlink?: string;
}

// Hook for infinite scrolling social feed
export const useSocialFeed = (filters: { sortBy?: string; tag?: string; limit?: number }) => {
  return useInfiniteQuery<SocialFeedItem[], Error, SocialFeedItem[], [string, string, { sortBy?: string; tag?: string; limit?: number }], PageParam>({
    queryKey: [QUERY_KEYS.SOCIAL_FEED, 'list', filters],
    queryFn: async ({ pageParam }) => {
      const { sortBy, tag, limit } = filters;
      
      if (sortBy === 'trending') {
        return await hiveSocialAPI.getTrendingPosts(
          tag || '',
          limit || 20,
          pageParam?.startAuthor,
          pageParam?.startPermlink
        );
      } else {
        return await hiveSocialAPI.getRecentPosts(
          tag || '',
          limit || 20,
          pageParam?.startAuthor,
          pageParam?.startPermlink
        );
      }
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.length === 0) return undefined;
      
      const lastPost = lastPage[lastPage.length - 1];
      if (!lastPost) return undefined;
      
      return {
        startAuthor: lastPost.author,
        startPermlink: lastPost.permlink,
      };
    },
    initialPageParam: undefined as unknown as PageParam,
    staleTime: 30000, // 30 seconds
  });
};

// Hook for individual post details
export const usePostDetail = (author: string, permlink: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.POST_DETAIL, author, permlink],
    queryFn: () => hiveSocialAPI.getPostWithVotesAndReplies(author, permlink),
    staleTime: 10000, // 10 seconds for time-sensitive data like votes
  });
};

// Hook for prefetching post details
export const usePrefetchPost = () => {
  const queryClient = useQueryClient();
  
  return (author: string, permlink: string) => {
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.POST_DETAIL, author, permlink],
      queryFn: () => hiveSocialAPI.getPostWithVotesAndReplies(author, permlink),
      staleTime: 10000,
    });
  };
};

// Hook for posting comments
export const usePostComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (commentData: {
      parent_author: string;
      parent_permlink: string;
      author: string;
      permlink: string;
      title: string;
      body: string;
      json_metadata: string;
    }) => {
      return await hiveSocialAPI.submitPost(commentData);
    },
    onSuccess: (_data, variables) => {
      // Invalidate and refetch the parent post and its comments
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST_DETAIL, variables.parent_author, variables.parent_permlink]
      });
      
      // Also invalidate the feed to update comment counts
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SOCIAL_FEED]
      });
    },
  });
};

// Hook for voting on posts
export const useVotePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (voteData: {
      voter: string;
      author: string;
      permlink: string;
      weight: number;
    }) => {
      return await hiveSocialAPI.votePost(voteData);
    },
    onMutate: async (voteData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.POST_DETAIL, voteData.author, voteData.permlink]
      });
      
      // Snapshot the previous value
      const previousPost = queryClient.getQueryData(
        [QUERY_KEYS.POST_DETAIL, voteData.author, voteData.permlink]
      );
      
      // Optimistically update to the new value
      queryClient.setQueryData(
        [QUERY_KEYS.POST_DETAIL, voteData.author, voteData.permlink],
        (old: SocialFeedItem | undefined) => {
          if (!old) return old;
          
          const isUpvote = voteData.weight > 0;
          const isDownvote = voteData.weight < 0;
          
          return {
            ...old,
            upvotes: isUpvote ? old.upvotes + 1 : old.upvotes,
            downvotes: isDownvote ? old.downvotes + 1 : old.downvotes,
            isUpvoted: isUpvote,
            isDownvoted: isDownvote,
          };
        }
      );
      
      // Also update in the feed
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.SOCIAL_FEED] },
        (old: any) => {
          if (!old || !old.pages) return old;
          
          return {
            ...old,
            pages: old.pages.map((page: SocialFeedItem[]) => 
              page.map((post: SocialFeedItem) => {
                if (post.author === voteData.author && post.permlink === voteData.permlink) {
                  const isUpvote = voteData.weight > 0;
                  const isDownvote = voteData.weight < 0;
                  
                  return {
                    ...post,
                    upvotes: isUpvote ? post.upvotes + 1 : post.upvotes,
                    downvotes: isDownvote ? post.downvotes + 1 : post.downvotes,
                    isUpvoted: isUpvote,
                    isDownvoted: isDownvote,
                  };
                }
                return post;
              })
            )
          };
        }
      );
      
      return { previousPost };
    },
    onError: (_err, variables, context) => {
      // Rollback to the previous value
      if (context?.previousPost) {
        queryClient.setQueryData(
          [QUERY_KEYS.POST_DETAIL, variables.author, variables.permlink],
          context.previousPost
        );
      }
      
      // Also rollback in the feed
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.SOCIAL_FEED] },
        (old: any) => {
          if (!old || !old.pages) return old;
          
          return {
            ...old,
            pages: old.pages.map((page: SocialFeedItem[]) => 
              page.map((post: SocialFeedItem) => {
                if (post.author === variables.author && post.permlink === variables.permlink) {
                  return context?.previousPost || post;
                }
                return post;
              })
            )
          };
        }
      );
    },
    onSuccess: (_data, variables) => {
      // Refetch the post to get the actual data from the blockchain
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST_DETAIL, variables.author, variables.permlink]
      });
      
      // Also invalidate the feed to ensure consistency
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SOCIAL_FEED]
      });
    },
  });
};