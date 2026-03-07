'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search, Filter, Loader2, Package, MoreVertical, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p._id !== id));
        setDeleteId(null);
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Products Catalog</h2>
          <p className="text-slate-500 font-medium">Manage your inventory, prices, and product details.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 flex items-center gap-2 transition shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Plus size={20} /> Add New Product
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="premium-card p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search products by name..." 
            className="admin-input w-full pl-12 py-3 rounded-xl border-none bg-slate-50 text-sm font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none md:w-48">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select 
              className="admin-input w-full pl-12 py-3 rounded-xl border-none bg-slate-50 text-sm font-bold text-slate-600 appearance-none pr-10"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-5 text-left">Product</th>
                <th className="px-8 py-5 text-left">Category</th>
                <th className="px-8 py-5 text-left">Price</th>
                <th className="px-8 py-5 text-left">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-blue-600 mb-2" size={32} />
                    <p className="text-slate-400 font-bold">Synchronizing catalog...</p>
                  </td>
                </tr>
              ) : filteredProducts.map((product) => (
                <motion.tr 
                  layout
                  key={product._id} 
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                        {product.images?.[0] ? (
                          <img className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" src={product.images[0]} alt="" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-slate-300">
                            <Package size={24} />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-900 leading-tight mb-1">{product.name}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate max-w-[150px]">{product.description || 'No description'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 font-black text-slate-900 text-sm">
                    ₹{product.price.toLocaleString('en-IN')}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-1.5">
                       <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                       <span className="text-xs font-bold text-slate-600">Active</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right space-x-2">
                    <Link 
                      href={`/admin/products/${product._id}`}
                      className="inline-flex p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    >
                      <Edit size={18} />
                    </Link>
                    <button 
                      onClick={() => setDeleteId(product._id)}
                      className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
              {!loading && filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-500">
                    <div className="mb-4 text-slate-200 flex justify-center"><Search size={48} /></div>
                    <p className="font-bold text-lg">No matching products found.</p>
                    <p className="text-sm opacity-60">Try adjusting your filters or search query.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteId(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-3xl text-center"
            >
              <div className="h-16 w-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Permanent Deletion?</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                This action cannot be undone. All data related to this product will be removed from the system.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setDeleteId(null)}
                  className="px-6 py-3 rounded-2xl font-bold text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleDelete(deleteId)}
                  className="px-6 py-3 rounded-2xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 transition shadow-lg shadow-red-500/20"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
