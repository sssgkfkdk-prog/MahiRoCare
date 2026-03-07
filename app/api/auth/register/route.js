import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, password, otp } = await req.json();

    if (!email || !password || !otp) {
      return NextResponse.json({ error: 'Email, password, and OTP are required' }, { status: 400 });
    }

    // Check if user exists and OTP matches
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json({ error: 'Verification session not found' }, { status: 404 });
    }

    if (user.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    if (new Date() > user.otpExpiry) {
      return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user with registration details
    user.name = name;
    user.password = hashedPassword;
    user.otp = undefined; // Clear OTP after use
    user.otpExpiry = undefined;
    await user.save();

    return NextResponse.json({ success: true, message: 'User registered successfully' }, { status: 201 });
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
