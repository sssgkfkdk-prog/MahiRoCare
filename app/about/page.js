'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Award, Users, Wrench, ShieldCheck, CheckCircle2 } from 'lucide-react';
import * as motion from 'framer-motion/client';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply z-0"></div>
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent z-0"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">About <span className="text-blue-400">Mahi RO Care</span></h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
                Bringing pure, safe, and crystal-clear water to every home and business in Prayagraj. With over half a decade of excellence in water purification engineering.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story & Stats Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 border border-blue-500/30 rounded-full bg-blue-500/10 text-blue-700 font-bold text-xs tracking-widest uppercase">
                   Our Journey
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                  Over 5 Years of Securing Health Through Pure Water
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Founded in Prayagraj, Mahi RO Care has been at the forefront of the water purification industry for the last 5-6 years. We understand that water quality is directly tied to family health and industrial success, which is why we've dedicated ourselves to providing uncompromising service.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  We are extremely proud to be official service partners with <strong className="text-blue-700">Urban Natives</strong>, along with several other prominent local scale companies. This network of trust reflects our commitment to professionalism and technical mastery.
                </p>
                <ul className="space-y-3 pt-4 border-t border-slate-100">
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="text-green-500" size={20} /> Prompt & Professional Team
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="text-green-500" size={20} /> Genuine Spare Parts Guaranteed
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="text-green-500" size={20} /> Transparent Pricing
                  </li>
                </ul>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.1 }}
                  className="bg-blue-50 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-blue-100 transition shadow-sm border border-blue-100"
                >
                  <Award className="text-blue-600 w-12 h-12 mb-4" />
                  <h3 className="text-4xl font-black text-slate-800 mb-1">6+</h3>
                  <p className="text-slate-600 font-medium">Years Experience</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.2 }}
                  className="bg-slate-50 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-100 transition shadow-sm border border-slate-200 lg:-translate-y-8"
                >
                   <Users className="text-slate-700 w-12 h-12 mb-4" />
                  <h3 className="text-4xl font-black text-slate-800 mb-1">5K+</h3>
                  <p className="text-slate-600 font-medium">Happy Families</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.3 }}
                  className="bg-slate-50 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-100 transition shadow-sm border border-slate-200"
                >
                  <Wrench className="text-slate-700 w-12 h-12 mb-4" />
                  <h3 className="text-4xl font-black text-slate-800 mb-1">24/7</h3>
                  <p className="text-slate-600 font-medium">Service Support</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.4 }}
                  className="bg-cyan-50 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-cyan-100 transition shadow-sm border border-cyan-100 lg:-translate-y-8"
                >
                  <ShieldCheck className="text-cyan-600 w-12 h-12 mb-4" />
                  <h3 className="text-4xl font-black text-slate-800 mb-1">100%</h3>
                  <p className="text-slate-600 font-medium">Verified Partners</p>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="py-16 bg-blue-600 text-white text-center px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience the Mahi RO Care Standard</h2>
            <p className="text-blue-100 mb-8 text-lg">Whether you need a new installation, emergency repair, or an AMC plan, our professional technicians are just a call away.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/services" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-slate-50 transition shadow-lg inline-block text-center">Book Service Now</Link>
                <a href="/contact" className="bg-blue-700 border border-blue-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-800 transition">Contact Support</a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
