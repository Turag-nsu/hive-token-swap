"use client";

import { useEffect, useState } from 'react';
import { hiveSocialAPI } from '@/lib/api/hive-social';

export function SimpleClientTest() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    // This will only run in the browser where window is defined
    if (typeof window !== 'undefined') {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching trending posts...');
        const trendingPosts = await hiveSocialAPI.getTrendingPosts('', 5);
        setPosts(trendingPosts);
        console.log('Posts fetched successfully:', trendingPosts.length);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Not in browser environment, skipping API call');
    }
  };

  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      fetchPosts();
    }
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Simple Client Test</h2>
      
      {typeof window === 'undefined' ? (
        <p className="text-yellow-600">This component only works in browser environment</p>
      ) : (
        <>
          <button 
            onClick={fetchPosts} 
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Fetch Posts'}
          </button>
          
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <p>Error: {error}</p>
            </div>
          )}
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Posts ({posts.length})</h3>
            {posts.map((post, index) => (
              <div key={index} className="border-b py-2">
                <h4 className="font-medium">{post.title}</h4>
                <p className="text-sm text-gray-600">@{post.author}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}