import dbConnect from '@/lib/mongoose';
import Product from '@/lib/models/Product';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default async function AdminProductsPage() {
  await dbConnect();
  const products = await Product.find().sort({ createdAt: -1 });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Products Management</h2>
        <Link 
          href="/admin/products/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition"
        >
          <Plus size={20} /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {product.images?.[0] ? (
                      <img className="h-10 w-10 rounded-md object-cover mr-3" src={product.images[0]} alt="" />
                    ) : (
                      <div className="h-10 w-10 rounded-md bg-slate-200 mr-3 flex items-center justify-center text-slate-400">
                        No Img
                      </div>
                    )}
                    <div className="text-sm font-medium text-slate-900">{product.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  ₹{product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4"><Edit size={18} /></button>
                  <button className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  No products found. Add your first product.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
