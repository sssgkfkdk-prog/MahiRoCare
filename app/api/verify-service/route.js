import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/mongoose';
import ServiceInquiry from '@/lib/models/ServiceInquiry';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      serviceData
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

    // Save the service inquiry now that payment is verified
    const inquiry = await ServiceInquiry.create({
      ...serviceData,
      paymentId: razorpay_payment_id,
      paymentStatus: 'paid',
      amountPaid: 89
    });

    return NextResponse.json({ message: 'Service booked successfully', inquiryId: inquiry._id }, { status: 200 });

  } catch (error) {
    console.error('Verify Service Payment Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
