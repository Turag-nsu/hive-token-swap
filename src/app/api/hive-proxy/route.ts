// src/app/api/hive-proxy/route.ts
import { NextRequest } from 'next/server';

// Hive RPC API endpoint
const HIVE_API_URL = 'https://api.hive.blog';

// Backup endpoints
const BACKUP_ENDPOINTS = [
  'https://anyx.io',
  'https://api.openhive.network',
  'https://hived.emre.sh'
];

// Simple in-memory cache for rate limiting (in production, use Redis or similar)
const requestCounts = new Map<string, { count: number; timestamp: number }>();

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of requestCounts.entries()) {
    if (now - value.timestamp > 10 * 60 * 1000) { // 10 minutes
      requestCounts.delete(key);
    }
  }
}, 10 * 60 * 1000);

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - limit to 50 requests per minute per IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowKey = `${ip}-${Math.floor(now / 60000)}`; // 1-minute windows
    
    const current = requestCounts.get(windowKey) || { count: 0, timestamp: now };
    if (current.count >= 50) {
      console.warn(`[HiveProxy] Rate limit exceeded for IP: ${ip}`);
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Update request count
    requestCounts.set(windowKey, { count: current.count + 1, timestamp: now });
    
    const body = await request.json();
    console.log(`[HiveProxy] Received request from IP: ${ip}`, { method: body.method, params: body.params });
    
    // Validate the request
    if (!body.method || !body.params) {
      console.warn(`[HiveProxy] Invalid request from IP: ${ip}`, body);
      return new Response(
        JSON.stringify({ error: 'Invalid request: method and params are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create the RPC request
    const rpcRequest = {
      jsonrpc: '2.0',
      method: body.method,
      params: body.params,
      id: Date.now()
    };

    console.log(`[HiveProxy] Making request to main endpoint: ${HIVE_API_URL}`, { method: body.method });
    
    // Try the main endpoint first
    let response = await fetch(HIVE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rpcRequest),
    });

    // If the main endpoint fails, try backup endpoints
    if (!response.ok) {
      console.warn(`[HiveProxy] Main endpoint failed: ${response.status}`, { method: body.method });
      for (const backupEndpoint of BACKUP_ENDPOINTS) {
        try {
          console.log(`[HiveProxy] Trying backup endpoint: ${backupEndpoint}`, { method: body.method });
          response = await fetch(backupEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(rpcRequest),
          });
          
          if (response.ok) {
            console.log(`[HiveProxy] Backup endpoint succeeded: ${backupEndpoint}`, { method: body.method });
            break;
          } else {
            console.warn(`[HiveProxy] Backup endpoint failed: ${backupEndpoint}`, { status: response.status });
          }
        } catch (error) {
          console.warn(`[HiveProxy] Backup endpoint error: ${backupEndpoint}`, error);
          // Continue to the next backup endpoint
          continue;
        }
      }
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[HiveProxy] All endpoints failed for ${body.method}`, { 
        status: response.status, 
        error: errorText 
      });
      return new Response(
        JSON.stringify({ error: `Failed to fetch from Hive API: ${response.status} ${response.statusText}` }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log(`[HiveProxy] Successful response for ${body.method}`, { 
      resultLength: data.result ? (Array.isArray(data.result) ? data.result.length : typeof data.result) : 'no result',
      hasError: !!data.error
    });

    // Return the response with proper CORS headers
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('[HiveProxy] Error in Hive proxy:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Handle preflight requests
export async function OPTIONS() {
  console.log('[HiveProxy] Handling OPTIONS request');
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}