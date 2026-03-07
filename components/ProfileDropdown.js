'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { User, LogOut, LayoutDashboard, Shield, Package, Wrench, ChevronDown } from 'lucide-react';

export default function ProfileDropdown() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (session && isOpen && !profileData) {
      setLoading(true);
      fetch('/api/user/profile')
        .then(res => res.json())
        .then(data => {
          if (!data.error) setProfileData(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session, isOpen, profileData]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition p-1.5 rounded-lg hover:bg-slate-50 focus:bg-slate-50"
      >
        <div className="h-8 w-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
          {session.user?.name ? session.user.name.charAt(0).toUpperCase() : <User size={16} />}
        </div>
        <span className="text-sm font-bold hidden lg:block">
          {session.user?.name ? session.user.name.split(' ')[0] : 'My Account'}
        </span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4 bg-slate-50 border-b border-slate-100">
            <p className="font-bold text-slate-800 truncate">{session.user.name || 'User'}</p>
            <p className="text-xs text-slate-500 truncate">{session.user.email}</p>
          </div>
          
          <div className="p-4 space-y-4">
            {/* AMC Status */}
            <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100">
              <div className="flex items-center gap-2 mb-1">
                <Shield size={16} className={profileData?.user.amcPlan ? "text-blue-600" : "text-slate-400"} />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Active AMC Plan</span>
              </div>
              {loading ? (
                <div className="h-5 w-24 bg-slate-200 animate-pulse rounded"></div>
              ) : profileData?.user.amcPlan ? (
                <div>
                  <p className="font-bold text-blue-700">{profileData.user.amcPlan}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Expires: {new Date(profileData.user.amcExpiry).toLocaleDateString()}</p>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500 italic">No active plan.</p>
                  <Link href="/products" onClick={() => setIsOpen(false)} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded text-blue-600 font-medium hover:bg-slate-50 transition">Get AMC</Link>
                </div>
              )}
            </div>

            {/* Counters */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/dashboard" onClick={() => setIsOpen(false)} className="flex flex-col items-center p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition group">
                <Package size={20} className="text-slate-400 group-hover:text-blue-600 mb-1 transition" />
                <span className="text-2xl font-black text-slate-800">{loading ? '-' : profileData?.stats.orders || 0}</span>
                <span className="text-xs font-medium text-slate-500">Orders</span>
              </Link>
              <Link href="/dashboard" onClick={() => setIsOpen(false)} className="flex flex-col items-center p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-cyan-200 hover:bg-cyan-50/50 transition group">
                <Wrench size={20} className="text-slate-400 group-hover:text-cyan-600 mb-1 transition" />
                <span className="text-2xl font-black text-slate-800">{loading ? '-' : profileData?.stats.services || 0}</span>
                <span className="text-xs font-medium text-slate-500">Services</span>
              </Link>
            </div>
            
            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="w-full mt-2 bg-slate-100 text-slate-700 text-xs font-bold py-2 rounded-lg text-center hover:bg-slate-200 transition block">
              Track All History ➔
            </Link>
          </div>

          <div className="border-t border-slate-100 p-2 bg-slate-50">
            {session.user?.role === 'admin' && (
              <Link href="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition font-medium w-full">
                <LayoutDashboard size={16} /> Admin Panel
              </Link>
            )}
            <button 
              onClick={() => { setIsOpen(false); signOut({ callbackUrl: '/' }); }}
              className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition font-medium w-full text-left"
            >
              <LogOut size={16} /> Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
