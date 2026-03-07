import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import AdminNotificationManager from '@/components/AdminNotificationManager';

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    redirect('/login'); // Redirect non-admins to login
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b">
            <h1 className="text-xl font-bold text-slate-800">Admin Panel</h1>
          </div>
          <nav className="flex-1 py-4">
            <ul className="space-y-1">
              <li>
                <Link href="/admin" className="block px-6 py-2 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/products" className="block px-6 py-2 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/admin/orders" className="block px-6 py-2 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/admin/inquiries" className="block px-6 py-2 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                  Service Inquiries
                </Link>
              </li>
              <li>
                <Link href="/admin/customers" className="block px-6 py-2 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                  Customers
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Global Admin Notifications */}
      <AdminNotificationManager />
    </div>
  );
}
