import dbConnect from '@/lib/mongoose';
import Order from '@/lib/models/Order';
import Product from '@/lib/models/Product';
import ServiceInquiry from '@/lib/models/ServiceInquiry';
import { Package, ShoppingCart, Users, Wrench } from 'lucide-react';
import PushNotificationManager from '@/components/PushNotificationManager';

export default async function AdminDashboard() {
  await dbConnect();
  
  const orderCount = await Order.countDocuments();
  const productCount = await Product.countDocuments();
  const inquiryCount = await ServiceInquiry.countDocuments();

  const stats = [
    { label: 'Total Orders', value: orderCount, icon: ShoppingCart },
    { label: 'Total Products', value: productCount, icon: Package },
    { label: 'Service Inquiries', value: inquiryCount, icon: Wrench },
    { label: 'Total Customers', value: '-', icon: Users }, // Placeholder
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Dashboard Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">{stat.value}</p>
              </div>
              <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Native Push Registration Manager */}
      <PushNotificationManager />
    </div>
  );
}
