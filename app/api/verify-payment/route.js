import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/mongoose';
import Order from '@/lib/models/Order';
import User from '@/lib/models/User';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      amount,
      user
    } = body;

    // Verify signature
    const secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_secret';
    const bodyText = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(bodyText.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic && process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_ID !== 'your_razorpay_key_id_here') {
      return NextResponse.json({ error: 'Transaction not authentic' }, { status: 400 });
    }

    await dbConnect();
    
    // Find or create dummy user if not logged in
    let dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      dbUser = await User.create({ email: user.email, name: user.name || 'Guest' });
    }

    // Check if there's any AMC plan in the order
    const amcItem = items.find(item => item.category === 'AMC' || item.name.includes('AMC'));
    if (amcItem) {
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1); // 1 year from now
      dbUser.amcPlan = amcItem.name;
      dbUser.amcExpiry = expiryDate;
      await dbUser.save();
    }

    // Create Order in DB
    const newOrder = await Order.create({
      user: dbUser._id,
      items: items.map(i => ({
         product: i._id,
         quantity: i.quantity,
         price: i.price
      })),
      totalAmount: amount,
      status: 'pending',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      shippingAddress: user.address
    });

    return NextResponse.json({ message: 'Order created', orderId: newOrder._id }, { status: 200 });

  } catch (error) {
    console.error('Verify Payment Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
