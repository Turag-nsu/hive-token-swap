"use client";

import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/social';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { useWalletOperations } from '@/hooks/useWalletOperations';
import { hiveSocialAPI } from '@/lib/api/hive-social';
import { useTheme } from '@/providers/ThemeProvider';

interface EditProfileModalProps {
  profile: UserProfile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
}

export function EditProfileModal({ 
  profile, 
  open, 
  onOpenChange,
  onUpdateProfile
}: EditProfileModalProps) {
  const { computedTheme } = useTheme();
  const { broadcast } = useWalletOperations();
  const [displayName, setDisplayName] = useState(profile.displayName || profile.username);
  const [about, setAbout] = useState(profile.about || '');
  const [website, setWebsite] = useState(profile.website || '');
  const [location, setLocation] = useState(profile.location || '');
  const [coverImage, setCoverImage] = useState(profile.coverImage || '');
  const [profileImage, setProfileImage] = useState(profile.profileImage || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset form when profile changes
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || profile.username);
      setAbout(profile.about || '');
      setWebsite(profile.website || '');
      setLocation(profile.location || '');
      setCoverImage(profile.coverImage || '');
      setProfileImage(profile.profileImage || '');
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Update profile metadata using HiveSocialAPI
      const success = await hiveSocialAPI.updateProfileMetadata(profile.username, {
        displayName,
        about,
        website,
        location,
        coverImage,
        profileImage
      });

      if (success) {
        // Update the profile in the parent component
        const updatedProfile: UserProfile = {
          ...profile,
          displayName,
          about,
          website,
          location,
          coverImage,
          profileImage
        };
        
        onUpdateProfile(updatedProfile);
        onOpenChange(false);
      }
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className={`w-full max-w-2xl glass ${computedTheme === 'dark' ? 'border-border/30' : 'border-border/60'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold font-futuristic">Edit Profile</h2>
            <button 
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/50 rounded-md text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Display Name</label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your display name"
                className="futuristic-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">About</label>
              <Textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell us about yourself"
                rows={3}
                className="futuristic-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Website</label>
              <Input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://your-website.com"
                className="futuristic-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where are you located?"
                className="futuristic-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Profile Image URL</label>
              <Input
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
                placeholder="https://your-image-url.com/profile.jpg"
                className="futuristic-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cover Image URL</label>
              <Input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://your-image-url.com/cover.jpg"
                className="futuristic-input"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="futuristic-button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="futuristic-button hover:scale-105 transition-transform"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}