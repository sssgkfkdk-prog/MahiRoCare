'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Wrench, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { name: 'Products', icon: Package, href: '/admin/products' },
  { name: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
  { name: 'Service Enquiries', icon: Wrench, href: '/admin/inquiries' },
  { name: 'Customers', icon: Users, href: '/admin/customers' },
];

export default function AdminSidebar({ user }) {
  const pathname = usePathname();

  return (
    <aside className="w-80 bg-white border-r border-slate-100 hidden lg:flex flex-col sticky top-0 h-screen">
      <div className="p-8 pb-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Mahi-Care</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] -mt-1">Admin Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Main Menu</p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 relative ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-4 relative z-10">
                <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600 transition-colors'} />
                <span className="font-bold text-sm tracking-tight">{item.name}</span>
              </div>
              {isActive && <motion.div layoutId="active" className="absolute right-4" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}><ChevronRight size={16} /></motion.div>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h4 className="text-sm font-bold mb-1">Mahi Cloud 2.0</h4>
            <p className="text-[10px] text-slate-400 font-medium mb-4 leading-relaxed">Your data is synced across 4 edge nodes globally.</p>
            <div className="flex items-center gap-2">
               <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
               <span className="text-[10px] font-black uppercase tracking-widest">Status: Optimized</span>
            </div>
          </div>
        </div>
        
        <button className="w-full mt-4 flex items-center gap-4 px-4 py-3.5 text-slate-400 hover:text-red-500 font-bold text-sm transition-colors group">
          <LogOut size={20} className="group-hover:rotate-180 transition-transform duration-500" /> 
          Sign Out
        </button>
      </div>
    </aside>
  );
}
