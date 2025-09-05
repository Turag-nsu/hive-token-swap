import { create } from 'zustand';
import { SocialFeedItem, FeedFilters } from '@/types/social';

interface SocialState {
  feed: SocialFeedItem[];
  isLoading: boolean;
  hasMore: boolean;
  filters: FeedFilters;
  selectedPost: SocialFeedItem | null;
  
  // Actions
  setFeed: (feed: SocialFeedItem[]) => void;
  addToFeed: (posts: SocialFeedItem[]) => void;
  setLoading: (loading: boolean) => void;
  setHasMore: (hasMore: boolean) => void;
  setFilters: (filters: Partial<FeedFilters>) => void;
  setSelectedPost: (post: SocialFeedItem | null) => void;
  updatePost: (postId: string, updates: Partial<SocialFeedItem>) => void;
  clearFeed: () => void;
}

export const useSocialStore = create<SocialState>((set, get) => ({
  feed: [],
  isLoading: false,
  hasMore: true,
  filters: {
    sortBy: 'created',
    limit: 20
  },
  selectedPost: null,

  setFeed: (feed: SocialFeedItem[]) => {
    set({ feed });
  },

  addToFeed: (posts: SocialFeedItem[]) => {
    const currentFeed = get().feed;
    const existingIds = new Set(currentFeed.map(post => post.id));
    const newPosts = posts.filter(post => !existingIds.has(post.id));
    set({ feed: [...currentFeed, ...newPosts] });
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setHasMore: (hasMore: boolean) => {
    set({ hasMore });
  },

  setFilters: (newFilters: Partial<FeedFilters>) => {
    const currentFilters = get().filters;
    set({ 
      filters: { ...currentFilters, ...newFilters },
      feed: [], // Clear feed when filters change
      hasMore: true
    });
  },

  setSelectedPost: (selectedPost: SocialFeedItem | null) => {
    set({ selectedPost });
  },

  updatePost: (postId: string, updates: Partial<SocialFeedItem>) => {
    const feed = get().feed;
    const updatedFeed = feed.map(post => 
      post.id === postId ? { ...post, ...updates } : post
    );
    set({ feed: updatedFeed });

    // Also update selected post if it matches
    const selectedPost = get().selectedPost;
    if (selectedPost && selectedPost.id === postId) {
      set({ selectedPost: { ...selectedPost, ...updates } });
    }
  },

  clearFeed: () => {
    set({ feed: [], hasMore: true });
  }
}));
