import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/lib/models/User';
import Order from '@/lib/models/Order';
import ServiceInquiry from '@/lib/models/ServiceInquiry';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const user = await User.findById(session.user.id).select('name email amcPlan amcExpiry');
    
    // Count orders
    const orderCount = await Order.countDocuments({ user: session.user.id });
    
    // Count services (using email as in dashboard)
    const serviceCount = await ServiceInquiry.countDocuments({ email: session.user.email });

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        amcPlan: user.amcPlan || null,
        amcExpiry: user.amcExpiry || null,
      },
      stats: {
        orders: orderCount,
        services: serviceCount
      }
    });
  } catch (error) {
    console.error('Profile Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
