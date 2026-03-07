import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNotificationManager from '@/components/AdminNotificationManager';

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar Component */}
      <AdminSidebar user={session.user} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
              <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Mahi RO Admin</h2>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="hidden md:flex flex-col text-right">
                 <span className="text-sm font-black text-slate-900 leading-tight">{session.user.name || 'Admin User'}</span>
                 <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Master Access</span>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/20">
                 {session.user.name?.charAt(0) || 'A'}
              </div>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Global Admin Notifications with Sound */}
      <AdminNotificationManager />
    </div>
  );
}
