import { useInfiniteQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { hiveSocialAPI } from '@/lib/api/hive-social';
import { SocialFeedItem } from '@/types/social';
import { QUERY_KEYS } from '@/lib/query-utils';
import { toast } from 'sonner';

// Define the type for page parameters
interface PageParam {
  startAuthor?: string;
  startPermlink?: string;
}

// Enhanced React Query hook for social feed with better caching
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
      } else if (sortBy === 'hot') {
        return await hiveSocialAPI.getHotPosts(
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
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
    retry: 2, // Retry failed requests up to 2 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
};

// Enhanced React Query hook for post details with comments
export const usePostDetail = (author: string, permlink: string) => {
  return useQuery<SocialFeedItem, Error>({
    queryKey: [QUERY_KEYS.POST_DETAIL, author, permlink],
    queryFn: () => hiveSocialAPI.getPostWithVotesAndReplies(author, permlink),
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Enhanced React Query mutation for voting with optimistic updates
export const useVotePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (voteData: { voter: string; author: string; permlink: string; weight: number }) => {
      return await hiveSocialAPI.votePost(voteData);
    },
    onMutate: async (voteData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.SOCIAL_FEED] });
      
      // Snapshot the previous value
      const previousFeed = queryClient.getQueryData([QUERY_KEYS.SOCIAL_FEED]);
      
      // Optimistically update to the new value
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.SOCIAL_FEED] },
        (old: any) => {
          if (!old) return old;
          
          return {
            ...old,
            pages: old.pages.map((page: any) => 
              page.map((post: any) => {
                if (post.author === voteData.author && post.permlink === voteData.permlink) {
                  // Check if user has already voted
                  const existingVoteIndex = post.active_votes.findIndex((vote: any) => vote.voter === voteData.voter);
                  
                  if (existingVoteIndex !== -1) {
                    // Update existing vote
                    const updatedVotes = [...post.active_votes];
                    updatedVotes[existingVoteIndex] = {
                      ...updatedVotes[existingVoteIndex],
                      percent: voteData.weight
                    };
                    
                    // Update vote counts
                    const upvotes = updatedVotes.filter((vote: any) => vote.percent > 0).length;
                    const downvotes = updatedVotes.filter((vote: any) => vote.percent < 0).length;
                    
                    return {
                      ...post,
                      active_votes: updatedVotes,
                      upvotes,
                      downvotes
                    };
                  } else {
                    // Add new vote
                    const newVote = {
                      voter: voteData.voter,
                      percent: voteData.weight
                    };
                    
                    const updatedVotes = [...post.active_votes, newVote];
                    const upvotes = updatedVotes.filter((vote: any) => vote.percent > 0).length;
                    const downvotes = updatedVotes.filter((vote: any) => vote.percent < 0).length;
                    
                    return {
                      ...post,
                      active_votes: updatedVotes,
                      upvotes,
                      downvotes
                    };
                  }
                }
                return post;
              })
            )
          };
        }
      );
      
      return { previousFeed };
    },
    onError: (_err, _variables, context) => {
      // Rollback to the previous value
      if (context?.previousFeed) {
        queryClient.setQueryData([QUERY_KEYS.SOCIAL_FEED], context.previousFeed);
      }
    },
    onSettled: () => {
      // Refetch feed after mutation
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SOCIAL_FEED] });
    },
  });
};

// Enhanced React Query mutation for posting comments
export const usePostComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (commentData: any) => {
      return await hiveSocialAPI.submitPost(commentData);
    },
    onSuccess: (_data, variables) => {
      // Invalidate and refetch post details
      queryClient.invalidateQueries({ 
        queryKey: [QUERY_KEYS.POST_DETAIL, variables.parent_author, variables.parent_permlink] 
      });
      
      // Also invalidate the social feed to show updated comment counts
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SOCIAL_FEED] });
    },
    onError: (error: any) => {
      console.error('Error posting comment:', error);
      toast.error(error.message || 'Failed to post comment');
    },
  });
};

// Enhanced prefetching hooks for better UX
export const usePrefetchPost = () => {
  const queryClient = useQueryClient();
  
  return useCallback((author: string, permlink: string) => {
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.POST_DETAIL, author, permlink],
      queryFn: () => hiveSocialAPI.getPostWithVotesAndReplies(author, permlink),
      staleTime: 3 * 60 * 1000, // 3 minutes
    });
  }, [queryClient]);
};

export const usePrefetchUserProfile = () => {
  const queryClient = useQueryClient();
  
  return useCallback((username: string) => {
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.USER_PROFILE, username],
      queryFn: () => hiveSocialAPI.getUserProfile(username),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  }, [queryClient]);
};