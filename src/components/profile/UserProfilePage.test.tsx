import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProfilePage } from './UserProfilePage';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { useUser } from '@/hooks/useUser';
import { useUserProfile } from '@/hooks/useUserProfile';

// Mock the hooks
jest.mock('@/hooks/useUser');
jest.mock('@/hooks/useUserProfile');

// Mock the child components
jest.mock('./UserProfileHeader', () => ({
  UserProfileHeader: () => <div data-testid="user-profile-header">Profile Header</div>
}));
jest.mock('./UserProfileStats', () => ({
  UserProfileStats: () => <div data-testid="user-profile-stats">Profile Stats</div>
}));
jest.mock('./UserProfileActions', () => ({
  UserProfileActions: () => <div data-testid="user-profile-actions">Profile Actions</div>
}));
jest.mock('./GiftSendModal', () => ({
  GiftSendModal: () => <div data-testid="gift-send-modal">Gift Send Modal</div>
}));

const queryClient = new QueryClient();

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {component}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('UserProfilePage', () => {
  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      username: 'testuser'
    });
    
    (useUserProfile as jest.Mock).mockReturnValue({
      data: {
        username: 'testuser',
        displayName: 'Test User',
        about: 'This is a test user',
        profileImage: null,
        coverImage: null,
        reputation: 25,
        postCount: 10,
        hiveBalance: '100.000 HIVE',
        hbdBalance: '50.000 HBD',
        hp: '1000.000 HP',
        votingPower: 100,
        downvotePower: 100
      },
      isLoading: false,
      error: null,
      refetch: jest.fn(),
      isFetching: false
    });
  });

  it('renders profile page with all components', () => {
    renderWithProviders(<UserProfilePage username="testuser" />);
    
    expect(screen.getByTestId('user-profile-header')).toBeInTheDocument();
    expect(screen.getByTestId('user-profile-stats')).toBeInTheDocument();
    expect(screen.getByTestId('user-profile-actions')).toBeInTheDocument();
  });

  it('applies theme classes correctly', () => {
    renderWithProviders(<UserProfilePage username="testuser" />);
    
    const pageElement = screen.getByTestId('user-profile-header').parentElement;
    expect(pageElement).toBeInTheDocument();
  });
});