import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongoose';
import Subscription from '@/lib/models/Subscription';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const subscription = await req.json();

    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return NextResponse.json({ error: 'Invalid subscription data' }, { status: 400 });
    }

    await dbConnect();

    // Remove old subscriptions with the same endpoint to avoid duplicates
    await Subscription.deleteMany({ endpoint: subscription.endpoint });

    // Save the new subscription
    await Subscription.create({
      userId: session.user.id === 'admin-hardcoded' ? null : session.user.id,
      endpoint: subscription.endpoint,
      keys: subscription.keys
    });

    return NextResponse.json({ success: true, message: 'Subscription saved' }, { status: 201 });
  } catch (error) {
    console.error('Failed to save subscription:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
