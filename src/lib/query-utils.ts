import { QueryClient } from '@tanstack/react-query';

// Query key prefixes for easy group invalidation
export const QUERY_KEYS = {
  SOCIAL_FEED: 'social-feed',
  POST_DETAIL: 'post-detail',
  USER_PROFILE: 'user-profile',
  COMMENTS: 'comments',
  VOTES: 'votes',
} as const;

/**
 * Utility functions for query invalidation
 */
export class QueryInvalidator {
  private queryClient: QueryClient;

  constructor(queryClient: QueryClient) {
    this.queryClient = queryClient;
  }

  /**
   * Invalidate all social feed related queries
   */
  invalidateSocialFeed() {
    this.queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.SOCIAL_FEED],
    });
  }

  /**
   * Invalidate a specific post and its related data
   */
  invalidatePost(author: string, permlink: string) {
    // Invalidate the specific post detail
    this.queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.POST_DETAIL, author, permlink],
    });

    // Invalidate any comment lists for this post
    this.queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.COMMENTS, author, permlink],
    });
  }

  /**
   * Invalidate all posts by a specific author
   */
  invalidateAuthorPosts(author: string) {
    this.queryClient.invalidateQueries({
      predicate: (query) => {
        // Invalidate any query that includes this author in its key
        return query.queryKey.some(key => key === author);
      },
    });
  }

  /**
   * Invalidate user profile related data
   */
  invalidateUserProfile(username: string) {
    this.queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.USER_PROFILE, username],
    });
  }

  /**
   * Invalidate all voting related data
   */
  invalidateVotes() {
    this.queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.VOTES],
    });
  }

  /**
   * Invalidate all comment related data
   */
  invalidateAllComments() {
    this.queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.COMMENTS],
    });
  }

  /**
   * Invalidate all data related to a specific post
   * This ensures consistency across all components showing this post
   */
  invalidatePostCompletely(author: string, permlink: string) {
    // Invalidate the post detail
    this.invalidatePost(author, permlink);
    
    // Invalidate social feeds (since they might show this post)
    this.invalidateSocialFeed();
    
    // Invalidate user profile (since voting power might have changed)
    if (typeof window !== 'undefined' && (window as any).hiveUser?.username) {
      this.invalidateUserProfile((window as any).hiveUser?.username);
    }
  }

  /**
   * Invalidate all data in the application
   * Use sparingly as this can cause a full refetch
   */
  invalidateAll() {
    this.queryClient.invalidateQueries();
  }
}

/**
 * Hook to access query invalidation utilities
 */
export const useQueryInvalidator = () => {
  // This would typically be implemented in a hook that has access to the query client
  // For now, we'll export the class for direct use
  return QueryInvalidator;
};