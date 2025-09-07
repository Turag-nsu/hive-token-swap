'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, User } from 'lucide-react';
import Link from 'next/link';
import { TestRunner } from '@/components/debug/TestRunner';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { hiveSocialAPI } from '@/lib/api/hive-social';
import { useUser } from '@/hooks/useUser';

interface ProfileDataComparison {
  field: string;
  socialPage: string | number | null;
  realPage: string | number | null;
  match: boolean;
}

// Helper function to calculate voting power from raw account data
const calculateVotingPower = (account: any): number => {
  try {
    // Calculate voting power based on last vote time and current mana
    const lastVoteTime = new Date(account.last_vote_time + 'Z').getTime();
    const currentTime = Date.now();
    const secondsSinceLastVote = (currentTime - lastVoteTime) / 1000;
    
    // Voting mana regenerates at 10000 units per day (100% per day)
    const regeneratedMana = (secondsSinceLastVote / 86400) * 10000;
    const currentMana = parseInt(account.voting_manabar.current_mana) + regeneratedMana;
    const votingPower = Math.min(100, (currentMana / 10000) * 100);
    
    return Math.round(votingPower);
  } catch (error) {
    console.warn('Failed to calculate voting power:', error);
    return 0;
  }
};

// Helper function to calculate Hive Power from raw account data
const calculateHivePower = async (account: any): Promise<string> => {
  try {
    // Calculate Hive Power
    const userVestingShares = parseFloat(account.vesting_shares.split(' ')[0]);
    const delegatedVestingShares = parseFloat(account.delegated_vesting_shares.split(' ')[0]);
    const receivedVestingShares = parseFloat(account.received_vesting_shares.split(' ')[0]);
    const effectiveVestingShares = userVestingShares - delegatedVestingShares + receivedVestingShares;

    // Get dynamic global properties for HP calculation
    const globalProps = await hiveSocialAPI.getDynamicGlobalProperties();
    const totalVestingFund = parseFloat(globalProps.total_vesting_fund_hive.toString().split(' ')[0]);
    const totalVestingShares = parseFloat(globalProps.total_vesting_shares.toString().split(' ')[0]);
    const hivePower = (effectiveVestingShares * totalVestingFund) / totalVestingShares;

    return `${hivePower.toFixed(3)} HP`;
  } catch (error) {
    console.warn('Failed to calculate Hive Power:', error);
    return '0.000 HP';
  }
};

