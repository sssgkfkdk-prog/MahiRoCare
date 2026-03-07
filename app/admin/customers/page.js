import dbConnect from '@/lib/mongoose';
import User from '@/lib/models/User';

export default async function AdminCustomersPage() {
  await dbConnect();
  const customers = await User.find({ role: 'customer' }).sort({ createdAt: -1 });

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Customer Management</h2>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Joined Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {customers.map((customer) => (
              <tr key={customer._id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                      {customer.name ? customer.name.charAt(0).toUpperCase() : customer.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-sm font-medium text-slate-900">{customer.name || 'User'}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {customer.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
