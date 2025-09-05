"use client";

import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useSocialStore } from '@/stores/social';
import { useAuthStore } from '@/stores/auth';
import { hiveSocialAPI } from '@/lib/api/hive-social';
import { SocialFeedItem } from '@/types/social';
import {
    Heart,
    MessageCircle,
    Share,
    ChevronUp,
    ChevronDown,
    DollarSign,
    Clock,
    User,
    Hash,
    RefreshCw,
    Filter
} from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

export function SocialFeed() {
    const {
        feed,
        isLoading,
        hasMore,
        filters,
        setFeed,
        addToFeed,
        setLoading,
        setHasMore,
        setFilters,
        updatePost
    } = useSocialStore();

    const { isAuthenticated, username } = useAuthStore();
    const [isVoting, setIsVoting] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState('');

    // Load initial feed
    useEffect(() => {
        const loadInitialFeed = async () => {
            setLoading(true);
            try {
                let posts: SocialFeedItem[] = [];

                if (filters.sortBy === 'trending') {
                    posts = await hiveSocialAPI.getTrendingPosts(
                        filters.tag || '',
                        filters.limit
                    );
                } else {
                    posts = await hiveSocialAPI.getRecentPosts(
                        filters.tag || '',
                        filters.limit
                    );
                }

                setFeed(posts);
                setHasMore(posts.length === filters.limit);
            } catch (error) {
                console.error('Error loading feed:', error);
                toast.error('Failed to load posts');
            } finally {
                setLoading(false);
            }
        };

        loadInitialFeed();
    }, [filters, setFeed, setLoading, setHasMore]);

    const loadFeed = useCallback(async (reset: boolean = false) => {
        setLoading(true);
        try {
            let startAuthor: string | undefined;
            let startPermlink: string | undefined;

            if (!reset && feed.length > 0) {
                const lastPost = feed[feed.length - 1];
                startAuthor = lastPost.author;
                startPermlink = lastPost.permlink;
            }

            let posts: SocialFeedItem[] = [];

            if (filters.sortBy === 'trending') {
                posts = await hiveSocialAPI.getTrendingPosts(
                    filters.tag || '',
                    filters.limit,
                    startAuthor,
                    startPermlink
                );
            } else {
                posts = await hiveSocialAPI.getRecentPosts(
                    filters.tag || '',
                    filters.limit,
                    startAuthor,
                    startPermlink
                );
            }

            if (reset) {
                setFeed(posts);
            } else {
                addToFeed(posts);
            }

            setHasMore(posts.length === filters.limit);
        } catch (error) {
            console.error('Error loading feed:', error);
            toast.error('Failed to load posts');
        } finally {
            setLoading(false);
        }
    }, [feed, filters, setFeed, addToFeed, setLoading, setHasMore]);

    const handleVote = async (post: SocialFeedItem, weight: number) => {
        if (!isAuthenticated || !username) {
            toast.error('Please login to vote');
            return;
        }

        if (isVoting) {
            return;
        }

        setIsVoting(post.id);

        const voteType = weight > 0 ? 'upvote' : 'downvote';

        console.log('🗳️ Voting on post:', {
            voter: username,
            author: post.author,
            permlink: post.permlink,
            weight: weight,
            postTitle: post.title
        });

        try {
            await hiveSocialAPI.votePost({
                voter: username,
                author: post.author,
                permlink: post.permlink,
                weight: weight
            });

            console.log('✅ Vote successful:', { voteType });
            toast.success(`${voteType.charAt(0).toUpperCase() + voteType.slice(1)} successful!`);

            // Optimistic UI update - immediately update the vote count
            const newUpvotes = weight > 0 ? post.upvotes + 1 : post.upvotes;
            const newDownvotes = weight < 0 ? post.downvotes + 1 : post.downvotes;

            updatePost(post.id, {
                upvotes: newUpvotes,
                downvotes: newDownvotes,
                isUpvoted: weight > 0,
                isDownvoted: weight < 0
            });

            // Optional: Try to refresh data after a delay, but don't fail if it doesn't work
            setTimeout(async () => {
                try {
                    console.log('🔄 Attempting to refresh post data...');
                    const updatedPost = await hiveSocialAPI.getPostWithVotesAndReplies(post.author, post.permlink);
                    if (updatedPost) {
                        const refreshedPost = hiveSocialAPI.transformCondenserToSocialFeedItem(updatedPost);
                        updatePost(post.id, {
                            upvotes: refreshedPost.upvotes,
                            downvotes: refreshedPost.downvotes,
                            replies: refreshedPost.replies,
                            isUpvoted: refreshedPost.isUpvoted,
                            isDownvoted: refreshedPost.isDownvoted
                        });
                        console.log('🔄 Post data refreshed successfully');
                    }
                } catch (refreshError) {
                    // Don't show error to user for refresh failure - optimistic update is sufficient
                    console.log('ℹ️ Post refresh failed (using optimistic data):', refreshError);
                }
            }, 3000); // Wait 3 seconds for blockchain confirmation

        } catch (error: any) {
            console.error('❌ Error voting:', error);
            toast.error(error.message || `Failed to ${voteType}`);
        } finally {
            setIsVoting(null);
        }
    };

    const handleReply = (post: SocialFeedItem) => {
        if (!isAuthenticated) {
            toast.error('Please log in to reply');
            return;
        }

        console.log('💬 Reply to post:', post.id);
        setReplyingTo(post.id);
        toast.info('Reply functionality coming soon!');
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

    const extractImageFromBody = (body: string): string | null => {
        const imageRegex = /!\[.*?\]\((https?:\/\/[^\s)]+)\)/;
        const match = body.match(imageRegex);
        return match ? match[1] : null;
    };

    if (feed.length === 0 && !isLoading) {
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
                    <Button onClick={() => loadFeed(true)}>
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
                                onClick={() => loadFeed(true)}
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
                                variant={filters.sortBy === 'created' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilters({ sortBy: 'created' })}
                            >
                                <Clock className="w-4 h-4 mr-1" />
                                Recent
                            </Button>
                            <Button
                                variant={filters.sortBy === 'trending' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilters({ sortBy: 'trending' })}
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

                    return (
                        <Card key={post.id} className="overflow-hidden">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">@{post.author}</div>
                                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                                                <span>Rep {post.reputation}</span>
                                                <span>•</span>
                                                <span>{formatDistanceToNow(new Date(post.created), { addSuffix: true })}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-muted-foreground flex items-center">
                                        <DollarSign className="w-4 h-4 mr-1" />
                                        {post.payout}
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Post Title */}
                                {post.title && (
                                    <h3 className="font-semibold text-lg leading-tight">
                                        {post.title}
                                    </h3>
                                )}

                                {/* Post Image */}
                                {postImage && (
                                    <div className="rounded-lg overflow-hidden">
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
                                            <Badge key={`${post.id}-tag-${index}-${tag}`} variant="secondary" className="text-xs">
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
                                <div className="flex items-center justify-between pt-3 border-t">
                                    <div className="flex items-center space-x-4">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleVote(post, 10000)}
                                            disabled={!isAuthenticated || isVoting === post.id}
                                            className={post.isUpvoted ? 'text-green-600' : ''}
                                        >
                                            <ChevronUp className="w-4 h-4 mr-1" />
                                            {post.upvotes}
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleVote(post, -10000)}
                                            disabled={!isAuthenticated || isVoting === post.id}
                                            className={post.isDownvoted ? 'text-red-600' : ''}
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
                                            {post.replies > 0 ? `${post.replies} Replies` : 'Reply'}
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

            {/* Load More Button */}
            {hasMore && (
                <div className="text-center">
                    <Button
                        variant="outline"
                        onClick={() => loadFeed(false)}
                        disabled={isLoading}
                        className="min-w-[120px]"
                    >
                        {isLoading ? (
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
        </div>
    );
}
