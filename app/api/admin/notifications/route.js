import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongoose';
import ServiceInquiry from '@/lib/models/ServiceInquiry';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const lastChecked = searchParams.get('lastChecked');

    await dbConnect();

    let query = {};
    if (lastChecked) {
      query.createdAt = { $gt: new Date(lastChecked) };
    }

    // Sort by newest first to get the most recent ones
    const newInquiries = await ServiceInquiry.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ newInquiries }, { status: 200 });

  } catch (error) {
    console.error('Failed to check for new notifications:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
