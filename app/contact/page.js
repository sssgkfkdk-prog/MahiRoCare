"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 py-20 px-4 mt-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
            
            {/* Left Contact Info Side */}
            <div className="bg-slate-900 text-white p-10 md:w-1/3 flex flex-col justify-center">
               <h2 className="text-2xl font-bold mb-8">Get In Touch</h2>
               
               <div className="space-y-6">
                 <div>
                   <h4 className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-1">Office Address</h4>
                   <p className="text-sm font-medium">612/292 nirala marg daraganj<br/>prayagraj 211006, uttar pradesh</p>
                 </div>
                 
                 <div>
                   <h4 className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-1">Call or WhatsApp</h4>
                   <a href="https://wa.me/919076723600" target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:text-blue-400 transition flex items-center gap-2">
                     +91 90767 23600
                     <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-tighter">Chat Now</span>
                   </a>
                 </div>
                 
                 <div>
                   <h4 className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-1">Email Support</h4>
                   <p className="text-sm font-medium">businesswithmahirocare@gmail.com</p>
                 </div>
                 
                 <div>
                   <h4 className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-1">Working Hours</h4>
                   <p className="text-sm font-medium">Mon - Sat: 9:00 AM - 7:00 PM</p>
                 </div>
               </div>
            </div>

            {/* Right Contact Form Side */}
            <div className="p-10 md:w-2/3">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Drop us a message</h2>
              <p className="text-slate-500 mb-8">Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.</p>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-slate-900" />
                  <input type="text" placeholder="Last Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-slate-900" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-slate-900" />
                <textarea rows="4" placeholder="Your Message" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-slate-900"></textarea>
                <button type="button" onClick={() => alert('Thanks for reaching out! In this demo, contact forms are not wired up to a DB yet.')} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 shadow-md transition w-full md:w-auto">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
