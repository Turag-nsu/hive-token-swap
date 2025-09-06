import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EditProfileModal } from './EditProfileModal';
import { UserProfile } from '@/types/social';
import '@testing-library/jest-dom';

// Mock the useTheme hook
jest.mock('@/providers/ThemeProvider', () => ({
  useTheme: () => ({
    computedTheme: 'light'
  })
}));

// Mock the useWalletOperations hook
jest.mock('@/hooks/useWalletOperations', () => ({
  useWalletOperations: () => ({
    broadcast: jest.fn()
  })
}));

// Mock the hiveSocialAPI
jest.mock('@/lib/api/hive-social', () => ({
  hiveSocialAPI: {
    updateProfileMetadata: jest.fn()
  }
}));

describe('EditProfileModal', () => {
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

  const mockOnOpenChange = jest.fn();
  const mockOnUpdateProfile = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(
      <EditProfileModal
        profile={mockProfile}
        open={true}
        onOpenChange={mockOnOpenChange}
        onUpdateProfile={mockOnUpdateProfile}
      />
    );

    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Display Name')).toHaveValue('Test User');
    expect(screen.getByLabelText('About')).toHaveValue('This is a test user');
    expect(screen.getByLabelText('Website')).toHaveValue('https://testuser.com');
    expect(screen.getByLabelText('Location')).toHaveValue('Test City');
    expect(screen.getByLabelText('Profile Image URL')).toHaveValue('https://testuser.com/profile.jpg');
    expect(screen.getByLabelText('Cover Image URL')).toHaveValue('https://testuser.com/cover.jpg');
  });

  it('does not render when closed', () => {
    render(
      <EditProfileModal
        profile={mockProfile}
        open={false}
        onOpenChange={mockOnOpenChange}
        onUpdateProfile={mockOnUpdateProfile}
      />
    );

    expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument();
  });

  it('calls onOpenChange with false when close button is clicked', () => {
    render(
      <EditProfileModal
        profile={mockProfile}
        open={true}
        onOpenChange={mockOnOpenChange}
        onUpdateProfile={mockOnUpdateProfile}
      />
    );

    const closeButton = screen.getByText('✕');
    fireEvent.click(closeButton);

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it('calls onOpenChange with false when Cancel button is clicked', () => {
    render(
      <EditProfileModal
        profile={mockProfile}
        open={true}
        onOpenChange={mockOnOpenChange}
        onUpdateProfile={mockOnUpdateProfile}
      />
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it('updates form fields when user types', () => {
    render(
      <EditProfileModal
        profile={mockProfile}
        open={true}
        onOpenChange={mockOnOpenChange}
        onUpdateProfile={mockOnUpdateProfile}
      />
    );

    const displayNameInput = screen.getByLabelText('Display Name');
    fireEvent.change(displayNameInput, { target: { value: 'New Name' } });
    expect(displayNameInput).toHaveValue('New Name');

    const aboutInput = screen.getByLabelText('About');
    fireEvent.change(aboutInput, { target: { value: 'New about text' } });
    expect(aboutInput).toHaveValue('New about text');
  });

  it('calls onUpdateProfile when form is submitted successfully', async () => {
    const mockUpdateProfileMetadata = require('@/lib/api/hive-social').hiveSocialAPI.updateProfileMetadata;
    mockUpdateProfileMetadata.mockResolvedValue(true);

    render(
      <EditProfileModal
        profile={mockProfile}
        open={true}
        onOpenChange={mockOnOpenChange}
        onUpdateProfile={mockOnUpdateProfile}
      />
    );

    const submitButton = screen.getByText('Save Changes');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnUpdateProfile).toHaveBeenCalled();
      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it('shows error message when profile update fails', async () => {
    const mockUpdateProfileMetadata = require('@/lib/api/hive-social').hiveSocialAPI.updateProfileMetadata;
    mockUpdateProfileMetadata.mockRejectedValue(new Error('Update failed'));

    render(
      <EditProfileModal
        profile={mockProfile}
        open={true}
        onOpenChange={mockOnOpenChange}
        onUpdateProfile={mockOnUpdateProfile}
      />
    );

    const submitButton = screen.getByText('Save Changes');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Update failed')).toBeInTheDocument();
    });
  });
});