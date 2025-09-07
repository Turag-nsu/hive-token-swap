// src/app/api/hive-test/route.ts
import { HiveAccountAPI } from '@/lib/api/hive-api';

export async function GET() {
  try {
    console.log('Testing Hive API on server side...');
    // Test the Hive API
    const account = await HiveAccountAPI.getAccount('alice');
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        account,
        message: 'Hive API connection successful'
      }), 
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  } catch (error) {
    console.error('Hive API Test Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Hive API connection failed'
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  }
}