'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Key, Chrome, User, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function LoginPage() {
  useEffect(() => {
    console.log('LoginPage Version: 2.0.debug');
  }, []);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOTP = async () => {
    if (!email || !password || !name) {
      alert('Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await res.json();
      if (!res.ok) {
        const errorMsg = data.details || 'No details provided by server';
        alert(`${data.error}: ${errorMsg}`);
        setLoading(false);
        return;
      }
      
      setOtpSent(true);
      setTimer(30);
    } catch (error) {
      console.error(error);
      alert('Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    if (isRegistering && !otpSent) {
      await handleSendOTP();
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      if (isRegistering && otpSent) {
        // Step 2: Register with OTP
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, otp })
        });
        
        if (!res.ok) {
          const data = await res.json();
          alert(data.error || 'Failed to register');
          setLoading(false);
          return;
        }
      }

      // Automatically sign in after registering, or just sign in
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password
      });

      if (res.error) {
        alert(res.error);
      } else {
         router.push('/');
      }
    } catch (error) {
      console.error(error);
      alert('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              {isRegistering ? (otpSent ? 'Verify Email' : 'Create an Account') : 'Welcome Back'}
            </h1>
            <p className="text-slate-500 mt-2">
              {isRegistering 
                ? (otpSent ? `Enter the code sent to ${email}` : 'Join Mahi RO Care today') 
                : 'Sign in to your Mahi RO Care account'}
            </p>
          </div>

          {!otpSent && (
            <div className="space-y-4 mb-8">
              <button 
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 text-slate-700 font-medium py-3 px-4 rounded-xl hover:bg-slate-50 transition shadow-sm"
                disabled={loading}
              >
                <Chrome size={20} className="text-blue-500" />
                Continue with Google
              </button>
            </div>
          )}

          {!otpSent && (
            <div className="relative flex items-center mb-8">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink-0 mx-4 text-slate-400 text-sm">
                or {isRegistering ? 'register' : 'sign in'} with email
              </span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && !otpSent && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      required
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 text-slate-900"
                      placeholder="john_doe"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                </div>
            )}

            {!otpSent && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {isRegistering ? 'Email' : 'Email/Username'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    required
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 text-slate-900"
                    placeholder={isRegistering ? "you@example.com" : "Email/Username"}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>
            )}

            {!otpSent && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key size={18} className="text-slate-400" />
                    </div>
                    <input 
                      type="password" 
                      required
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 text-slate-900"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key size={18} className="text-slate-400" />
                    </div>
                    <input 
                      type="password" 
                      required
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 text-slate-900"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {isRegistering && otpSent && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">6-Digit OTP</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key size={18} className="text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      required
                      maxLength={6}
                      className="w-full pl-10 pr-4 py-3 text-center text-2xl tracking-[0.5em] font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 text-slate-900"
                      placeholder="000000"
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-md disabled:opacity-70"
                  >
                    {loading ? 'Verifying...' : 'Verify & Register'}
                  </button>

                  <button 
                    type="button"
                    onClick={handleSendOTP}
                    disabled={timer > 0 || loading}
                    className="flex items-center justify-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 disabled:text-slate-400 transition"
                  >
                    <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                    {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
                  </button>

                  <button 
                    type="button"
                    onClick={() => {setOtpSent(false); setOtp('');}}
                    className="flex items-center justify-center gap-1 text-xs text-slate-500 hover:text-slate-700 mt-2"
                  >
                    <ArrowLeft size={14} /> Back to details
                  </button>
                </div>
              </div>
            )}

            {!otpSent && (
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-md disabled:opacity-70"
              >
                {loading ? 'Processing...' : (isRegistering ? 'Continue' : 'Sign In')}
              </button>
            )}

            <div className="text-center mt-4">
              <button 
                type="button" 
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setOtpSent(false);
                  setOtp('');
                }} 
                className="text-sm text-blue-600 hover:underline"
              >
                {isRegistering ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
              </button>
            </div>
          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
}
