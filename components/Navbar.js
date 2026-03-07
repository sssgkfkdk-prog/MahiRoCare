'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useCart } from './CartProvider';
import { useSession, signOut } from 'next-auth/react';
import ProfileDropdown from './ProfileDropdown';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, isMounted } = useCart();
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-800 tracking-tight">Mahi <span className="text-blue-500">RO Care</span></span>
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center space-x-8">
            <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium transition">Home</Link>
            <Link href="/products" className="text-slate-600 hover:text-blue-600 font-medium transition">Products</Link>
            <Link href="/amc" className="text-slate-600 hover:text-blue-600 font-medium transition">AMC Plans</Link>
            <Link href="/services" className="text-slate-600 hover:text-blue-600 font-medium transition">Book Service</Link>
            
            <div className="flex items-center space-x-4 border-l pl-4 border-slate-200">
              
              {session ? (
                <ProfileDropdown />
              ) : (
                <Link href="/login" className="text-slate-600 hover:text-blue-600 transition flex items-center gap-1">
                  <User size={20} />
                  <span className="text-sm font-medium hidden lg:block">Sign In</span>
                </Link>
              )}

              <Link href="/cart" className="text-slate-600 hover:text-blue-600 relative transition ml-4">
                <ShoppingCart size={20} />
                {isMounted && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <Link href="/cart" className="text-slate-600 relative transition mr-4">
                <ShoppingCart size={24} />
                {isMounted && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm font-bold">
                    {cartCount}
                  </span>
                )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden absolute w-full bg-white border-b shadow-lg z-50">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-medium">Home</Link>
            <Link href="/products" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-medium">Products</Link>
            <Link href="/amc" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-medium">AMC Plans</Link>
            <Link href="/services" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-medium">Book Service</Link>
            
            <div className="border-t border-slate-100 my-2"></div>
            
            {session ? (
              <>
                <Link href={session.user?.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 text-blue-600 font-medium bg-blue-50/50">
                  {session.user?.role === 'admin' ? 'Admin Panel' : 'My Dashboard'}
                </Link>
                <button onClick={() => { setIsOpen(false); signOut({ callbackUrl: '/' }); }} className="w-full text-left block pl-3 pr-4 py-2 text-red-600 hover:bg-red-50 font-medium">
                  Log Out
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 text-blue-600 font-medium bg-blue-50/50">Sign In / Register</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
