'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, X } from 'lucide-react';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFiles = (files) => {
    // Process each file to a base64 string for simplicity
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImages(prev => [...prev, e.target.result]);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSubmit = {
        ...formData,
        price: Number(formData.price),
        features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
        images: images
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit)
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        alert('Failed to create product');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Add New Product</h2>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Product Name</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="e.g. Aqua Grand Plus"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Price (₹)</label>
            <input 
              required
              type="number" 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="e.g. 15000"
              value={formData.price}
              onChange={e => setFormData({...formData, price: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Category</label>
            <select 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-white"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option>Domestic RO</option>
              <option>Commercial RO</option>
              <option>Spare Parts</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Key Features (comma separated)</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="e.g. UV+UF, 12L capacity"
              value={formData.features}
              onChange={e => setFormData({...formData, features: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Description</label>
          <textarea 
            required
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            placeholder="Detailed product description..."
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          ></textarea>
        </div>

        {/* Drag and Drop Zone */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Product Images</label>
          <div 
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors
              ${dragActive ? 'border-blue-600 bg-blue-50' : 'border-slate-300 hover:border-blue-400 bg-slate-50'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
            <div className="flex flex-col items-center justify-center space-y-3 cursor-pointer">
              <UploadCloud size={48} className="text-slate-400" />
              <p className="text-slate-600 font-medium">Drag & Drop images here</p>
              <p className="text-slate-400 text-sm">or click to browse files</p>
            </div>
          </div>
          
          {/* Image Previews */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {images.map((img, i) => (
                <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border shadow-sm group">
                  <img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 border-t">
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Product...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
