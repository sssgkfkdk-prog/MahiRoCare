'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RotateCcw, CreditCard, HelpCircle } from 'lucide-react';

export default function RefundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl p-8 md:p-12 border border-slate-100">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
            <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <RotateCcw size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Refund & Cancellation</h1>
              <p className="text-slate-500 font-medium italic">Last Updated: March 2026</p>
            </div>
          </div>

          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                Service Cancellation
              </h2>
              <p>
                Service bookings can be cancelled any time before the technician arrives at your doorstep. The full partial payment amount (including GST) will be refunded to your original payment method within 5-7 working days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                AMC Refunds
              </h2>
              <p>
                AMC plans can be cancelled within 7 days of purchase if no services have been availed. A processing fee of ₹500 will be deducted from the refund amount. After 7 days or after the first service visit, AMC plans are non-refundable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                Product Returns
              </h2>
              <p>
                For RO machines and filters, returns are accepted within 10 days of installation if there are manufacturing defects. Returns are not accepted for damage caused by improper usage or external factors.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                How to Initiate a Refund
              </h2>
              <p>
                To request a refund, please contact us via WhatsApp at +91 90767 23600 or email us at businesswithmahirocare@gmail.com with your Order ID and reason for cancellation.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
