'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Key, Chrome, User, ArrowLeft, RefreshCw, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, Suspense } from 'react';

function LoginContent() {
  const [authStep, setAuthStep] = useState('login'); // 'login', 'register', 'forgot', 'reset'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const t = searchParams.get('token');
    if (t) {
      setToken(t);
      setAuthStep('reset');
    }
  }, [searchParams]);

  // Helper to switch modes
  const switchMode = (mode) => {
    setAuthStep(mode);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    if (authStep === 'register' && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      if (authStep === 'register') {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });
        
        const data = await res.json();
        if (!res.ok) {
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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Password reset link sent to your email');
        setAuthStep('login');
      } else {
        alert(data.error || 'Failed to send reset link');
      }
    } catch (error) {
      console.error(error);
      alert('Error requesting password reset');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Password reset successfully! You can now sign in.');
        setAuthStep('login');
        setToken(null);
        setPassword('');
        setConfirmPassword('');
      } else {
        alert(data.error || 'Failed to reset password');
      }
    } catch (error) {
      console.error(error);
      alert('Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-xl border border-slate-200 p-8">
          {success && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-700">
              <CheckCircle2 className="flex-shrink-0" size={20} />
              <p className="text-sm font-medium">{success}</p>
            </div>
          )}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              {authStep === 'register' ? 'Create an Account' : authStep === 'forgot' ? 'Reset Password' : authStep === 'reset' ? 'Set New Password' : 'Welcome Back'}
            </h1>
            <p className="text-slate-500 mt-2">
              {authStep === 'register' 
                ? 'Join Mahi RO Care today'
                : authStep === 'forgot'
                ? 'Enter your email to receive a reset link'
                : authStep === 'reset'
                ? 'Enter your new password below'
                : 'Sign in to your Mahi RO Care account'}
            </p>
          </div>

          {(authStep === 'login' || authStep === 'register') && (
            <>
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

              <div className="relative flex items-center mb-8">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink-0 mx-4 text-slate-400 text-sm">
                  or {authStep === 'register' ? 'register' : 'sign in'} with email
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>
            </>
          )}

          <form onSubmit={authStep === 'forgot' ? handleForgotPassword : authStep === 'reset' ? handleResetPassword : handleAuth} className="space-y-5">
            {authStep === 'register' && (
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

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400" />
                </div>
                <input 
                  type="email" 
                  required
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 text-slate-900"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            {(authStep !== 'forgot') && (
              <>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-slate-700">
                      {authStep === 'reset' ? 'New Password' : 'Password'}
                    </label>
                    {authStep === 'login' && (
                      <button 
                        type="button"
                        onClick={() => setAuthStep('forgot')}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key size={18} className="text-slate-400" />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 text-slate-900"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {(authStep === 'register' || authStep === 'reset') && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {authStep === 'reset' ? 'Confirm New Password' : 'Confirm Password'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Key size={18} className="text-slate-400" />
                      </div>
                      <input 
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 text-slate-900"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-md disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {loading && <RefreshCw size={18} className="animate-spin" />}
              {loading ? 'Processing...' : (
                authStep === 'register' ? 'Sign Up' : 
                authStep === 'forgot' ? 'Send Reset Link' : 
                authStep === 'reset' ? 'Update Password' : 'Sign In'
              )}
            </button>

            <div className="text-center mt-4">
              {authStep === 'forgot' || authStep === 'reset' ? (
                <button 
                  type="button" 
                  onClick={() => switchMode('login')} 
                  className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  <ArrowLeft size={14} /> Back to Sign In
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={() => switchMode(authStep === 'login' ? 'register' : 'login')} 
                  className="text-sm text-blue-600 hover:underline"
                >
                  {authStep === 'login' ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
                </button>
              )}
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><RefreshCw className="animate-spin text-blue-600" /></div>}>
      <LoginContent />
    </Suspense>
  );
}
