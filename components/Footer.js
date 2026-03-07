import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white tracking-tight">Mahi <span className="text-blue-400">RO Care</span></span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Your trusted partner for domestic and commercial RO water purification systems. We provide top-quality products and reliable services.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-slate-400 hover:text-white transition">About Us</Link></li>
              <li><Link href="/products" className="text-slate-400 hover:text-white transition">Products</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-white transition">Book Service</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-slate-400 hover:text-white transition">Domestic RO Repair</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-white transition">Commercial RO Installation</Link></li>
              <li><Link href="/amc" className="text-slate-400 hover:text-white transition">AMC Plans</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-white transition">Filter Replacement</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Contact</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>123 Waterway Plaza, Main Tech Hub, City - 110001</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✉️</span>
                <span>support@mahi-ro-care.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Mahi RO Care. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
