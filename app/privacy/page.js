'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Eye, Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl p-8 md:p-12 border border-slate-100">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
            <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <Lock size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Privacy Policy</h1>
              <p className="text-slate-500 font-medium italic">Last Updated: March 2026</p>
            </div>
          </div>

          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="h-6 w-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-black">1</span>
                Information We Collect
              </h2>
              <p>
                We collect your name, phone number, email address, and physical address purely for the purpose of fulfilling service requests and orders. We do not sell your data to any third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="h-6 w-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-black">2</span>
                Payment Security
              </h2>
              <p>
                All financial transactions are processed through Razorpay, a secure and encrypted payment gateway. We do not store your credit card or banking details on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="h-6 w-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-black">3</span>
                Cookies
              </h2>
              <p>
                Our website uses minimal cookies to manage your login session and cart state. These help us provide a seamless user experience.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="h-6 w-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-black">4</span>
                Messaging & Notifications
              </h2>
              <p>
                By providing your phone number, you consent to receive order updates, technician arrival notifications, and AMC renewal reminders via SMS or WhatsApp.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
