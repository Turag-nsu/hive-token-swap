"use client";

import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { UserProfileHeader } from './UserProfileHeader';
import { UserProfileStats } from './UserProfileStats';
import { UserProfileActions } from './UserProfileActions';
import { GiftSendModal } from './GiftSendModal';
import { UserPosts } from './UserPosts';
import { UserFollowersFollowing } from './UserFollowersFollowing';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useUser } from '@/hooks/useUser';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { UserProfile as UserProfileType } from '@/types/social';
import { useTheme } from '@/providers/ThemeProvider';

interface UserProfilePageProps {
  username: string;
}

export function UserProfilePage({ username }: UserProfilePageProps) {
  const { isAuthenticated, username: currentUser, updateProfile } = useUser();
  const { computedTheme } = useTheme();
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfileType | null>(null);

  // Fetch user profile data using the custom hook
  const { 
    data: profile, 
    isLoading, 
    error, 
    refetch,
    isFetching 
  } = useUserProfile(username);

  useEffect(() => {
    if (profile) {
      setSelectedUser(profile);
    }
  }, [profile]);

  const handleSendGift = () => {
    if (!isAuthenticated) {
      alert('Please log in to send gifts');
      return;
    }
    setIsGiftModalOpen(true);
  };

  const handleRefresh = async () => {
    await refetch();
  };

  const handleUpdateProfile = (updatedProfile: UserProfileType) => {
    // Update the profile in both the local state and the user store
    setSelectedUser(updatedProfile);
    updateProfile(updatedProfile);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 glass">
              <div className="flex items-center justify-center h-32">
                <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className={`p-6 glass ${computedTheme === 'dark' ? 'border-border/30' : 'border-border/60'}`}>
              <div className="text-center text-destructive">
                <p>Error loading profile: {error.message || 'Unknown error'}</p>
                <Button 
                  onClick={handleRefresh} 
                  className="mt-4 futuristic-button"
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className={`p-6 glass ${computedTheme === 'dark' ? 'border-border/30' : 'border-border/60'}`}>
              <div className="text-center">
                <p>User @{username} not found</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <UserProfileHeader 
            profile={profile} 
            isOwnProfile={currentUser === username}
            onRefresh={handleRefresh}
            isRefreshing={isFetching}
            onUpdateProfile={handleUpdateProfile}
          />
          
          {/* Profile Stats */}
          <UserProfileStats profile={profile} />
          
          {/* Profile Actions */}
          <UserProfileActions 
            onSendGift={handleSendGift}
            isOwnProfile={currentUser === username}
          />
          
          {/* User Posts */}
          <UserPosts username={username} />
          
          {/* Followers/Following */}
          <UserFollowersFollowing username={username} />
          
          {/* Gift Send Modal */}
          {selectedUser && (
            <GiftSendModal
              open={isGiftModalOpen}
              onOpenChange={setIsGiftModalOpen}
              recipient={selectedUser}
            />
          )}
        </div>
      </div>
    </div>
  );
}