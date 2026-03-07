'use client';

import { useState, useEffect } from 'react';
import { Bell, X, Info } from 'lucide-react';
import Link from 'next/link';

export default function AdminNotificationManager() {
  const [notifications, setNotifications] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    // Set initial check time to now so we don't get flooded with old notifications on first load
    setLastChecked(new Date().toISOString());

    const checkInterval = setInterval(async () => {
      if (!lastChecked) return;

      try {
        const res = await fetch(`/api/admin/notifications?lastChecked=${lastChecked}`);
        if (!res.ok) return;

        const data = await res.json();
        
        if (data.newInquiries && data.newInquiries.length > 0) {
          // Add new notifications
          const newNotifs = data.newInquiries.map(inq => ({
            id: inq._id,
            title: 'New Service Booked!',
            message: `${inq.name} needs a ${inq.serviceType} RO service at ${inq.address}.`,
            time: new Date().toLocaleTimeString(),
            isRead: false
          }));

          setNotifications(prev => [...prev, ...newNotifs]);
          // Update the last checked timestamp to the latest inquiry's time
          setLastChecked(new Date().toISOString());
        }
      } catch (error) {
        console.error('Failed to check notifications:', error);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(checkInterval);
  }, [lastChecked]);

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {notifications.map((notif) => (
        <div 
          key={notif.id} 
          className="bg-white rounded-xl shadow-2xl border border-blue-100 p-4 w-80 pointer-events-auto transform transition-all duration-300 translate-y-0 opacity-100 flex gap-4 animate-in slide-in-from-right-8"
        >
          <div className="bg-blue-100 text-blue-600 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
            <Bell size={20} className="animate-pulse" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h4 className="text-sm font-bold text-slate-800">{notif.title}</h4>
              <button 
                onClick={() => dismissNotification(notif.id)}
                className="text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-2 leading-tight">
              {notif.message}
            </p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-[10px] text-slate-400">{notif.time}</span>
              <Link 
                href="/admin/inquiries"
                onClick={() => dismissNotification(notif.id)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded-md"
              >
                View Now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
