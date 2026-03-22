'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Scale, FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl p-8 md:p-12 border border-slate-100">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
            <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <Scale size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Terms of Service</h1>
              <p className="text-slate-500 font-medium italic">Last Updated: March 2026</p>
            </div>
          </div>

          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="h-6 w-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-black">1</span>
                Acceptance of Terms
              </h2>
              <p>
                By accessing and using the Mahi RO Care website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="h-6 w-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-black">2</span>
                Service Description
              </h2>
              <p>
                Mahi RO Care provides water purification products, installation, repair, and Annual Maintenance Contracts (AMC). All services are performed by background-verified professionals using genuine spare parts.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="h-6 w-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-black">3</span>
                Booking and Payments
              </h2>
              <p>
                Service bookings require a partial payment of ₹98.53 (inclusive of GST and platform fees) to confirm the appointment. This amount is fully refundable if the booking is cancelled through our support line before the technician arrives.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="h-6 w-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-black">4</span>
                AMC Policies
              </h2>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>AMC plans are valid for one year from the date of purchase.</li>
                <li>Domestic plans include 3 compulsory service visits.</li>
                <li>Commercial plans include monthly maintenance checks.</li>
                <li>Warranty on components is only valid if original Mahi RO Care seals are intact.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="h-6 w-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-black">5</span>
                Liability
              </h2>
              <p>
                While we strive for excellence, Mahi RO Care is not liable for machine failures caused by electricity fluctuations, external physical damage, or tampering by unauthorized third-party technicians.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
