import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 mt-10 border border-slate-100">
           <h1 className="text-4xl font-bold text-slate-800 mb-6">About Mahi RO Care</h1>
           <p className="text-lg text-slate-600 mb-6 leading-relaxed">
             At Mahi RO Care, we believe that access to pure, safe drinking water is a fundamental right. 
             Founded with a vision to provide the most reliable water purification solutions, we have grown into 
             a trusted name for both domestic and commercial RO systems across the region.
           </p>
           <p className="text-lg text-slate-600 mb-6 leading-relaxed">
             Our team of certified technicians specializes in the installation, maintenance, and repair of 
             all types of water purifiers. We don't just fix machines; we ensure the health and safety of 
             your family and employees by keeping your water systems in peak condition.
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-slate-100">
             <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Our Mission</h3>
                <p className="text-slate-600">To deliver uninterrupted access to crystal clear, healthy water through premium service and cutting-edge technology.</p>
             </div>
             <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Our Promise</h3>
                <p className="text-slate-600">Transparent pricing, punctual service visits, and 100% genuine spare parts guaranteed every single time.</p>
             </div>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
