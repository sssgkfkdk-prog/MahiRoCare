import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.password) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser) {
      // If a placeholder user (without password) exists from previous OTP attempts, update it
      existingUser.name = name;
      existingUser.password = hashedPassword;
      existingUser.otp = undefined;
      existingUser.otpExpiry = undefined;
      await existingUser.save();
    } else {
      // Create new user
      await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'customer'
      });
    }

    return NextResponse.json({ success: true, message: 'User registered successfully' }, { status: 201 });
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
