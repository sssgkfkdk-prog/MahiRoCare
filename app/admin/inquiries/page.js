import dbConnect from '@/lib/mongoose';
import ServiceInquiry from '@/lib/models/ServiceInquiry';
import { Wrench, Calendar, Phone, MapPin, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default async function AdminInquiriesPage() {
  await dbConnect();
  const inquiries = await ServiceInquiry.find().sort({ createdAt: -1 });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'scheduled': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={14} />;
      case 'scheduled': return <Clock size={14} />;
      case 'cancelled': return <AlertCircle size={14} />;
      default: return <Clock size={14} />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Service Enquiries</h2>
          <p className="text-slate-500 mt-1">Manage all RO service bookings and maintenance requests.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {inquiries.map((inquiry) => (
          <div key={inquiry._id} className="premium-card p-6 flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl flex-shrink-0">
              <Wrench size={32} />
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{inquiry.name}</h3>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border mt-2 uppercase tracking-wider ${getStatusColor(inquiry.status)}`}>
                    {getStatusIcon(inquiry.status)} {inquiry.status}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <Phone size={14} /> {inquiry.phone}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Service Details</p>
                <p className="text-slate-800 font-medium capitalize">{inquiry.serviceType} RO Service</p>
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <Calendar size={14} /> {inquiry.preferredDate ? new Date(inquiry.preferredDate).toLocaleDateString() : 'Not set'}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location</p>
                <div className="flex items-start gap-2 text-slate-600 text-sm">
                  <MapPin size={14} className="mt-1 flex-shrink-0" />
                  <span>{inquiry.address}</span>
                </div>
              </div>
            </div>

            <div className="flex md:flex-col gap-2 w-full md:w-auto self-stretch justify-center">
               <button className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition">Update Status</button>
               <button className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition">Details</button>
            </div>
          </div>
        ))}

        {inquiries.length === 0 && (
          <div className="premium-card p-12 text-center">
            <Wrench size={48} className="text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 font-medium text-lg">No service enquiries found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
