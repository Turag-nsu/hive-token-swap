import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // This is a simple test endpoint to verify our API routes are working
    return NextResponse.json({ 
      success: true, 
      message: 'PDF generation test endpoint is working',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in test PDF endpoint:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to test PDF generation'
    }, { status: 500 });
  }
}