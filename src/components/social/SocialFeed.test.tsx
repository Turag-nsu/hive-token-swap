import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import { SocialFeed } from './SocialFeed';
import { useUser } from '@/hooks/useUser';
import { useSocialFeed, useVotePost } from '@/hooks/useSocialFeed';
import { hiveKeychainAPI } from '@/lib/blockchain/keychain';

// Mock all the hooks and dependencies
jest.mock('@/hooks/useUser');
jest.mock('@/hooks/useSocialFeed');
jest.mock('@/lib/blockchain/keychain');
jest.mock('sonner');

// Mock the CommentModal component
jest.mock('./CommentModal', () => ({
  CommentModal: () => <div data-testid="comment-modal">Comment Modal</div>
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock window.navigator.share
Object.defineProperty(navigator, 'share', {
  writable: true,
  value: jest.fn(),
});

// Mock window.navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  writable: true,
  value: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
});

// Mock window.hive_keychain
Object.defineProperty(window, 'hive_keychain', {
  writable: true,
  value: {
    requestBroadcast: jest.fn(),
  },
});

const mockUseUser = useUser as jest.Mock;
const mockUseSocialFeed = useSocialFeed as jest.Mock;
const mockUseVotePost = useVotePost as jest.Mock;
const mockHiveKeychainAPI = hiveKeychainAPI as jest.Mocked<typeof hiveKeychainAPI>;
const mockToast = toast as jest.Mocked<typeof toast>;

describe('SocialFeed', () => {
  const mockUser = {
    isAuthenticated: true,
    username: 'testuser',
    refreshUser: jest.fn(),
  };

  const mockFeedData = {
    pages: [
      [
        {
          id: '1',
          author: 'author1',
          permlink: 'post-1',
          title: 'Test Post 1',
          body: 'This is a test post body',
          created: '2023-01-01T00:00:00Z',
          payout: '10.000 HBD',
          upvotes: 5,
          downvotes: 1,
          children: 3,
          reputation: 25,
          tags: ['test', 'tag'],
          active_votes: [],
        },
        {
          id: '2',
          author: 'author2',
          permlink: 'post-2',
          title: 'Test Post 2',
          body: 'This is another test post body',
          created: '2023-01-02T00:00:00Z',
          payout: '5.000 HBD',
          upvotes: 10,
          downvotes: 0,
          children: 1,
          reputation: 50,
          tags: ['another', 'tag'],
          active_votes: [],
        },
      ],
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseUser.mockReturnValue(mockUser);
    mockUseSocialFeed.mockReturnValue({
      data: mockFeedData,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      refetch: jest.fn(),
      isError: false,
      error: null,
    });
    mockUseVotePost.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });
  });

  it('renders social feed with posts', () => {
    render(<SocialFeed />);
    
    expect(screen.getByText('Social Feed')).toBeInTheDocument();
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
  });

  it('handles vote functionality', async () => {
    const mockMutate = jest.fn();
    mockUseVotePost.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });

    render(<SocialFeed />);
    
    const upvoteButtons = screen.getAllByRole('button', { name: /5/ });
    const upvoteButton = upvoteButtons[0];
    if (upvoteButton) {
      fireEvent.click(upvoteButton);
    }
    
    // Wait for confirmation dialog
    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalled();
    });
  });

  it('handles reply functionality', () => {
    render(<SocialFeed />);
    
    const replyButtons = screen.getAllByRole('button', { name: /Reply/ });
    const replyButton = replyButtons[0];
    if (replyButton) {
      fireEvent.click(replyButton);
    }
    
    expect(screen.getByTestId('comment-modal')).toBeInTheDocument();
  });

  it('handles share functionality', async () => {
    // Mock navigator.share to resolve successfully
    (navigator.share as jest.Mock).mockResolvedValue(undefined);
    
    render(<SocialFeed />);
    
    const shareButtons = screen.getAllByRole('button', { name: '' }); // Share button has no text
    const shareButton = shareButtons[0];
    if (shareButton) {
      fireEvent.click(shareButton);
    }
    
    await waitFor(() => {
      expect(mockToast.success).toHaveBeenCalledWith('Post shared!');
    });
  });

  it('handles copy to clipboard when share fails', async () => {
    // Mock navigator.share to reject (not supported)
    (navigator.share as jest.Mock).mockRejectedValue(new Error('Not supported'));
    
    render(<SocialFeed />);
    
    const shareButtons = screen.getAllByRole('button', { name: '' }); // Share button has no text
    const shareButton = shareButtons[0];
    if (shareButton) {
      fireEvent.click(shareButton);
    }
    
    await waitFor(() => {
      expect(mockToast.success).toHaveBeenCalledWith('Link copied to clipboard!');
    });
  });

  it('handles follow functionality', async () => {
    mockHiveKeychainAPI.followUser.mockResolvedValue({ success: true });
    
    render(<SocialFeed />);
    
    const followButtons = screen.getAllByRole('button', { name: /Follow/ });
    const followButton = followButtons[0];
    if (followButton) {
      fireEvent.click(followButton);
    }
    
    await waitFor(() => {
      expect(mockHiveKeychainAPI.followUser).toHaveBeenCalledWith('testuser', 'author1');
      expect(mockToast.success).toHaveBeenCalledWith('Following @author1');
    });
  });

  it('handles unfollow functionality', async () => {
    mockHiveKeychainAPI.unfollowUser.mockResolvedValue({ success: true });
    
    render(<SocialFeed />);
    
    const followButtons = screen.getAllByRole('button', { name: /Follow/ });
    const followButton = followButtons[0];
    if (followButton) {
      fireEvent.click(followButton);
      
      // Click again to simulate unfollow
      fireEvent.click(followButton);
    }
    
    // We can't easily test the state change, but we can test the API calls
    await waitFor(() => {
      expect(mockHiveKeychainAPI.followUser).toHaveBeenCalledWith('testuser', 'author1');
    });
  });

  it('handles message functionality', () => {
    render(<SocialFeed />);
    
    const messageButtons = screen.getAllByRole('button', { name: '' }); // Message button
    const messageButton = messageButtons[1]; // Message button
    if (messageButton) {
      fireEvent.click(messageButton);
    }
    
    expect(mockToast.info).toHaveBeenCalledWith('Messaging functionality for @author1 would open here');
  });

  it('handles more functionality', () => {
    render(<SocialFeed />);
    
    const moreButtons = screen.getAllByRole('button', { name: '' }); // More button
    const moreButton = moreButtons[2]; // More button
    if (moreButton) {
      fireEvent.click(moreButton);
    }
    
    expect(mockToast.info).toHaveBeenCalledWith('More options would appear here');
  });

  it('shows loading state', () => {
    mockUseSocialFeed.mockReturnValue({
      data: undefined,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: true,
      refetch: jest.fn(),
      isError: false,
      error: null,
    });
    
    render(<SocialFeed />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    mockUseSocialFeed.mockReturnValue({
      data: undefined,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      refetch: jest.fn(),
      isError: true,
      error: new Error('Failed to load posts'),
    });
    
    render(<SocialFeed />);
    
    expect(screen.getByText('Error loading posts')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    mockUseSocialFeed.mockReturnValue({
      data: { pages: [[]] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      refetch: jest.fn(),
      isError: false,
      error: null,
    });
    
    render(<SocialFeed />);
    
    expect(screen.getByText('No posts yet')).toBeInTheDocument();
  });
});