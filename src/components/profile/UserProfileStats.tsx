"use client";

import { Card } from '@/components/ui/Card';
import { UserProfile } from '@/types/social';
import { useTheme } from '@/providers/ThemeProvider';

interface UserProfileStatsProps {
  profile: UserProfile;
}

export function UserProfileStats({ profile }: UserProfileStatsProps) {
  const { computedTheme } = useTheme();
  
  return (
    <Card className={`mb-6 glass ${computedTheme === 'dark' ? 'border-border/30' : 'border-border/60'}`}>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 font-futuristic">Profile Statistics</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Reputation */}
          <div className={`text-center p-4 rounded-lg ${
            computedTheme === 'dark' 
              ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30' 
              : 'bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200'
          }`}>
            <div className="text-2xl font-bold text-primary font-futuristic">{profile.reputation || 25}</div>
            <div className="text-sm text-muted-foreground">Reputation</div>
          </div>
          
          {/* Post Count */}
          <div className={`text-center p-4 rounded-lg ${
            computedTheme === 'dark' 
              ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30' 
              : 'bg-gradient-to-br from-cyan-100 to-blue-100 border border-cyan-200'
          }`}>
            <div className="text-2xl font-bold text-primary font-futuristic">{profile.postCount || 0}</div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </div>
          
          {/* Hive Balance */}
          <div className={`text-center p-4 rounded-lg ${
            computedTheme === 'dark' 
              ? 'bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/30' 
              : 'bg-gradient-to-br from-green-100 to-teal-100 border border-green-200'
          }`}>
            <div className="text-2xl font-bold text-primary font-futuristic">{profile.hiveBalance || '0.000 HIVE'}</div>
            <div className="text-sm text-muted-foreground">HIVE Balance</div>
          </div>
          
          {/* HBD Balance */}
          <div className={`text-center p-4 rounded-lg ${
            computedTheme === 'dark' 
              ? 'bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/30' 
              : 'bg-gradient-to-br from-orange-100 to-yellow-100 border border-orange-200'
          }`}>
            <div className="text-2xl font-bold text-primary font-futuristic">{profile.hbdBalance || '0.000 HBD'}</div>
            <div className="text-sm text-muted-foreground">HBD Balance</div>
          </div>
          
          {/* Hive Power */}
          <div className={`text-center p-4 rounded-lg ${
            computedTheme === 'dark' 
              ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30' 
              : 'bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200'
          } md:col-span-2`}>
            <div className="text-2xl font-bold text-primary font-futuristic">{profile.hp || '0.000 HP'}</div>
            <div className="text-sm text-muted-foreground">Hive Power</div>
          </div>
          
          {/* Voting Power */}
          <div className={`text-center p-4 rounded-lg ${
            computedTheme === 'dark' 
              ? 'bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-500/30' 
              : 'bg-gradient-to-br from-indigo-100 to-blue-100 border border-indigo-200'
          }`}>
            <div className="text-2xl font-bold text-primary font-futuristic">{profile.votingPower || 100}%</div>
            <div className="text-sm text-muted-foreground">Voting Power</div>
          </div>
          
          {/* Downvote Power */}
          <div className={`text-center p-4 rounded-lg ${
            computedTheme === 'dark' 
              ? 'bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30' 
              : 'bg-gradient-to-br from-red-100 to-pink-100 border border-red-200'
          }`}>
            <div className="text-2xl font-bold text-primary font-futuristic">{profile.downvotePower || 100}%</div>
            <div className="text-sm text-muted-foreground">Downvote Power</div>
          </div>
        </div>
      </div>
    </Card>
  );
}