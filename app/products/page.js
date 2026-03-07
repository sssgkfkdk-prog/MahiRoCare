'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingCart, Shield, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/components/CartProvider';

export default function ProductsPage() {
  const plans = [
    {
      name: 'Basic Care',
      price: 1999,
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
      price: 3499,
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

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Our Product Catalog</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">Explore our range of premium RO water purifiers and genuine spare parts designed for health and longevity.</p>
          </div>

          {loading ? (
             <div className="text-center py-20"><p>Loading products...</p></div>
          ) : (
            <>
              {/* Domestic RO Section */}
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-8 w-2 bg-blue-600 rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Domestic RO Systems</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.filter(p => !p.category?.toLowerCase().includes('commercial')).map(product => (
                    <div key={product._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition flex flex-col">
                      <div className="h-64 bg-slate-100 flex items-center justify-center p-4 relative">
                        {product.category && (
                          <span className="absolute top-4 left-4 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                            {product.category}
                          </span>
                        )}
                        {product.images?.[0] ? (
                           <img src={product.images[0]} alt={product.name} className="max-h-full object-contain mix-blend-multiply" />
                        ) : (
                           <span className="text-slate-400">No Image Available</span>
                        )}
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{product.name}</h3>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
                        
                        {product.features?.length > 0 && (
                          <ul className="mb-6 space-y-1">
                            {product.features.slice(0, 3).map((f, i) => (
                              <li key={i} className="text-xs text-slate-500 flex items-center">
                                <span className="text-blue-500 mr-2">✓</span> {f}
                              </li>
                            ))}
                          </ul>
                        )}
                        
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                          <span className="text-2xl font-bold text-blue-900">₹{product.price.toLocaleString('en-IN')}</span>
                          <button 
                            onClick={() => addToCart(product)}
                            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                          >
                            <ShoppingCart size={18} />
                            <span className="text-sm font-medium pr-2">Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {!loading && products.filter(p => !p.category?.toLowerCase().includes('commercial')).length === 0 && (
                    <div className="col-span-full text-center py-10 bg-white border dashed border-slate-300 rounded-xl">
                      <p className="text-slate-500">No domestic products found.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Commercial RO Section */}
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-8 w-2 bg-cyan-600 rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Commercial RO Plants</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.filter(p => p.category?.toLowerCase().includes('commercial')).map(product => (
                    <div key={product._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition flex flex-col">
                      <div className="h-64 bg-slate-100 flex items-center justify-center p-4 relative">
                        {product.category && (
                          <span className="absolute top-4 left-4 bg-cyan-100 text-cyan-800 text-xs font-bold px-3 py-1 rounded-full">
                            {product.category}
                          </span>
                        )}
                        {product.images?.[0] ? (
                           <img src={product.images[0]} alt={product.name} className="max-h-full object-contain mix-blend-multiply" />
                        ) : (
                           <span className="text-slate-400">No Image Available</span>
                        )}
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{product.name}</h3>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
                        
                        {product.features?.length > 0 && (
                          <ul className="mb-6 space-y-1">
                            {product.features.slice(0, 3).map((f, i) => (
                              <li key={i} className="text-xs text-slate-500 flex items-center">
                                <span className="text-cyan-500 mr-2">✓</span> {f}
                              </li>
                            ))}
                          </ul>
                        )}
                        
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                          <span className="text-2xl font-bold text-cyan-900">₹{product.price.toLocaleString('en-IN')}</span>
                          <button 
                            onClick={() => addToCart(product)}
                            className="bg-cyan-600 text-white p-2 rounded-lg hover:bg-cyan-700 transition flex items-center justify-center gap-2"
                          >
                            <ShoppingCart size={18} />
                            <span className="text-sm font-medium pr-2">Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {!loading && products.filter(p => p.category?.toLowerCase().includes('commercial')).length === 0 && (
                    <div className="col-span-full text-center py-10 bg-white border dashed border-slate-300 rounded-xl">
                      <p className="text-slate-500">No commercial products found.</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {/* AMC Plans Section */}
          <div className="mt-24 mb-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-blue-500/30 rounded-full bg-blue-500/10 text-blue-800 font-medium text-sm">
                <Shield size={16} /> Verified Protection
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Annual Maintenance Contracts</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Secure the lifespan of your water purifier with our hassle-free AMC packages.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
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
                        {plan.price !== 'Custom' ? `₹${plan.price.toLocaleString('en-IN')}` : 'Custom'}
                      </span>
                      <span className="text-slate-500 font-medium ml-2">{plan.duration}</span>
                    </div>
                    {plan.price !== 'Custom' ? (
                      <button 
                        onClick={() => addToCart({
                          _id: `amc_${plan.name.toLowerCase().replace(' ', '_')}`,
                          name: plan.name + ' AMC Plan',
                          price: plan.price,
                          category: 'AMC',
                          images: [],
                          description: plan.description
                        })}
                        className={`block w-full text-center py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
                          plan.popular 
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' 
                            : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                        }`}
                      >
                        <ShoppingCart size={18} /> Add to Cart
                      </button>
                    ) : (
                      <Link 
                        href="/contact" 
                        className="block w-full text-center py-3 rounded-xl font-bold transition bg-slate-100 text-slate-800 hover:bg-slate-200"
                      >
                        Contact Us
                      </Link>
                    )}
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
