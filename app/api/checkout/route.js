import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import dbConnect from '@/lib/mongoose';
import Order from '@/lib/models/Order';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});

export async function POST(req) {
  try {
    await dbConnect();
    const { items, amount, userEmail } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Determine the amount in paise (Razorpay standard)
    const amountInPaise = amount * 100;

    // Create order in Razorpay
    let razorpayOrderId = null;
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_ID !== 'your_razorpay_key_id_here') {
      const options = {
        amount: amountInPaise,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`
      };
      const order = await razorpay.orders.create(options);
      razorpayOrderId = order.id;
    } else {
       razorpayOrderId = `dummy_order_${Date.now()}`;
    }

    // Ideally, we should create a pending order in our DB here, 
    // but without full auth enforced, we'll just return the razorpay details to the client
    // and let a verification webhook/route create the final order.
    // For simplicity of this demo, we'll return the ID.

    return NextResponse.json({
      id: razorpayOrderId,
      currency: 'INR',
      amount: amountInPaise
    });
  } catch (error) {
    console.error('Checkout Error:', error);
    return NextResponse.json({ error: 'Failed to initiate checkout' }, { status: 500 });
  }
}
