'use client';

import { motion } from 'framer-motion';
import { Shield, CheckCircle, ShoppingCart, Info, ArrowRight, Zap, Gem, Crown, X } from 'lucide-react';
import { useCart } from '@/components/CartProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

import { amcPlans } from '@/lib/amcPlans';
import { useState } from 'react';


export default function AMCPage() {
  const [category, setCategory] = useState('domestic');
  const { addToCart } = useCart();
  const currentPlans = amcPlans[category];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 skew-x-[-20deg] translate-x-1/2 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider mb-6">
                <Shield size={16} /> Best Service Guarantee
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
                Annual <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Maintenance</span> Made Simple
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                Protect your family&apos;s health and extend the life of your RO system with our premium care plans. No hidden costs, just pure water.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#plans" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 flex items-center gap-2">
                  View Plans <ArrowRight size={20} />
                </a>
                <div className="flex -space-x-3 items-center ml-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                      <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" fill className="object-cover" unoptimized />
                    </div>
                  ))}
                  <p className="ml-6 text-sm font-semibold text-slate-500 italic">+ 500+ happy customers</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Why Mahi RO AMC?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { t: 'Expert Techs', d: 'Background verified professionals' },
                      { t: 'Genuine Spares', d: 'Original filters only' },
                      { t: 'Fast Response', d: 'Service within 4 hours' },
                      { t: 'Zero Visit Cost', d: 'All visits included for free' }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/10 border border-white/20 p-4 rounded-xl">
                        <p className="font-bold text-lg mb-1">{item.t}</p>
                        <p className="text-blue-100 text-sm">{item.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Floating element */}
              <motion.div
                className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-2xl hidden lg:block border border-blue-50"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <p className="font-black text-slate-900">₹0 Inspection</p>
                    <p className="text-xs text-slate-500">Free for AMC Holders</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Choose Your Protection</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-10">Affordable annual contracts tailored to your usage. Select a plan to get started immediately.</p>
          
          {/* Category Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-200/50 p-1.5 rounded-2xl flex gap-1">
              <button 
                onClick={() => setCategory('domestic')}
                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${category === 'domestic' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Domestic Plans
              </button>
              <button 
                onClick={() => setCategory('commercial')}
                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${category === 'commercial' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Commercial Plans
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentPlans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-[2rem] border-2 transition-all duration-500 hover:shadow-3xl group overflow-hidden ${plan.popular ? 'border-blue-500 scale-105 z-10' : plan.borderColor
                }`}
            >
              {plan.popular && (
                <div className="bg-blue-500 text-white text-center py-2 text-xs font-black uppercase tracking-widest">
                  Most Recommended
                </div>
              )}

              <div className={`p-8 bg-gradient-to-br ${plan.color}`}>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white rounded-2xl shadow-sm">
                    {plan.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 line-through text-sm font-medium">₹{plan.originalPrice}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">₹{plan.price}</span>
                      <span className="text-slate-500 text-sm">/yr</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-3">{plan.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8">
                  {plan.description}
                </p>

                <div className="space-y-4 mb-10">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    if (plan.price === 'Custom') {
                      window.location.href = '/contact';
                      return;
                    }
                    addToCart({
                      _id: `amc_${plan.name.toLowerCase().replace(/ /g, '_')}`,
                      name: plan.name + ' AMC Plan',
                      price: plan.price,
                      category: 'AMC',
                      images: [],
                      description: plan.description
                    })
                  }}
                  className={`w-full py-4 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 ${plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-500/30'
                      : plan.price === 'Custom' ? 'bg-white text-slate-900 border-2 border-slate-200 hover:bg-slate-50' : 'bg-slate-900 text-white hover:bg-slate-800'
                    } active:scale-95`}
                >
                  {plan.price === 'Custom' ? <ArrowRight size={18} /> : <ShoppingCart size={18} />} 
                  {plan.price === 'Custom' ? 'Get Custom Quote' : 'Buy Plan Now'}
                </button>
              </div>

              <div className="p-4 bg-slate-50 text-center text-xs font-bold text-slate-400 border-t border-slate-100 tracking-wide uppercase">
                Secure SSL Checkout
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-black mb-8 leading-tight">What happens if you <span className="text-red-500 underline decoration-4 underline-offset-8">skip</span> AMC?</h2>
              <div className="space-y-6">
                {[
                  { t: 'Higher Repair Costs', d: 'Breakdown repairs can cost 3x more than a yearly AMC.' },
                  { t: 'Poor Water Quality', d: 'Clogged filters let impurities pass directly into your drinking water.' },
                  { t: 'Shortened RO Life', d: 'Without maintenance, your RO membrane degrades 60% faster.' },
                  { t: 'Uncertainty', d: 'Finding a reliable technician during an emergency is stressful.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <X className="text-red-500 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-bold text-lg">{item.t}</p>
                      <p className="text-slate-400 text-sm">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="bg-blue-600/20 aspect-square rounded-3xl border border-blue-500/30 flex items-center justify-center">
                    <Shield className="text-blue-400" size={48} />
                  </div>
                  <div className="bg-cyan-600/20 aspect-square rounded-3xl border border-cyan-500/30 flex items-center justify-center">
                    <CheckCircle className="text-cyan-400" size={48} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-800 aspect-square rounded-3xl flex items-center justify-center">
                    <p className="text-6xl font-black">2k+</p>
                  </div>
                  <div className="bg-amber-600/20 aspect-square rounded-3xl border border-amber-500/30 flex items-center justify-center">
                    <Crown className="text-amber-400" size={48} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Snippet */}
      <section className="py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-blue-50 rounded-[3rem] p-12 border border-blue-100">
          <Info className="text-blue-600 mx-auto mb-6" size={48} />
          <h3 className="text-2xl font-black text-slate-900 mb-4">Have questions about AMC?</h3>
          <p className="text-slate-600 mb-8">Not sure which plan is right for you? Our experts can help you choose the best protection based on your water quality and usage.</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold border border-blue-200 hover:bg-blue-600 hover:text-white transition-all">
            Chat with Expert
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
