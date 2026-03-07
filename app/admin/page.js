'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, Users, Wrench, TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import PushNotificationManager from '@/components/PushNotificationManager';

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { label: 'Total Orders', value: '42', icon: ShoppingCart, change: '+12%', positive: true, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Service Inquiries', value: '18', icon: Wrench, change: '+5%', positive: true, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { label: 'Active Products', value: '24', icon: Package, change: '0%', positive: true, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Total Customers', value: '1.2k', icon: Users, change: '+8%', positive: true, color: 'text-violet-600', bg: 'bg-violet-50' },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch real data here
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Overview</h2>
          <p className="text-slate-500 font-medium">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              Export PDF
           </button>
           <button className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20">
              New Report
           </button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.label} 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="premium-card p-6 flex flex-col justify-between group cursor-default"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl transition-transform group-hover:scale-110`}>
                  <Icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-black px-2 py-1 rounded-full ${stat.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {stat.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mock Chart Area */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 premium-card p-8 min-h-[400px] flex flex-col"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Activity className="text-blue-600" size={20} /> Revenue & Growth
            </h3>
            <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500/20 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
            </select>
          </div>
          
          <div className="flex-1 relative flex items-end gap-1 sm:gap-4 px-2">
            {[40, 70, 45, 90, 65, 80, 55].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.5 + (i * 0.1), duration: 1, ease: "easeOut" }}
                  className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-xl group-hover:from-blue-700 group-hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/10 relative"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ₹{height * 100}
                  </div>
                </motion.div>
                <span className="text-[10px] font-black text-slate-400 uppercase">Day {i + 1}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Notifications/Activity */}
        <motion.div variants={itemVariants} className="premium-card p-8 flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
             <TrendingUp className="text-indigo-600" size={20} /> Recent Activity
          </h3>
          <div className="space-y-6 flex-1">
            {[
              { id: 1, user: 'John Doe', action: 'placed an order', time: '2 mins ago', icon: <ShoppingCart size={14} />, color: 'bg-blue-100 text-blue-600' },
              { id: 2, user: 'Aman Singh', action: 'booked a service', time: '1 hour ago', icon: <Wrench size={14} />, color: 'bg-cyan-100 text-cyan-600' },
              { id: 3, user: 'Rahul Verma', action: 'joined as a user', time: '3 hours ago', icon: <Users size={14} />, color: 'bg-violet-100 text-violet-600' },
              { id: 4, user: 'System', action: 'database backed up', time: 'Yesterday', icon: <Package size={14} />, color: 'bg-slate-100 text-slate-600' },
            ].map(activity => (
              <div key={activity.id} className="flex gap-4">
                <div className={`h-8 w-8 rounded-full ${activity.color} flex items-center justify-center flex-shrink-0`}>
                  {activity.icon}
                </div>
                <div>
                  <p className="text-sm text-slate-800 leading-tight">
                    <span className="font-bold">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-2 border-t pt-4">
            View All Logs <ArrowUpRight size={16} />
          </button>
        </motion.div>
      </div>

      <PushNotificationManager />
    </motion.div>
  );
}
