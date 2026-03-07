import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    node_env: process.env.NODE_ENV,
    has_nextauth_url: !!process.env.NEXTAUTH_URL,
    nextauth_url_value: process.env.NEXTAUTH_URL?.substring(0, 15) + '...',
    has_nextauth_secret: !!process.env.NEXTAUTH_SECRET,
    has_google_clientId: !!process.env.GOOGLE_CLIENT_ID,
    has_google_secret: !!process.env.GOOGLE_CLIENT_SECRET,
    has_mongo_uri: !!process.env.MONGODB_URI,
    mongo_prefix: process.env.MONGODB_URI?.substring(0, 15) + '...',
    time: new Date().toISOString()
  });
}
