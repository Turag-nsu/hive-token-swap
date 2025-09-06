"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useUser } from '@/hooks/useUser';
import { Wallet, LogIn, User, Shield, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { keychain } from '@/lib/blockchain/keychain';
import { hiveSocialAPI } from '@/lib/api/hive-social';
import { UserProfile } from '@/types/social';

export function SocialSidebar() {
    const { 
      isAuthenticated, 
      username, 
      userProfile, 
      login, 
      logout, 
      updateProfile, 
      isLoading, 
      isFetching,
      refreshUser,
      error
    } = useUser();
    
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [loginUsername, setLoginUsername] = useState('');

    // Debug logging
    console.log('SocialSidebar state:', { isAuthenticated, username, userProfile, isLoading, isFetching, error });

    const handleKeychainLogin = async () => {
        if (!keychain) {
            toast.error('Hive Keychain not available');
            return;
        }

        if (!loginUsername.trim()) {
            toast.error('Please enter your username');
            return;
        }

        setIsLoggingIn(true);
        try {
            // Check if Keychain is installed
            const isInstalled = await keychain.isInstalled();
            if (!isInstalled) {
                toast.error('Please install Hive Keychain extension');
                return;
            }

            // Perform login using sign buffer for authentication
            const authMessage = JSON.stringify({
                app: 'hive-social',
                timestamp: Date.now(),
                login: true
            });

            console.log('Attempting sign buffer with:', {
                username: loginUsername.trim(),
                authMessage,
                keyType: 'Posting'
            });

            // Add timeout to prevent infinite loading
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Authentication timeout - please try again')), 30000)
            );

            const signResult = await Promise.race([
                keychain.requestSignBuffer(
                    loginUsername.trim(),
                    authMessage,
                    'Posting'
                ),
                timeoutPromise
            ]);
            console.log('Keychain sign result:', signResult);

            if (signResult && signResult.success) {
                console.log('Authentication successful, logging in user...');

                // Login first without profile to avoid hanging
                console.log('Calling auth store login...');
                login(loginUsername.trim(), 'keychain', undefined);
                console.log('Auth store login completed');

                toast.success('Successfully logged in with Hive Keychain!');
                setLoginUsername('');

                // Load profile in background (don't wait for it)
                setTimeout(async () => {
                    try {
                        console.log('Loading user profile in background...');
                        await refreshUser();
                    } catch (profileError) {
                        console.warn('Background profile loading failed:', profileError);
                        toast.error('Failed to load user profile');
                    }
                }, 100);
            } else {
                const errorMsg = signResult?.message || signResult?.error || 'Authentication failed';
                throw new Error(errorMsg);
            }
        } catch (error: any) {
            console.error('Keychain login error:', error);
            toast.error(error.message || 'Failed to login with Hive Keychain');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
    };

    const handleRefreshProfile = async () => {
        try {
            await refreshUser();
            toast.success('Profile refreshed successfully');
        } catch (error) {
            toast.error('Failed to refresh profile');
        }
    };

    if (isAuthenticated && username) {
        // Show user profile if available, otherwise show basic user info
        const profile = userProfile as UserProfile | null;
        
        if (profile && !isLoading) {
            return (
                <div className="space-y-4">
                    {/* User Profile Card */}
                    <Card>
                        <CardHeader className="text-center relative">
                            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                                <User className="w-8 h-8 text-primary" />
                            </div>
                            <CardTitle className="text-lg">{profile.displayName || profile.username}</CardTitle>
                            <p className="text-sm text-muted-foreground">@{profile.username}</p>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={handleRefreshProfile}
                                disabled={isFetching}
                                className="absolute top-2 right-2"
                            >
                                <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="text-center">
                                    <div className="font-semibold">{profile.postCount || 0}</div>
                                    <div className="text-muted-foreground">Posts</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold">{profile.reputation || 25}</div>
                                    <div className="text-muted-foreground">Reputation</div>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>HIVE Balance:</span>
                                    <span className="font-medium">{profile.hiveBalance || '0.000 HIVE'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>HBD Balance:</span>
                                    <span className="font-medium">{profile.hbdBalance || '0.000 HBD'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Hive Power:</span>
                                    <span className="font-medium">{profile.hp || '0.000 HP'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Voting Power:</span>
                                    <span className="font-medium">{profile.votingPower || 100}%</span>
                                </div>
                            </div>

                            {profile.about && (
                                <div className="pt-2 border-t">
                                    <p className="text-sm text-muted-foreground">{profile.about}</p>
                                </div>
                            )}

                            <Button variant="outline" onClick={handleLogout} className="w-full">
                                Logout
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm flex items-center">
                                <Shield className="w-4 h-4 mr-2" />
                                Account Health
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Voting Power</span>
                                <div className="flex items-center">
                                    <div className="w-12 h-2 bg-muted rounded-full mr-2 relative">
                                        <div
                                            className="h-full bg-primary rounded-full transition-all duration-300"
                                            style={{ width: `${profile.votingPower || 100}%` }}
                                        />
                                    </div>
                                    <span>{profile.votingPower || 100}%</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Downvote Power</span>
                                <div className="flex items-center">
                                    <div className="w-12 h-2 bg-muted rounded-full mr-2 relative">
                                        <div
                                            className="h-full bg-destructive rounded-full transition-all duration-300"
                                            style={{ width: `${profile.downvotePower || 100}%` }}
                                        />
                                    </div>
                                    <span>{profile.downvotePower || 100}%</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            );
        } else {
            // Show basic user info while profile is loading
            return (
                <div className="space-y-4">
                    <Card>
                        <CardHeader className="text-center">
                            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                                <User className="w-8 h-8 text-primary" />
                            </div>
                            <CardTitle className="text-lg">@{username}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {isLoading ? 'Loading profile...' : 'Profile not available'}
                            </p>
                            {isLoading && (
                                <div className="mt-2">
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto" />
                                </div>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button variant="outline" onClick={handleLogout} className="w-full">
                                Logout
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            );
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <LogIn className="w-5 h-5 mr-2" />
                    Connect Your Hive Account
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Input
                        placeholder="Enter your Hive username"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && !isLoggingIn) {
                                handleKeychainLogin();
                            }
                        }}
                    />
                </div>

                <Button
                    onClick={handleKeychainLogin}
                    disabled={isLoggingIn || !loginUsername.trim()}
                    className="w-full"
                >
                    <Wallet className="w-4 h-4 mr-2" />
                    {isLoggingIn ? (
                        <>
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                            Connecting...
                        </>
                    ) : 'Login with Hive Keychain'}
                </Button>

                <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Requires Hive Keychain browser extension</p>
                    <p>• Your keys never leave your device</p>
                    <p>• Secure blockchain authentication</p>
                </div>
            </CardContent>
        </Card>
    );
}