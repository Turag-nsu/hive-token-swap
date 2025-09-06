"use client";

import { Gift, MessageCircle, UserPlus, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeProvider';

interface UserProfileActionsProps {
  onSendGift: () => void;
  isOwnProfile: boolean;
}

export function UserProfileActions({ onSendGift, isOwnProfile }: UserProfileActionsProps) {
  const { computedTheme } = useTheme();
  
  if (isOwnProfile) {
    return (
      <Card className={`mb-6 glass ${computedTheme === 'dark' ? 'border-border/30' : 'border-border/60'}`}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 font-futuristic">Your Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              className="futuristic-button hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              View Messages
            </Button>
            <Button 
              variant="outline" 
              className="futuristic-button hover:scale-105 transition-transform"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Manage Friends
            </Button>
            <Button 
              variant="outline" 
              className="futuristic-button hover:scale-105 transition-transform"
            >
              <MoreHorizontal className="w-4 h-4 mr-2" />
              More Options
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`mb-6 glass ${computedTheme === 'dark' ? 'border-border/30' : 'border-border/60'}`}>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 font-futuristic">Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={onSendGift}
            className="futuristic-button hover:scale-105 transition-transform bg-gradient-to-r from-blue-500 to-purple-600 text-white"
          >
            <Gift className="w-4 h-4 mr-2" />
            Send Gift
          </Button>
          <Button 
            variant="outline" 
            className="futuristic-button hover:scale-105 transition-transform"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Message
          </Button>
          <Button 
            variant="outline" 
            className="futuristic-button hover:scale-105 transition-transform"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Follow
          </Button>
          <Button 
            variant="outline" 
            className="futuristic-button hover:scale-105 transition-transform"
          >
            <MoreHorizontal className="w-4 h-4 mr-2" />
            More
          </Button>
        </div>
      </div>
    </Card>
  );
}