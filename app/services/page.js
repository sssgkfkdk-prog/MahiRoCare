'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle, ShieldCheck, Wrench, Building } from 'lucide-react';
import * as motion from 'framer-motion/client';
import PremiumIndustrialRO from '@/components/PremiumIndustrialRO';

export default function ServicesPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', serviceType: '', address: '', issueDescription: '', preferredDate: ''
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Initialize checkout on server
      const res = await fetch('/api/checkout-service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceType: formData.serviceType, userEmail: formData.email })
      });
      
      const orderData = await res.json();
      
      if (!res.ok) throw new Error(orderData.error);

      // 2. Open Razorpay Window
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'your_razorpay_key_id_here',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Mahi RO Care',
        description: 'Service Booking Partial Payment',
        order_id: orderData.id,
        handler: async function (response) {
          // 3. Verify Payment and Create Inquiry
          const verifyRes = await fetch('/api/verify-service', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                serviceData: formData
             })
          });

          if (verifyRes.ok) {
            setSuccess(true);
            setFormData({
                name: '', email: '', phone: '', serviceType: '', address: '', issueDescription: '', preferredDate: ''
            });
          } else {
            alert('Payment verification failed. If money was deducted, please contact support.');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: { color: '#2563eb' }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error(error);
      alert('Error initiating payment process. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50" suppressHydrationWarning>
      <Navbar />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <main className="flex-1">
        {/* Interactive 3D Hero Section */}
        <section className="bg-slate-900 text-white min-h-[500px] relative overflow-hidden flex items-center">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800/80 to-blue-900/40 z-0"></div>
          
          {/* Custom 3D CSS Scene - Replacing broken Spline Scene */}
          <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 h-full z-0 opacity-80 mix-blend-screen flex items-center justify-center lg:justify-end pr-0 lg:pr-10 mt-20 lg:mt-0 pointer-events-none overflow-hidden">
             <PremiumIndustrialRO />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12 w-full py-20 pointer-events-none">
            
            <motion.div 
              className="lg:w-1/2 backdrop-blur-md bg-slate-900/40 p-10 rounded-3xl border border-white/10 shadow-2xl pointer-events-auto"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-block px-3 py-1 mb-6 border border-cyan-500/30 rounded-full bg-cyan-500/10 text-cyan-300 font-semibold text-xs tracking-widest uppercase shadow-inner">
                Enterprise Solutions
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Fluid Engineering</span> & Care
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-xl font-light">
                From precision domestic purifiers to massive industrial RO infrastructure. Our certified technicians maintain the lifeblood of your operation.
              </p>
              <div className="flex gap-4 mt-8">
                <a href="#booking-form" className="bg-white text-slate-900 hover:bg-slate-100 font-bold py-4 px-8 rounded-xl transition-all shadow-xl hover:shadow-cyan-500/20 flex items-center gap-2">
                  Schedule Maintenance <ArrowRight size={20} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Included Services Features */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-slate-800">Our Expertise</h2>
              <p className="mt-4 text-slate-500 text-lg">Comprehensive care for every type of purification system.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition">
                 <ShieldCheck className="text-blue-600 w-12 h-12 mb-4" />
                 <h3 className="text-xl font-bold text-slate-800 mb-2">Annual Maintenance</h3>
                 <p className="text-slate-600">Complete AMC packages covering filters, membranes, and unlimited service visits.</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition">
                 <Wrench className="text-blue-600 w-12 h-12 mb-4" />
                 <h3 className="text-xl font-bold text-slate-800 mb-2">Repair & Fixes</h3>
                 <p className="text-slate-600">Quick resolution for leaks, flow issues, weird tastes, and pump replacements.</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition">
                 <Building className="text-blue-600 w-12 h-12 mb-4" />
                 <h3 className="text-xl font-bold text-slate-800 mb-2">Commercial Setup</h3>
                 <p className="text-slate-600">Installation and monthly maintenance for large capacity industrial plants.</p>
              </div>
            </div>
            
            {/* Form Section wrapper to match missing tags */}
            <div id="booking-form" className="max-w-4xl mx-auto">
            
            <div className="bg-slate-800 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full border-4 border-slate-700 opacity-50"></div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">Annual Maintenance Contract (AMC)</h3>
              <p className="text-slate-300 mb-6 relative z-10">Protect your investment with our comprehensive AMC plans starting at just ₹1,999/year. Includes free service visits and filter replacements.</p>
              <Link href="/amc" className="inline-block bg-white text-slate-900 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition relative z-10">View Plans</Link>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Book a Service Request</h2>

            {success ? (
              <div className="text-center py-12 flex flex-col items-center">
                <div className="h-20 w-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Booking Confirmed!</h3>
                <p className="text-slate-600 mb-8 max-w-sm mx-auto">Your service request has been successfully submitted. Our team will contact you shortly to confirm the appointment.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="bg-blue-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-blue-700 transition"
                >
                  Book Another Service
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                    <input 
                      required
                      type="tel" 
                      className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address (Optional)</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Service Type *</label>
                    <div className="relative">
                      <select 
                        required
                        className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none"
                        value={formData.serviceType}
                        onChange={e => setFormData({...formData, serviceType: e.target.value})}
                      >
                        <option value="" disabled>Select a service</option>
                        <option value="Domestic RO Installation">Domestic RO Installation</option>
                        <option value="Commercial RO Installation">Commercial RO Installation</option>
                        <option value="Domestic RO Repair">Domestic RO Repair</option>
                        <option value="Commercial RO Repair">Commercial RO Repair</option>
                        <option value="Filter Replacement">Filter Replacement</option>
                        <option value="AMC Plan">AMC (Annual Maintenance)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        ▼
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Date *</label>
                    <input 
                      required
                      type="date" 
                      className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                      value={formData.preferredDate}
                      onChange={e => setFormData({...formData, preferredDate: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Address *</label>
                  <textarea 
                    required
                    rows="2"
                    className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Brief Description of Issue</label>
                  <textarea 
                    rows="3"
                    placeholder="e.g., Leaking water, strange taste, or routine checkup required..."
                    className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                    value={formData.issueDescription}
                    onChange={e => setFormData({...formData, issueDescription: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition transform hover:-translate-y-0.5 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading ? 'Processing...' : 'Pay ₹98.53 & Confirm Booking'}
                </button>
                <div className="text-center mt-4">
                  <p className="text-xs text-slate-500 font-medium">A partial payment of ₹98.53 (includes ₹9 GST & 0.6% platform fee) is required to confirm your booking.</p>
                  <p className="text-xs text-slate-400 mt-1">This amount is fully refundable in case of booking cancellation.</p>
                </div>
              </form>
            )}
          </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
