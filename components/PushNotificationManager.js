'use client';

import { useState, useEffect } from 'react';
import { Bell, BellOff, Loader2 } from 'lucide-react';

const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
    } catch (error) {
      console.error('Service Worker Error', error);
    }
  }

  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const subscribeToPush = async () => {
    setLoading(true);
    try {
      // Ask for permission explicitly
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
         alert("You must grant Notification Permissions in your browser settings to receive alerts.");
         setLoading(false);
         return;
      }

      const registration = await navigator.serviceWorker.ready;
      
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });

      setSubscription(sub);

      // Send subscription to backend
      await fetch('/api/admin/push-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub),
      });

      alert('Successfully enabled push notifications for this device!');
    } catch (error) {
      console.error('Push subscription failed:', error);
      alert('Failed to enable push notifications');
    } finally {
      setLoading(false);
    }
  };

  if (!isSupported) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl flex items-start gap-3 mt-6">
        <BellOff size={20} className="mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-semibold text-sm">Push Notifications Not Supported</p>
          <p className="text-xs mt-1">Your browser or device does not support native push notifications.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-6 flex justify-between items-center">
      <div>
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          Mobile Push Notifications
          {subscription && <span className="bg-green-100 text-green-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Active</span>}
        </h3>
        <p className="text-sm text-slate-500 mt-1 max-w-md">
          {subscription 
            ? "This device is registered to receive native notifications even when the app is closed."
            : "Enable native push notifications to receive alerts directly on your phone or desktop lock screen when a new service is booked."}
        </p>
      </div>

      <button
        onClick={subscribeToPush}
        disabled={loading || subscription}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition shadow-sm ${
          subscription 
            ? 'bg-slate-100 text-slate-500 cursor-not-allowed border border-slate-200' 
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
        }`}
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : <Bell size={18} />}
        {loading ? 'Setting up...' : subscription ? 'Enabled' : 'Enable Notifications'}
      </button>
    </div>
  );
}
