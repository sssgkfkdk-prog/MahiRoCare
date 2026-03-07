'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/components/CartProvider';

export default function ProductsPage() {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
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
          </div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
              <p className="text-slate-500 text-lg">No products available at the moment.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
