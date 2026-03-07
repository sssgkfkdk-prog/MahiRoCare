import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { CheckCircle, Shield, Wrench, Droplets } from 'lucide-react';

export default function AMCPage() {
  const plans = [
    {
      name: 'Basic Care',
      price: '1,999',
      duration: 'per year',
      description: 'Essential maintenance for domestic RO purifiers.',
      features: [
        '3 Free Service Visits',
        '1 Free Pre-filter change',
        'Basic cleaning of machine',
        'TDS level check & adjustment',
        '10% off on spare parts'
      ]
    },
    {
      name: 'Premium Shield',
      price: '3,499',
      duration: 'per year',
      popular: true,
      description: 'Complete peace of mind with replacement coverage.',
      features: [
        'Unlimited Service Visits',
        'All Filters changing covered (Sediment, Carbon)',
        'RO Membrane replacement covered',
        'Pump & Adapter warranty',
        'Free emergency leak repairs'
      ]
    },
    {
      name: 'Commercial Care',
      price: 'Custom',
      duration: 'quoted via inspection',
      description: 'Heavy duty maintenance for industrial scale plants.',
      features: [
        'Monthly comprehensive checkups',
        'Industrial membrane flushing',
        'High-pressure pump servicing',
        'Vessel cleaning & media replacement',
        'Dedicated 24/7 priority support'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1">
        {/* Header Sections */}
        <section className="bg-slate-900 py-24 text-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-blue-900/40 to-slate-900 z-0"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
             <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-blue-500/30 rounded-full bg-blue-500/10 text-blue-300 font-medium text-sm">
                <Shield size={16} /> Verified Protection
             </div>
             <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Annual Maintenance Contracts</h1>
             <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
               Secure the lifespan of your water purifier with our hassle-free AMC packages. Pure water, guaranteed 365 days a year.
             </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl shadow-xl flex flex-col border ${
                  plan.popular ? 'border-blue-500 transform md:-translate-y-4' : 'border-slate-200'
                }`}
              >
                {plan.popular && (
                  <div className="bg-blue-500 text-white text-center py-2 text-sm font-bold uppercase tracking-wider rounded-t-xl">
                    Most Popular
                  </div>
                )}
                <div className="p-8 pb-0">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">{plan.name}</h3>
                  <p className="text-slate-500 text-sm mb-6 h-10">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-slate-900">
                      {plan.price !== 'Custom' && '₹'}{plan.price}
                    </span>
                    <span className="text-slate-500 font-medium ml-2">{plan.duration}</span>
                  </div>
                  <Link 
                    href="/services" 
                    className={`block w-full text-center py-3 rounded-xl font-bold transition ${
                      plan.popular 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' 
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    Select Plan
                  </Link>
                </div>
                <div className="p-8 mt-auto">
                  <p className="font-semibold text-slate-800 mb-4 tracking-wide uppercase text-xs">What's included</p>
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex flex-start gap-3">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                        <span className="text-slate-600 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Why choose AMC section */}
        <section className="bg-white py-20 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <h2 className="text-3xl font-bold text-slate-800 mb-12">Why Invest in an AMC?</h2>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                   <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                     <Droplets strokeWidth={1.5} size={32} />
                   </div>
                   <h3 className="text-xl font-bold text-slate-800 mb-2">Uninterrupted Purity</h3>
                   <p className="text-slate-500">Regular filter changes ensure the TDS stays at perfect levels.</p>
                </div>
                <div>
                   <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                     <Wrench strokeWidth={1.5} size={32} />
                   </div>
                   <h3 className="text-xl font-bold text-slate-800 mb-2">Cost Savings</h3>
                   <p className="text-slate-500">Avoid expensive membrane replacements by catching issues early.</p>
                </div>
                <div>
                   <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                     <Shield strokeWidth={1.5} size={32} />
                   </div>
                   <h3 className="text-xl font-bold text-slate-800 mb-2">Zero Hassle</h3>
                   <p className="text-slate-500">We track your filter timings and proactively call you when service is due.</p>
                </div>
             </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