export default function DebugPage() {
  const { username: loggedInUsername } = useUser();
  const [inputUsername, setInputUsername] = useState('');
  const [profileComparison, setProfileComparison] = useState<ProfileDataComparison[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Set the input username to the logged in user by default
  useEffect(() => {
    if (loggedInUsername) {
      setInputUsername(loggedInUsername);
    }
  }, [loggedInUsername]);

  const runProfileComparison = async () => {
    if (!inputUsername) {
      setError('Please enter a username to run profile comparison');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Get data from social page (our implementation)
      const socialProfile = await hiveSocialAPI.getUserProfile(inputUsername);
      
      // Get real data directly from Hive API using getAccounts method
      const accounts = await hiveSocialAPI.getAccounts([inputUsername]);
      const realAccount = accounts?.[0] || null;
      
      // Calculate reputation for real account using the same method
      const realAccountReputation = realAccount ? hiveSocialAPI.parseReputation(realAccount.reputation) : null;
      
      // Calculate voting power for real account using the same method
      const realAccountVotingPower = realAccount ? calculateVotingPower(realAccount) : null;
      
      // Calculate Hive Power for real account using the same method
      const realAccountHivePower = realAccount ? await calculateHivePower(realAccount) : null;
      
      // Create comparison data
      const comparisonData: ProfileDataComparison[] = [
        {
          field: 'Username',
          socialPage: socialProfile?.username || null,
          realPage: realAccount?.name || null,
          match: socialProfile?.username === realAccount?.name
        },
        {
          field: 'Reputation',
          socialPage: socialProfile?.reputation || null,
          realPage: realAccountReputation,
          match: socialProfile?.reputation === realAccountReputation
        },
        {
          field: 'Post Count',
          socialPage: socialProfile?.postCount || 0,
          realPage: realAccount?.post_count || 0,
          match: socialProfile?.postCount === realAccount?.post_count
        },
        {
          field: 'HIVE Balance',
          socialPage: socialProfile?.hiveBalance || '0.000 HIVE',
          realPage: realAccount?.balance || '0.000 HIVE',
          match: socialProfile?.hiveBalance === realAccount?.balance
        },
        {
          field: 'HBD Balance',
          socialPage: socialProfile?.hbdBalance || '0.000 HBD',
          realPage: realAccount?.hbd_balance || '0.000 HBD',
          match: socialProfile?.hbdBalance === realAccount?.hbd_balance
        },
        {
          field: 'Hive Power',
          socialPage: socialProfile?.hp || '0.000 HP',
          realPage: realAccountHivePower,
          match: socialProfile?.hp === realAccountHivePower
        },
        {
          field: 'Voting Power',
          socialPage: socialProfile?.votingPower ? `${socialProfile.votingPower}%` : null,
          realPage: realAccountVotingPower ? `${realAccountVotingPower}%` : null,
          match: socialProfile?.votingPower === realAccountVotingPower
        },
        {
          field: 'Join Date',
          socialPage: socialProfile?.joinDate ? new Date(socialProfile.joinDate).toLocaleDateString() : 'Not implemented',
          realPage: realAccount?.created ? new Date(realAccount.created).toLocaleDateString() : null,
          match: socialProfile?.joinDate === realAccount?.created
        }
      ];

      setProfileComparison(comparisonData);
    } catch (err) {
      setError('Failed to fetch profile data: ' + (err as Error).message);
      console.error('Profile comparison error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUsername(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      runProfileComparison();
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Debug Dashboard</h1>
          <p className="text-muted-foreground">
            Run tests and debug components
          </p>
        </div>

        <div className="grid gap-6">
          <TestRunner />
          
          <Card className="glass border-border/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Data Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Compare data between social page implementation and real Hive data
                </p>
                
                <div className="flex gap-2 mb-4">
                  <Input
                    type="text"
                    placeholder="Enter username to test"
                    value={inputUsername}
                    onChange={handleUsernameChange}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button 
                    onClick={runProfileComparison} 
                    disabled={loading}
                    className="futuristic-button"
                  >
                    {loading ? 'Comparing...' : 'Compare'}
                  </Button>
                </div>
                
                {error && (
                  <div className="mt-4 p-3 bg-destructive/20 text-destructive rounded">
                    {error}
                  </div>
                )}
              </div>

              {profileComparison.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Field</th>
                        <th className="text-left py-2">Social Page</th>
                        <th className="text-left py-2">Real Page</th>
                        <th className="text-left py-2">Match</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profileComparison.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 font-medium">{item.field}</td>
                          <td className="py-2">
                            {item.socialPage === null ? 'N/A' : item.socialPage.toString()}
                          </td>
                          <td className="py-2">
                            {item.realPage === null ? 'N/A' : item.realPage.toString()}
                          </td>
                          <td className="py-2">
                            {item.match ? (
                              <span className="text-green-500">✓ Match</span>
                            ) : (
                              <span className="text-red-500">✗ Mismatch</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Known Mismatches:</h3>
                <ul className="text-sm space-y-1">
                  {/* Removed the previously listed mismatches since they should now be fixed */}
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass border-border/30">
            <CardHeader>
              <CardTitle>Development Tools</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild variant="outline" className="futuristic-button">
                <Link href="/my-test">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Hive Keychain Test
                </Link>
              </Button>
              <Button asChild variant="outline" className="futuristic-button">
                <Link href={`/profile/${inputUsername || loggedInUsername || 'testuser'}`}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Profile Page
                </Link>
              </Button>
              <Button asChild variant="outline" className="futuristic-button">
                <Link href="/">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Social Feed
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}