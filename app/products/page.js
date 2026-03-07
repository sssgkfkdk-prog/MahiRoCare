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
             <div className="text-center py-20"><p className="text-slate-500 font-medium animate-pulse">Loading products...</p></div>
          ) : (
            <>
            <div className="flex flex-col lg:flex-row gap-12 relative w-full items-start">
              
              {/* Products Container */}
              <div className="w-full lg:w-[65%] 2xl:w-[70%]">
                {/* Domestic RO Section */}
                <div className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-8 w-2 bg-blue-600 rounded-full"></div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Domestic RO Systems</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6 sm:gap-8">
                    {products.filter(p => !p.category?.toLowerCase().includes('commercial')).map(product => (
                      <div key={product._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition flex flex-col h-full">
                        <div className="h-48 sm:h-56 bg-slate-100 flex items-center justify-center p-4 relative shrink-0">
                          {product.category && (
                            <span className="absolute top-4 left-4 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm">
                              {product.category}
                            </span>
                          )}
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt={product.name} className="h-full w-full object-contain mix-blend-multiply transition-transform hover:scale-105" />
                          ) : (
                            <span className="text-slate-400 font-medium text-sm">No Image</span>
                          )}
                        </div>
                        
                        <div className="p-5 sm:p-6 flex flex-col flex-grow">
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 leading-tight">{product.name}</h3>
                          <p className="text-slate-600 text-xs sm:text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">{product.description}</p>
                          
                          {product.features?.length > 0 && (
                            <ul className="mb-6 space-y-1.5 min-h-[4.5rem]">
                              {product.features.slice(0, 3).map((f, i) => (
                                <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                                  <span className="text-blue-500 font-bold shrink-0 mt-0.5">✓</span> 
                                  <span className="leading-tight">{f}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                            <span className="text-xl sm:text-2xl font-bold text-blue-900 tracking-tight">₹{product.price.toLocaleString('en-IN')}</span>
                            <button 
                              onClick={() => addToCart(product)}
                              className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 sm:px-4 sm:py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-blue-600/20 active:scale-95 group"
                              aria-label="Add to cart"
                            >
                              <ShoppingCart size={18} className="transition-transform group-hover:-rotate-12" />
                              <span className="text-sm font-semibold hidden sm:inline-block">Add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {!loading && products.filter(p => !p.category?.toLowerCase().includes('commercial')).length === 0 && (
                      <div className="col-span-full text-center py-12 bg-white border-2 dashed border-slate-200 rounded-2xl">
                        <p className="text-slate-500 font-medium">No domestic products found.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Commercial RO Section */}
                <div className="mb-12 xl:mb-0">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-8 w-2 bg-cyan-600 rounded-full"></div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Commercial RO Plants</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6 sm:gap-8">
                    {products.filter(p => p.category?.toLowerCase().includes('commercial')).map(product => (
                      <div key={product._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition flex flex-col h-full">
                        <div className="h-48 sm:h-56 bg-slate-100 flex items-center justify-center p-4 relative shrink-0">
                          {product.category && (
                            <span className="absolute top-4 left-4 bg-cyan-100 text-cyan-800 text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm">
                              {product.category}
                            </span>
                          )}
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt={product.name} className="h-full w-full object-contain mix-blend-multiply transition-transform hover:scale-105" />
                          ) : (
                            <span className="text-slate-400 font-medium text-sm">No Image</span>
                          )}
                        </div>
                        
                        <div className="p-5 sm:p-6 flex flex-col flex-grow">
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 leading-tight">{product.name}</h3>
                          <p className="text-slate-600 text-xs sm:text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">{product.description}</p>
                          
                          {product.features?.length > 0 && (
                            <ul className="mb-6 space-y-1.5 min-h-[4.5rem]">
                              {product.features.slice(0, 3).map((f, i) => (
                                <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                                  <span className="text-cyan-500 font-bold shrink-0 mt-0.5">✓</span> 
                                  <span className="leading-tight">{f}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                            <span className="text-xl sm:text-2xl font-bold text-cyan-900 tracking-tight">₹{product.price.toLocaleString('en-IN')}</span>
                            <button 
                              onClick={() => addToCart(product)}
                              className="bg-cyan-600 hover:bg-cyan-700 text-white p-2.5 sm:px-4 sm:py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-cyan-600/20 active:scale-95 group"
                              aria-label="Add to cart"
                            >
                              <ShoppingCart size={18} className="transition-transform group-hover:-rotate-12" />
                              <span className="text-sm font-semibold hidden sm:inline-block">Add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {!loading && products.filter(p => p.category?.toLowerCase().includes('commercial')).length === 0 && (
                      <div className="col-span-full text-center py-12 bg-white border-2 dashed border-slate-200 rounded-2xl">
                        <p className="text-slate-500 font-medium">No commercial products found.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sticky AMC Section Sidebar */}
              <div className="w-full lg:w-[35%] 2xl:w-[30%] lg:sticky lg:top-24 pb-12">
                <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl h-full">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-cyan-400/30 rounded-full bg-cyan-400/10 text-cyan-300 font-semibold text-xs tracking-wider uppercase self-start">
                      <Shield size={14} className="text-cyan-400" /> AMC Protection
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight text-white">
                      Never Worry About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Maintenance</span> Again
                    </h2>
                    <p className="text-slate-300 text-sm mb-10 leading-relaxed">
                      Secure the lifespan of your water purifier with our hassle-free Annual Maintenance Contracts. Expert care, zero unexpected costs.
                    </p>

                    <div className="space-y-6 flex-grow">
                      {plans.map((plan, index) => (
                        <div 
                          key={index} 
                          className={`bg-slate-800/80 backdrop-blur-sm rounded-2xl flex flex-col border transition-all duration-300 hover:bg-slate-800 ${
                            plan.popular ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-slate-700 hover:border-slate-600'
                          }`}
                        >
                          {plan.popular && (
                            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-center py-1.5 text-xs font-bold uppercase tracking-widest rounded-t-xl w-full">
                              Most Popular Recommended
                            </div>
                          )}
                          <div className="p-5 sm:p-6 pb-2">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg sm:text-xl font-bold text-white">{plan.name}</h3>
                              <div className="text-right">
                                <span className="text-xl sm:text-2xl font-black text-white block leading-none">
                                  {plan.price !== 'Custom' ? `₹${plan.price.toLocaleString('en-IN')}` : 'Custom'}
                                </span>
                                {plan.price !== 'Custom' && <span className="text-slate-400 font-medium text-xs">/ {plan.duration.split(' ')[1]}</span>}
                              </div>
                            </div>
                            <p className="text-slate-400 text-xs sm:text-sm mb-5 leading-relaxed">{plan.description}</p>
                            
                            <ul className="space-y-2 mb-6">
                              {plan.features.slice(0, 3).map((feature, i) => (
                                <li key={i} className="flex flex-start gap-2.5 items-start">
                                  <CheckCircle className="text-cyan-400 flex-shrink-0 mt-0.5" size={14} />
                                  <span className="text-slate-300 text-xs leading-snug">{feature}</span>
                                </li>
                              ))}
                              {plan.features.length > 3 && (
                                <li className="text-slate-500 text-xs font-medium pl-6 pt-1">
                                  + {plan.features.length - 3} more benefits
                                </li>
                              )}
                            </ul>
                            
                            <div className="mt-auto">
                              {plan.price !== 'Custom' ? (
                                <button 
                                  onClick={() => addToCart({
                                    _id: `amc_${plan.name.toLowerCase().replace(' ', '_')}`,
                                    name: plan.name + ' AMC Plan',
                                    price: typeof plan.price === 'number' ? plan.price : 1999,
                                    category: 'AMC',
                                    images: [],
                                    description: plan.description
                                  })}
                                  className={`w-full py-3 sm:py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                                    plan.popular 
                                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 shadow-lg shadow-blue-500/25 active:scale-[0.98]' 
                                      : 'bg-white text-slate-900 hover:bg-slate-100 active:scale-[0.98]'
                                  }`}
                                >
                                  <ShoppingCart size={16} /> Add to Order
                                </button>
                              ) : (
                                <Link 
                                  href="/contact" 
                                  className="w-full py-3 sm:py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center border-2 border-slate-600 bg-transparent text-white hover:bg-slate-800 hover:border-slate-500 active:scale-[0.98]"
                                >
                                  Get Custom Quote
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
          )}
          {/* Main Container End */}
          </div>
      </main>

      <Footer />
    </div>
  );
}
