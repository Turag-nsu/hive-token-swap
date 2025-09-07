import { NextResponse } from 'next/server';
import { Client } from '@hiveio/dhive';

// Use dhive Client directly in API routes (server-side)
// This is the SERVER-SIDE implementation - it should NOT use HiveSocialAPI
const HIVE_NODES = [
  'https://api.hive.blog',
  'https://api.openhive.network',
  'https://hived.privex.io',
  'https://rpc.ecency.com'
];

export async function GET() {
  try {
    console.log('Testing Hive API on server side...');
    
    // Create dhive client for server-side use ONLY
    const client = new Client(HIVE_NODES[0]!, { // Add non-null assertion
      timeout: 15000,
      failoverThreshold: 3,
      consoleOnFailover: true
    });
    
    // Test trending posts using dhive directly
    const query = {
      tag: '',
      limit: 3,
      truncate_body: 1000
    };
    
    const trendingPosts = await client.database.call('get_discussions_by_trending', [query]);
    
    console.log('Trending posts response:', trendingPosts?.length || 0, 'posts');
    
    // Add CORS headers
    const response = NextResponse.json({
      success: true,
      message: 'Hive API working on server side',
      data: {
        postsCount: trendingPosts?.length || 0,
        posts: trendingPosts?.slice(0, 3).map((post: any) => ({
          author: post.author,
          title: post.title,
          permlink: post.permlink,
          created: post.created,
          votes: post.active_votes?.length || 0
        })) || []
      }
    });
    
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
    
  } catch (error) {
    console.error('Hive API test failed:', error);
    
    // Add CORS headers to error response too
    const errorResponse = NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
    
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return errorResponse;
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}