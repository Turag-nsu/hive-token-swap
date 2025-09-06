import { render, screen, fireEvent } from '@testing-library/react';
import { UserProfileHeader } from './UserProfileHeader';
import { UserProfile } from '@/types/social';
import '@testing-library/jest-dom';

// Mock the useTheme hook
jest.mock('@/providers/ThemeProvider', () => ({
  useTheme: () => ({
    computedTheme: 'light'
  })
}));

describe('UserProfileHeader', () => {
  const mockProfile: UserProfile = {
    username: 'testuser',
    displayName: 'Test User',
    about: 'This is a test user',
    website: 'https://testuser.com',
    location: 'Test City',
    coverImage: 'https://testuser.com/cover.jpg',
    profileImage: 'https://testuser.com/profile.jpg',
    reputation: 25,
    hiveBalance: '10.000 HIVE',
    hbdBalance: '5.000 HBD',
    hp: '100.000 HP',
    votingPower: 100,
    downvotePower: 100,
    postCount: 10
  };

  const mockOnRefresh = jest.fn();
  const mockOnUpdateProfile = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user profile information correctly', () => {
    render(
      <UserProfileHeader
        profile={mockProfile}
        isOwnProfile={false}
        onRefresh={mockOnRefresh}
        isRefreshing={false}
        onUpdateProfile={mockOnUpdateProfile}
      />
    );

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('@testuser')).toBeInTheDocument();
    expect(screen.getByText('This is a test user')).toBeInTheDocument();
    expect(screen.getByText('Test City')).toBeInTheDocument();
    expect(screen.getByText('testuser.com')).toBeInTheDocument();
  });

  it('does not show Edit Profile button for other users', () => {
    render(
      <UserProfileHeader
        profile={mockProfile}
        isOwnProfile={false}
        onRefresh={mockOnRefresh}
        isRefreshing={false}
        onUpdateProfile={mockOnUpdateProfile}
      />
    );

    expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument();
  });

  it('shows Edit Profile button for own profile', () => {
    render(
      <UserProfileHeader
        profile={mockProfile}
        isOwnProfile={true}
        onRefresh={mockOnRefresh}
        isRefreshing={false}
        onUpdateProfile={mockOnUpdateProfile}
      />
    );

    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
  });

  it('calls onRefresh when refresh button is clicked', () => {
    render(
      <UserProfileHeader
        profile={mockProfile}
        isOwnProfile={false}
        onRefresh={mockOnRefresh}
        isRefreshing={false}
        onUpdateProfile={mockOnUpdateProfile}
      />
    );

    const refreshButton = screen.getByRole('button');
    fireEvent.click(refreshButton);

    expect(mockOnRefresh).toHaveBeenCalled();
  });

  it('shows loading spinner when refreshing', () => {
    render(
      <UserProfileHeader
        profile={mockProfile}
        isOwnProfile={false}
        onRefresh={mockOnRefresh}
        isRefreshing={true}
        onUpdateProfile={mockOnUpdateProfile}
      />
    );

    const refreshButton = screen.getByRole('button');
    expect(refreshButton).toHaveClass('animate-spin');
  });
});