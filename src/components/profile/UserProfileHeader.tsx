"use client";

import { useState } from 'react';
import { User, MapPin, Link, Calendar, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { UserProfile } from '@/types/social';
import { useTheme } from '@/providers/ThemeProvider';
import { EditProfileModal } from './EditProfileModal';

interface UserProfileHeaderProps {
  profile: UserProfile;
  isOwnProfile: boolean;
  onRefresh: () => void;
  isRefreshing: boolean;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
}

export function UserProfileHeader({ 
  profile, 
  isOwnProfile, 
  onRefresh, 
  isRefreshing,
  onUpdateProfile
}: UserProfileHeaderProps) {
  const { computedTheme } = useTheme();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  return (
    <>
      <Card className={`mb-6 overflow-hidden glass ${computedTheme === 'dark' ? 'border-border/30' : 'border-border/60'}`}>
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
          {profile.coverImage ? (
            <img 
              src={profile.coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full mesh-gradient"></div>
          )}
          
          {/* Refresh Button */}
          <div className="absolute top-4 right-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="bg-background/80 backdrop-blur-sm futuristic-button hover:scale-105 transition-transform"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
        
        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16">
            {/* Profile Image */}
            <div className="relative">
              <div className="bg-background rounded-full p-1 inline-block">
                {profile.profileImage ? (
                  <img 
                    src={profile.profileImage} 
                    alt={profile.username} 
                    className="w-32 h-32 rounded-full object-cover border-4 border-background"
                  />
                ) : (
                  <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 border-background ${
                    computedTheme === 'dark' ? 'bg-primary/10' : 'bg-primary/5'
                  }`}>
                    <User className="w-16 h-16 text-primary" />
                  </div>
                )}
              </div>
            </div>
            
            {/* User Info */}
            <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold font-futuristic">
                    {profile.displayName || profile.username}
                  </h1>
                  <p className={`text-muted-foreground ${computedTheme === 'dark' ? 'text-muted-foreground/80' : 'text-muted-foreground/60'}`}>
                    @{profile.username}
                  </p>
                </div>
                
                {isOwnProfile && (
                  <Button 
                    variant="outline" 
                    className="mt-4 sm:mt-0 futuristic-button hover:scale-105 transition-transform"
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
              
              {/* User Details */}
              <div className="mt-4 space-y-2">
                {profile.about && (
                  <p className="text-foreground">{profile.about}</p>
                )}
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {profile.location && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {profile.location}
                    </div>
                  )}
                  
                  {profile.website && (
                    <div className="flex items-center">
                      <Link className="w-4 h-4 mr-1" />
                      <a 
                        href={profile.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors futuristic-button"
                      >
                        {profile.website.replace('https://', '').replace('http://', '')}
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Joined Hive
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {isOwnProfile && (
        <EditProfileModal
          profile={profile}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onUpdateProfile={onUpdateProfile}
        />
      )}
    </>
  );
}