import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/mongoose';
import User from '@/lib/models/User';
import { sendOTP } from '@/lib/sendgrid';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await dbConnect();

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, role: 'customer' });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP via SendGrid
    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== 'your_sendgrid_api_key_here') {
      const result = await sendOTP(email, otp);
      if (!result.success) {
        return NextResponse.json({ error: 'Failed to send OTP email' }, { status: 500 });
      }
    } else {
      // For local development without Sendgrid Key, log the OTP
      console.log(`[LOCAL DEV] OTP for ${email} is ${otp}`);
    }

    return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('OTP Generation Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
