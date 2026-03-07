import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    version: '2.0.debug', // Increment this if needed
    config: {
      hasSendgridKey: !!process.env.SENDGRID_API_KEY,
      sendgridKeyPrefix: process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY.substring(0, 5) : 'none',
      hasFromEmail: !!process.env.SENDGRID_FROM_EMAIL,
      fromEmail: process.env.SENDGRID_FROM_EMAIL || 'none'
    }
  });
}
