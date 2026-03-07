'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, X, ShieldCheck, Mail, Phone, MapPin, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminNotificationManager() {
  const [notifications, setNotifications] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Hidden audio element for the bell sound
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audioRef.current.volume = 0.5;

    setLastChecked(new Date().toISOString());

    const checkInterval = setInterval(async () => {
      if (!lastChecked) return;

      try {
        const res = await fetch(`/api/admin/notifications?lastChecked=${lastChecked}`);
        if (!res.ok) return;

        const data = await res.json();
        
        if (data.newInquiries && data.newInquiries.length > 0) {
          const newNotifs = data.newInquiries.map(inq => ({
            id: inq._id,
            title: 'Priority Service Request',
            message: `${inq.name} booked a ${inq.serviceType} RO service.`,
            location: inq.address,
            phone: inq.phone,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }));

          setNotifications(prev => [...newNotifs, ...prev]);
          setLastChecked(new Date().toISOString());
          
          // Play notification sound
          audioRef.current.play().catch(e => console.log('Audio play blocked by browser policy'));
        }
      } catch (error) {
        console.error('Notification check failed:', error);
      }
    }, 10000);

    return () => clearInterval(checkInterval);
  }, [lastChecked]);

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div 
            key={notif.id} 
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="bg-slate-900/95 backdrop-blur-xl border border-white/10 p-5 rounded-[2rem] shadow-3xl pointer-events-auto flex gap-4 relative overflow-hidden group"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors"></div>
            
            <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 flex-shrink-0">
               <Zap size={22} className="animate-pulse" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-black text-white tracking-tight uppercase tracking-widest">{notif.title}</h4>
                <button 
                  onClick={() => dismissNotification(notif.id)}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              
              <p className="text-blue-100 text-xs font-bold leading-snug mb-3">
                {notif.message}
              </p>

              <div className="space-y-1.5 mb-4">
                 <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <MapPin size={10} className="text-blue-500" /> {notif.location.substring(0, 30)}...
                 </div>
                 <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <Phone size={10} className="text-blue-500" /> {notif.phone}
                 </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{notif.time}</span>
                <Link 
                  href="/admin/inquiries"
                  onClick={() => dismissNotification(notif.id)}
                  className="text-[10px] font-black text-blue-400 hover:text-blue-300 uppercase tracking-[0.2em] transition-colors"
                >
                  Confirm Details →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
