import { NextResponse } from 'next/server';
import { hiveSocialAPI } from '@/lib/api/hive-social';

export async function GET() {
  try {
    console.log('Testing Hive Social API...');
    
    // Test trending posts
    const trendingPosts = await hiveSocialAPI.getTrendingPosts('', 3);
    
    console.log('Trending posts response:', trendingPosts);
    
    return NextResponse.json({
      success: true,
      message: 'Hive Social API working',
      data: {
        postsCount: trendingPosts?.length || 0,
        posts: trendingPosts.map(post => ({
          author: post.author,
          title: post.title,
          permlink: post.permlink,
          payout: post.payout,
          upvotes: post.upvotes
        }))
      }
    });
    
  } catch (error) {
    console.error('Hive Social API test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
