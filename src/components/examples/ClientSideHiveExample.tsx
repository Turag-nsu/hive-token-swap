"use client";

import { useEffect, useState } from 'react';
import { hiveSocialAPI } from '@/lib/api/hive-social';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Loader2, RefreshCw } from 'lucide-react';

interface Post {
  author: string;
  title: string;
  permlink: string;
  created: string;
  upvotes: number;
  downvotes: number;
  payout: string;
}

export function ClientSideHiveExample() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrendingPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🚀 Fetching trending posts from client side...');
      
      // This works because we're on the client side (browser)
      const trendingPosts = await hiveSocialAPI.getTrendingPosts('', 5);
      
      console.log('✅ Posts fetched successfully:', trendingPosts.length);
      setPosts(trendingPosts);
      
    } catch (err) {
      console.error('❌ Error fetching posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHotPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🔥 Fetching hot posts from client side...');
      
      const hotPosts = await hiveSocialAPI.getHotPosts('', 5);
      
      console.log('✅ Hot posts fetched successfully:', hotPosts.length);
      setPosts(hotPosts);
      
    } catch (err) {
      console.error('❌ Error fetching hot posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch hot posts');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecentPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🕒 Fetching recent posts from client side...');
      
      const recentPosts = await hiveSocialAPI.getRecentPosts('', 5);
      
      console.log('✅ Recent posts fetched successfully:', recentPosts.length);
      setPosts(recentPosts);
      
    } catch (err) {
      console.error('❌ Error fetching recent posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch recent posts');
    } finally {
      setIsLoading(false);
    }
  };

  // Load trending posts on component mount
  useEffect(() => {
    fetchTrendingPosts();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Client-Side Hive API Example</CardTitle>
          <p className="text-sm text-muted-foreground">
            This component uses HiveSocialAPI directly in the browser (client-side)
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button 
              onClick={fetchTrendingPosts} 
              disabled={isLoading}
              variant="default"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Trending
            </Button>
            <Button 
              onClick={fetchHotPosts} 
              disabled={isLoading}
              variant="outline"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Hot
            </Button>
            <Button 
              onClick={fetchRecentPosts} 
              disabled={isLoading}
              variant="outline"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Recent
            </Button>
            <Button 
              onClick={fetchTrendingPosts} 
              disabled={isLoading}
              variant="ghost"
              size="sm"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
              <p className="text-red-700">Error: {error}</p>
            </div>
          )}

          <div className="space-y-4">
            {posts.map((post, index) => (
              <Card key={`${post.author}-${post.permlink}`} className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium line-clamp-2">{post.title}</h3>
                    <Badge variant="secondary">{post.payout}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>@{post.author}</span>
                    <span>👍 {post.upvotes}</span>
                    <span>👎 {post.downvotes}</span>
                    <span>{new Date(post.created).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {posts.length === 0 && !isLoading && !error && (
            <p className="text-center text-muted-foreground py-8">
              No posts loaded yet. Click a button above to fetch posts.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}