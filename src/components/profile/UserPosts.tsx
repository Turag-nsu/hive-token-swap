"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useUserPosts } from '@/hooks/useUserPosts';
import { SocialFeedItem } from '@/types/social';
import { useTheme } from '@/providers/ThemeProvider';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, ChevronUp, ChevronDown, DollarSign } from 'lucide-react';
import { extractImageFromBody } from './profile-utils';

interface UserPostsProps {
  username: string;
}

export function UserPosts({ username }: UserPostsProps) {
  const { computedTheme } = useTheme();
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading,
    isError,
    error
  } = useUserPosts({ username });

  const posts = data?.pages.flatMap(page => page) || [];

  const toggleExpand = (postId: string) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const formatBody = (body: string) => {
    // Simple formatting - in a real app, you might want to use a markdown parser
    return body.replace(/\n/g, '<br />');
  };

  if (isLoading) {
    return (
      <Card className={`mb-6 glass ${computedTheme === 'dark' ? 'border-border/30' : 'border-border/60'}`}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 font-futuristic">User Posts</h2>
          <div className="flex items-center justify-center h-32">
            <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className={`mb-6 glass ${computedTheme === 'dark' ? 'border-border/30' : 'border-border/60'}`}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 font-futuristic">User Posts</h2>
          <div className="text-center text-destructive">
            <p>Error loading posts: {error?.message || 'Unknown error'}</p>
          </div>
        </div>
      </Card>
    );
  }

  if (posts.length === 0) {
    return (
      <Card className={`mb-6 glass ${computedTheme === 'dark' ? 'border-border/30' : 'border-border/60'}`}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 font-futuristic">User Posts</h2>
          <div className="text-center text-muted-foreground">
            <p>No posts found for @{username}</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`mb-6 glass ${computedTheme === 'dark' ? 'border-border/30' : 'border-border/60'}`}>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 font-futuristic">User Posts</h2>
        
        <div className="space-y-6">
          {posts.map((post) => {
            const postImage = extractImageFromBody(post.body);
            const isExpanded = expandedPost === post.id;
            const shouldTruncate = post.body.length > 300;
            const displayBody = isExpanded || !shouldTruncate 
              ? post.body 
              : `${post.body.substring(0, 300)}...`;

            return (
              <Card 
                key={post.id} 
                className={`overflow-hidden ${computedTheme === 'dark' ? 'border-border/30' : 'border-border/60'}`}
              >
                <div className="p-4">
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(post.created), { addSuffix: true })}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {post.payout}
                    </div>
                  </div>

                  {/* Post Title */}
                  {post.title && (
                    <h3 className="font-semibold text-lg mb-2 leading-tight">
                      {post.title}
                    </h3>
                  )}

                  {/* Post Image */}
                  {postImage && (
                    <div className="rounded-lg overflow-hidden mb-3">
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
                    className="text-muted-foreground leading-relaxed mb-3"
                    dangerouslySetInnerHTML={{ __html: formatBody(displayBody) }}
                  />

                  {/* Read More Button */}
                  {shouldTruncate && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpand(post.id)}
                      className="p-0 h-auto font-normal text-primary hover:text-primary/80"
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                    </Button>
                  )}

                  {/* Post Stats */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm">
                        <ChevronUp className="w-4 h-4 mr-1 text-green-500" />
                        <span>{post.upvotes}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <ChevronDown className="w-4 h-4 mr-1 text-red-500" />
                        <span>{post.downvotes}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      <span>{post.children || 0}</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Load More Button */}
        {hasNextPage && (
          <div className="mt-6 text-center">
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              variant="outline"
              className="futuristic-button"
            >
              {isFetchingNextPage ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                'Load More Posts'
              )}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}