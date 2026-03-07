import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongoose';
import Order from '@/lib/models/Order';
import ServiceInquiry from '@/lib/models/ServiceInquiry';
import Product from '@/lib/models/Product';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Package, Wrench, Calendar, Watch, CheckCircle, Clock } from 'lucide-react';

// Helper component for status badges
const StatusBadge = ({ status }) => {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    processing: 'bg-blue-100 text-blue-800 border-blue-200',
    shipped: 'bg-purple-100 text-purple-800 border-purple-200',
    delivered: 'bg-green-100 text-green-800 border-green-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    scheduled: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  };

  const style = styles[status] || styles.pending;

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${style}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  // Admin users have their own portal
  if (session.user.role === 'admin') {
    redirect('/admin');
  }

  await dbConnect();

  // Fetch Orders
  const orders = await Order.find({ user: session.user.id })
    .populate({
      path: 'items.product',
      model: Product,
      select: 'name image price'
    })
    .sort({ createdAt: -1 })
    .lean();

  // Fetch Services using email (since users might book before making an account or via form)
  const services = await ServiceInquiry.find({ email: session.user.email })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome back, {session.user.name || session.user.email.split('@')[0]}!</h1>
          <p className="text-slate-500">Track your recent product orders and service bookings here.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Recent Product Orders */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <Package size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">My Orders</h2>
              </div>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
                {orders.length}
              </span>
            </div>

            <div className="p-6">
              {orders.length === 0 ? (
                <div className="text-center py-10">
                  <Package className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                  <h3 className="text-lg font-medium text-slate-900 mb-1">No orders yet</h3>
                  <p className="text-slate-500 mb-4 text-sm">When you buy RO machines or filters, they'll show up here.</p>
                  <Link href="/products" className="text-blue-600 font-medium hover:underline text-sm">Browse Products</Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order._id.toString()} className="border border-slate-100 rounded-xl p-5 hover:border-blue-200 transition bg-slate-50/50">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Order #{order._id.toString().slice(-8).toUpperCase()}</p>
                          <p className="text-sm font-medium text-slate-800">
                            {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                        <StatusBadge status={order.status} />
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="h-12 w-12 bg-white rounded border border-slate-200 flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                              {item.product?.image ? (
                                <img src={item.product.image} alt={item.product.name} className="object-cover w-full h-full" />
                              ) : (
                                <Package className="h-6 w-6 text-slate-300" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-800 line-clamp-1">{item.product?.name || 'Unknown Product'}</p>
                              <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-bold text-slate-800">₹{(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                        <span className="text-sm text-slate-600">Total Amount</span>
                        <span className="text-lg font-bold text-blue-600">₹{order.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Recent Service Bookings */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-100 p-2 rounded-lg text-cyan-600">
                  <Wrench size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Service & AMC Bookings</h2>
              </div>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
                {services.length}
              </span>
            </div>

            <div className="p-6">
              {services.length === 0 ? (
                <div className="text-center py-10">
                  <Wrench className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                  <h3 className="text-lg font-medium text-slate-900 mb-1">No services booked</h3>
                  <p className="text-slate-500 mb-4 text-sm">Need a checkup, installation, or repair?</p>
                  <Link href="/services" className="text-blue-600 font-medium hover:underline text-sm">Book a Service</Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {services.map((svc) => (
                    <div key={svc._id.toString()} className="border border-slate-100 rounded-xl p-5 hover:border-cyan-200 transition bg-slate-50/50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                           <Watch size={12} /> {svc.serviceType} RO
                        </div>
                        <StatusBadge status={svc.status} />
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-base font-bold text-slate-800 mb-1">Service Request</h4>
                        <p className="text-sm text-slate-600">{svc.issueDescription || 'Routine checkup / installation'}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                        <div>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mb-1"><Calendar size={12} /> Requested Date</p>
                          <p className="text-sm font-medium text-slate-800">
                            {svc.preferredDate ? new Date(svc.preferredDate).toLocaleDateString() : 'ASAP'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mb-1"><Clock size={12} /> Booking Created</p>
                          <p className="text-sm font-medium text-slate-800">
                            {new Date(svc.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
