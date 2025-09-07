"use client";

import { useState, useEffect } from 'react';
import {
    MessageCircle,
    Share,
    ChevronUp,
    ChevronDown,
    Clock,
    User,
    RefreshCw,
    Filter,
    MoreHorizontal,
    UserPlus,
    Hash
} from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { CommentModal } from './CommentModal';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useUser } from '@/hooks/useUser';
import { SocialFeedItem } from '@/types/social';
import { useSocialFeed, useVotePost, usePrefetchPost } from '@/hooks/useSocialFeed';
import { hiveKeychainAPI } from '@/lib/blockchain/keychain';

// Add this interface for following state
interface FollowingState {
  [author: string]: boolean;
}

export function SocialFeed() {
    const { isAuthenticated, username, refreshUser } = useUser();
    const [showFilters, setShowFilters] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState<SocialFeedItem | null>(null);
    const [following, setFollowing] = useState<FollowingState>({});
    
    // Use our new React Query hook for the social feed
    const { 
        data, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage, 
        isLoading,
        refetch,
        isError,
        error
    } = useSocialFeed({ sortBy: 'created', limit: 20 });
    
    // Use our new React Query mutation for voting
    const { mutate: votePost, isPending: isVoting } = useVotePost();
    
    // Use prefetching for better UX
    const prefetchPost = usePrefetchPost();
    
    // Flatten the pages into a single array of posts
    // Fix: properly handle the data structure from useInfiniteQuery
    const feed: SocialFeedItem[] = data ? (data as any).pages?.flatMap((page: SocialFeedItem[]) => page) : [];

    // Auto-fetch next page when reaching the bottom
    const { ref: loadMoreRef, inView } = useInView();
    
    // Fetch next page when in view
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const handleVote = async (post: SocialFeedItem, weight: number) => {
        if (!isAuthenticated || !username) {
            toast.error('Please login to vote');
            return;
        }

        // Add confirmation for votes
        const voteType = weight > 0 ? 'upvote' : 'downvote';
        const confirmed = window.confirm(`Do you want to ${voteType} this post by @${post.author}?`);

        if (!confirmed) {
            return;
        }

        console.log('🗳️ Voting on post:', {
            voter: username,
            author: post.author,
            permlink: post.permlink,
            weight: weight,
            postTitle: post.title
        });

        // Use React Query mutation for voting
        votePost({
            voter: username,
            author: post.author,
            permlink: post.permlink,
            weight: weight
        }, {
            onSuccess: async () => {
                console.log('✅ Vote successful:', { voteType });
                toast.success(`${voteType.charAt(0).toUpperCase() + voteType.slice(1)} successful!`);
                
                // Revalidate user profile to update voting power
                await refreshUser();
            },
            onError: (error: any) => {
                console.error('❌ Error voting:', error);
                toast.error(error.message || `Failed to ${voteType}`);
            }
        });
    };

    const handleReply = (post: SocialFeedItem) => {
        if (!isAuthenticated) {
            toast.error('Please log in to reply');
            return;
        }

        console.log('💬 Reply to post:', post.id);
        // Set the selected post and show the comment modal
        setSelectedPost(post);
        setShowCommentModal(true);
    };

    const handleShare = (post: SocialFeedItem) => {
        const shareUrl = `https://hive.blog/@${post.author}/${post.permlink}`;

        if (navigator.share) {
            navigator.share({
                title: post.title || `Post by @${post.author}`,
                text: post.body.substring(0, 100) + '...',
                url: shareUrl,
            }).then(() => {
                console.log('📤 Post shared successfully');
                toast.success('Post shared!');
            }).catch((error) => {
                console.error('❌ Error sharing:', error);
                // Fallback to copying to clipboard
                copyToClipboard(shareUrl);
            });
        } else {
            // Fallback: copy to clipboard
            copyToClipboard(shareUrl);
        }
    };

    const handleFollow = async (author: string) => {
        if (!isAuthenticated || !username) {
            toast.error('Please log in to follow users');
            return;
        }

        // Check if already following
        const isFollowing = following[author] || false;
        
        try {
            if (isFollowing) {
                // Unfollow
                await hiveKeychainAPI.unfollowUser(username, author);
                setFollowing(prev => ({ ...prev, [author]: false }));
                toast.success(`Unfollowed @${author}`);
            } else {
                // Follow
                await hiveKeychainAPI.followUser(username, author);
                setFollowing(prev => ({ ...prev, [author]: true }));
                toast.success(`Following @${author}`);
            }
        } catch (error) {
            console.error('Error following/unfollowing user:', error);
            toast.error('Failed to follow/unfollow user');
        }
    };

    const handleMessage = (author: string) => {
        if (!isAuthenticated || !username) {
            toast.error('Please log in to send messages');
            return;
        }

        // For now, we'll just show a toast
        // In a real implementation, this would open a messaging interface
        toast.info(`Messaging functionality for @${author} would open here`);
    };

    const handleMore = (post: SocialFeedItem) => {
        // Show more options for the post
        toast.info(`More options for post by @${post.author} would appear here`);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Link copied to clipboard!');
            console.log('📋 Link copied to clipboard:', text);
        }).catch((error) => {
            console.error('❌ Failed to copy to clipboard:', error);
            toast.error('Failed to copy link');
        });
    };

    const formatBody = (body: string): string => {
        // Simple markdown-like formatting for display
        return body
            .substring(0, 300)
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            + (body.length > 300 ? '...' : '');
    };

    const extractImageFromBody = (body: string): string | undefined => {
        const imageRegex = /!\[.*?\]\((https?:\/\/[^\s)]+)\)/;
        const match = body.match(imageRegex);
        return match ? match[1] : undefined;
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                {/* Loading skeletons */}
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-muted rounded-full animate-pulse"></div>
                                    <div>
                                        <div className="h-4 w-24 bg-muted rounded animate-pulse mb-2"></div>
                                        <div className="h-3 w-32 bg-muted rounded animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="h-6 w-3/4 bg-muted rounded animate-pulse"></div>
                            <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
                            <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
                            <div className="h-4 w-2/3 bg-muted rounded animate-pulse"></div>
                            <div className="flex items-center justify-between pt-3 border-t">
                                <div className="flex items-center space-x-4">
                                    <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
                                    <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
                                    <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
                                </div>
                                <div className="h-8 w-8 bg-muted rounded animate-pulse"></div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <Card>
                <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                        <MessageCircle className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Error loading posts</h3>
                    <p className="text-muted-foreground mb-4">
                        {error?.message || 'Failed to load posts. Please try again.'}
                    </p>
                    <Button onClick={() => refetch()}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retry
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (feed.length === 0) {
        return (
            <Card>
                <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                        <MessageCircle className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">No posts yet</h3>
                    <p className="text-muted-foreground mb-4">
                        Be the first to share something with the community!
                    </p>
                    <Button onClick={() => refetch()}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh Feed
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {/* Feed Controls */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold">Social Feed</h2>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter className="w-4 h-4 mr-2" />
                                Filters
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => refetch()}
                                disabled={isLoading}
                            >
                                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                                Refresh
                            </Button>
                        </div>
                    </div>

                    {showFilters && (
                        <div className="flex flex-wrap gap-2 pt-3 border-t">
                            <Button
                                variant={'default'}
                                size="sm"
                                // onClick={() => setFilters({ sortBy: 'created' })}
                            >
                                <Clock className="w-4 h-4 mr-1" />
                                Recent
                            </Button>
                            <Button
                                variant={'outline'}
                                size="sm"
                                // onClick={() => setFilters({ sortBy: 'trending' })}
                            >
                                <ChevronUp className="w-4 h-4 mr-1" />
                                Trending
                            </Button>
                        </div>
                    )}
                </CardHeader>
            </Card>

            {/* Feed Items */}
            <div className="space-y-4">
                {feed.map((post) => {
                    const postImage = extractImageFromBody(post.body);
                    const isFollowingAuthor = following[post.author] || false;

                    return (
                        <Card 
                          key={post.id} 
                          className="overflow-hidden glass border border-border/30 hover:shadow-lg transition-all duration-300"
                          onMouseEnter={() => prefetchPost(post.author, post.permlink)}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <Link href={`/profile/${post.author}`} className="font-semibold hover:text-primary transition-colors">
                                                @{post.author}
                                            </Link>
                                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                                                <span>Rep {post.reputation}</span>
                                                <span>•</span>
                                                <span>{formatDistanceToNow(new Date(post.created), { addSuffix: true })}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleFollow(post.author)}
                                            className={isFollowingAuthor ? "text-blue-500" : ""}
                                        >
                                            <UserPlus className="w-4 h-4 mr-1" />
                                            {isFollowingAuthor ? "Following" : "Follow"}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleMessage(post.author)}
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleMore(post)}
                                        >
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Post Title */}
                                {post.title && (
                                    <h3 className="font-semibold text-lg leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        {post.title}
                                    </h3>
                                )}

                                {/* Post Image */}
                                {postImage && (
                                    <div className="rounded-lg overflow-hidden border border-border/20">
                                        <img
                                            src={postImage}
                                            alt=""
                                            className="w-full h-48 object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Post Content */}
                                <div
                                    className="text-muted-foreground leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: formatBody(post.body) }}
                                />

                                {/* Tags */}
                                {post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                        {post.tags.slice(0, 5).map((tag, index) => (
                                            <Badge key={`${post.id}-tag-${index}-${tag}`} variant="secondary" className="text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                                                <Hash className="w-3 h-3 mr-1" />
                                                {tag}
                                            </Badge>
                                        ))}
                                        {post.tags.length > 5 && (
                                            <Badge key={`${post.id}-more-tags`} variant="outline" className="text-xs">
                                                +{post.tags.length - 5}
                                            </Badge>
                                        )}
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between pt-3 border-t border-border/20">
                                    <div className="flex items-center space-x-4">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleVote(post, 10000)}
                                            disabled={!isAuthenticated || isVoting}
                                            className={post.active_votes?.find((vote: any) => vote.voter === username && vote.percent > 0) ? 'text-green-600' : ''}
                                        >
                                            <ChevronUp className="w-4 h-4 mr-1" />
                                            {post.upvotes}
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleVote(post, -10000)}
                                            disabled={!isAuthenticated || isVoting}
                                            className={post.active_votes?.find((vote: any) => vote.voter === username && vote.percent < 0) ? 'text-red-600' : ''}
                                        >
                                            <ChevronDown className="w-4 h-4 mr-1" />
                                            {post.downvotes}
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleReply(post)}
                                            disabled={!isAuthenticated}
                                        >
                                            <MessageCircle className="w-4 h-4 mr-1" />
                                            {post.children && post.children > 0 ? post.children : 'Reply'}
                                        </Button>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleShare(post)}
                                    >
                                        <Share className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Load More Button/Infinite Scroll Trigger */}
            {hasNextPage && (
                <div ref={loadMoreRef} className="text-center py-4">
                    <Button
                        variant="outline"
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="min-w-[120px]"
                    >
                        {isFetchingNextPage ? (
                            <>
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                                Loading...
                            </>
                        ) : (
                            'Load More'
                        )}
                    </Button>
                </div>
            )}

            {/* Comment Modal */}
            {selectedPost && (
                <CommentModal
                    open={showCommentModal}
                    onOpenChange={setShowCommentModal}
                    post={selectedPost}
                    onCommentSuccess={() => {
                        // Refresh the feed after a successful comment
                        refetch();
                    }}
                />
            )}
        </div>
    );
}