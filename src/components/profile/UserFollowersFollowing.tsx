"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useFollowers } from '@/hooks/useFollowers';
import { useFollowing } from '@/hooks/useFollowing';
import { useTheme } from '@/providers/ThemeProvider';
import { User, Users } from 'lucide-react';

interface UserFollowersFollowingProps {
  username: string;
}

export function UserFollowersFollowing({ username }: UserFollowersFollowingProps) {
  const { computedTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>('followers');
  
  const { 
    data: followersData, 
    isLoading: followersLoading, 
    isError: followersError,
    error: followersErrorMsg
  } = useFollowers(username);
  
  const { 
    data: followingData, 
    isLoading: followingLoading, 
    isError: followingError,
    error: followingErrorMsg
  } = useFollowing(username);

  // Ensure we're working with arrays
  const followers = Array.isArray(followersData) ? followersData : [];
  const following = Array.isArray(followingData) ? followingData : [];

  if (followersLoading || followingLoading) {
    return (
      <Card className={`mb-6 glass ${computedTheme === 'dark' ? 'border-border/30' : 'border-border/60'}`}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 font-futuristic">Connections</h2>
          <div className="flex items-center justify-center h-32">
            <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (followersError || followingError) {
    return (
      <Card className={`mb-6 glass ${computedTheme === 'dark' ? 'border-border/30' : 'border-border/60'}`}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 font-futuristic">Connections</h2>
          <div className="text-center text-destructive">
            <p>Error loading connections: {followersErrorMsg?.message || followingErrorMsg?.message || 'Unknown error'}</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`mb-6 glass ${computedTheme === 'dark' ? 'border-border/30' : 'border-border/60'}`}>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 font-futuristic">Connections</h2>
        
        {/* Tabs */}
        <div className="flex border-b mb-4">
          <Button
            variant={activeTab === 'followers' ? 'default' : 'ghost'}
            className={`rounded-b-none font-futuristic ${activeTab === 'followers' ? '' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('followers')}
          >
            <Users className="w-4 h-4 mr-2" />
            Followers ({followers.length})
          </Button>
          <Button
            variant={activeTab === 'following' ? 'default' : 'ghost'}
            className={`rounded-b-none font-futuristic ${activeTab === 'following' ? '' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('following')}
          >
            <User className="w-4 h-4 mr-2" />
            Following ({following.length})
          </Button>
        </div>
        
        {/* Content */}
        <div className="min-h-[200px]">
          {activeTab === 'followers' ? (
            <div>
              {followers.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No followers yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {followers.map((follower: any, index: number) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg flex items-center ${
                        computedTheme === 'dark' 
                          ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20' 
                          : 'bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        computedTheme === 'dark' ? 'bg-primary/10' : 'bg-primary/5'
                      }`}>
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">@{follower.follower || follower.name || 'Unknown'}</p>
                        <p className="text-xs text-muted-foreground">
                          {follower.what && Array.isArray(follower.what) && follower.what.length > 0 ? follower.what.join(', ') : 'follower'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              {following.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Not following anyone yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {following.map((followingItem: any, index: number) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg flex items-center ${
                        computedTheme === 'dark' 
                          ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20' 
                          : 'bg-gradient-to-r from-cyan-100 to-blue-100 border border-cyan-200'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        computedTheme === 'dark' ? 'bg-primary/10' : 'bg-primary/5'
                      }`}>
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">@{followingItem.following || followingItem.name || 'Unknown'}</p>
                        <p className="text-xs text-muted-foreground">
                          {followingItem.what && Array.isArray(followingItem.what) && followingItem.what.length > 0 ? followingItem.what.join(', ') : 'following'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}