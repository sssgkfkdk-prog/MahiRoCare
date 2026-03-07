'use client';

import { useState, useEffect, useRef, use } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, X, ArrowLeft, Loader2, Save, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function EditProductPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Domestic RO',
    features: ''
  });
  const [images, setImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products/${id}`);
        if (res.ok) {
          const product = await res.json();
          setFormData({
            name: product.name,
            description: product.description || '',
            price: product.price,
            category: product.category,
            features: (product.features || []).join(', ')
          });
          setImages(product.images || []);
        } else {
          router.push('/admin/products');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, router]);

  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const processFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setImages(prev => [...prev, e.target.result]);
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) processFiles(e.dataTransfer.files);
  };

  const handleChange = function(e) {
    if (e.target.files && e.target.files[0]) processFiles(e.target.files);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const dataToSubmit = {
        ...formData,
        price: Number(formData.price),
        features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
        images: images
      };

      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit)
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        alert('Failed to update product');
      }
    } catch (error) {
       alert('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-blue-600" size={48} />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <Link href="/admin/products" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition">
          <ArrowLeft size={18} /> Back to Products
        </Link>
        <div className="flex gap-3">
          <button 
            type="button" 
            onClick={() => router.push('/admin/products')}
            className="px-6 py-2.5 rounded-2xl font-bold text-sm text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button 
            onClick={onSubmit}
            disabled={saving}
            className="px-8 py-2.5 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 disabled:opacity-70 flex items-center gap-2"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="premium-card p-8 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Product Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="admin-label">Product Name</label>
                <input 
                  required
                  type="text" 
                  className="admin-input w-full px-5 py-3 rounded-2xl bg-slate-50 border-none text-sm font-medium"
                  placeholder="e.g. Aqua Professional Elite"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Base Price (₹)</label>
                  <input 
                    required
                    type="number" 
                    className="admin-input w-full px-5 py-3 rounded-2xl bg-slate-50 border-none text-sm font-medium"
                    placeholder="9999"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div>
                  <label className="admin-label">Product Category</label>
                  <select 
                    className="admin-input w-full px-5 py-3 rounded-2xl bg-slate-50 border-none text-sm font-bold text-slate-600 appearance-none"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option>Domestic RO</option>
                    <option>Commercial RO</option>
                    <option>Spare Parts</option>
                    <option>AMC</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="admin-label">Key Features (Separate by comma)</label>
                <input 
                  type="text" 
                  className="admin-input w-full px-5 py-3 rounded-2xl bg-slate-50 border-none text-sm font-medium"
                  placeholder="e.g. UV+UF, 12L Tank, Smart Filter"
                  value={formData.features}
                  onChange={e => setFormData({...formData, features: e.target.value})}
                />
              </div>

              <div>
                <label className="admin-label">Detailed Description</label>
                <textarea 
                  required
                  rows="6"
                  className="admin-input w-full px-5 py-3 rounded-2xl bg-slate-50 border-none text-sm font-medium resize-none"
                  placeholder="Tell the story of this product..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="premium-card p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 font-primary">Gallery</h3>
            
            <div 
              className={`relative border-2 border-dashed rounded-3xl p-10 text-center transition-all group
                ${dragActive ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-blue-400 bg-slate-50/50'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleChange} />
              <div className="flex flex-col items-center justify-center space-y-2 cursor-pointer">
                <div className="h-12 w-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                   <UploadCloud size={24} />
                </div>
                <p className="text-slate-900 font-bold text-sm">Upload Photos</p>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">PNG, JPG up to 10MB</p>
              </div>
            </div>
            
            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-8">
                {images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-100 shadow-sm group">
                    <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button 
                      type="button"
                      onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-red-600 rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition shadow-sm hover:bg-red-500 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="premium-card p-6 bg-slate-900 text-white">
            <h4 className="font-bold flex items-center gap-2 mb-2"><Trash2 size={16} className="text-red-500" /> Danger Zone</h4>
            <p className="text-xs text-slate-400 mb-4 font-medium">Permanently delete this product from your storefront. This cannot be undone.</p>
            <button className="w-full py-3 bg-red-600/10 text-red-500 border border-red-500/20 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition">
               Delete Permanently
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
