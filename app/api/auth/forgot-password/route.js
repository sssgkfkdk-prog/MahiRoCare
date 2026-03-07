import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/lib/models/User';
import crypto from 'crypto';
import { sendEmail } from '@/lib/sendgrid';

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOne({ email });

    if (!user) {
      // For security, don't reveal if user exists
      return NextResponse.json({ message: 'If an account exists, a reset link has been sent.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    const resetUrl = `${process.env.NEXTAUTH_URL}/login?token=${resetToken}`;

    const emailContent = `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset for your Mahi RO Care account.</p>
      <p>Please click the link below to reset your password. This link will expire in 1 hour.</p>
      <a href="${resetUrl}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `;

    await sendEmail({
      to: email,
      subject: 'Password Reset Request - Mahi RO Care',
      html: emailContent
    });

    return NextResponse.json({ message: 'Reset link sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
