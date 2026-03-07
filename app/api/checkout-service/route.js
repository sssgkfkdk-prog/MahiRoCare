import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import dbConnect from '@/lib/mongoose';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});

export async function POST(req) {
  try {
    await dbConnect();
    const { serviceType, userEmail } = await req.json();

    // Base amount: ₹89, Platform Fee: 0.6%, GST: ₹9
    const baseAmount = 89;
    const platformFee = baseAmount * 0.006;
    const finalAmount = baseAmount + platformFee + 9;
    const amountInPaise = Math.round(finalAmount * 100);

    let razorpayOrderId = null;
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_ID !== 'your_razorpay_key_id_here') {
      const options = {
        amount: amountInPaise,
        currency: 'INR',
        receipt: `srv_${Date.now()}`
      };
      const order = await razorpay.orders.create(options);
      razorpayOrderId = order.id;
    } else {
       razorpayOrderId = `dummy_srv_order_${Date.now()}`;
    }

    return NextResponse.json({
      id: razorpayOrderId,
      currency: 'INR',
      amount: amountInPaise
    });
  } catch (error) {
    console.error('Service Checkout Error:', error);
    return NextResponse.json({ error: 'Failed to initiate service checkout' }, { status: 500 });
  }
}
