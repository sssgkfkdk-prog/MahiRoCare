import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import * as motion from 'framer-motion/client';
import PremiumWaterDrop from '@/components/PremiumWaterDrop';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50" suppressHydrationWarning>
      <Navbar />

      <main className="flex-1 overflow-hidden">
        {/* Her Section - Upgraded with High-End 3D */}
        <section className="relative bg-slate-900 overflow-hidden h-[90vh] min-h-[600px] flex items-center">
          {/* Subtle dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 z-0"></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>

          {/* Abstract Custom 3D Component */}
          <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 flex items-center justify-center lg:justify-end pr-0 lg:pr-10 z-0 opacity-80 mt-20 lg:mt-0">
            <PremiumWaterDrop />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center w-full">
            <motion.div
              className="lg:w-1/2 mb-12 lg:mb-0 backdrop-blur-sm bg-slate-900/30 p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div className="inline-block px-4 py-2 border border-blue-400/30 rounded-full bg-blue-500/10 text-blue-300 font-medium text-sm mb-6 tracking-wider shadow-inner">
                NEXT-GENERATION PURIFICATION
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Pure Water. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Perfect Clarity.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-lg leading-relaxed font-light">
                Experience the pinnacle of water purification. Our premium domestic and commercial RO systems deliver 100% safe, mineral-balanced water to your home and office.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Link href="/products" className="group relative overflow-hidden bg-white text-slate-900 font-bold py-4 px-8 rounded-xl text-center transition-all shadow-xl hover:shadow-cyan-500/20">
                  <span className="relative z-10 transition-colors group-hover:text-blue-700">Explore Collection</span>
                </Link>
                <Link href="/services" className="bg-transparent text-white font-bold py-4 px-8 rounded-xl text-center border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all shadow-lg backdrop-blur-md">
                  Book Enterprise Service
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-slate-50 relative border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Why Choose Mahi RO Care?</h2>
              <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg">We provide comprehensive water purification solutions with unmatched quality and support.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <motion.div
                className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center hover:shadow-lg transition-shadow bg-gradient-to-b from-white to-slate-50"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-20 w-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-inner">💧</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Premium Quality</h3>
                <p className="text-slate-500 leading-relaxed">Industry-leading RO systems equipped with advanced filtration technology for 100% safe water.</p>
              </motion.div>

              <motion.div
                className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center hover:shadow-lg transition-shadow bg-gradient-to-b from-white to-slate-50"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-20 w-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-inner">🔧</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Expert Service</h3>
                <p className="text-slate-500 leading-relaxed">Fast and reliable installation, repair, and AMC services by certified technicians.</p>
              </motion.div>

              <motion.div
                className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center hover:shadow-lg transition-shadow bg-gradient-to-b from-white to-slate-50"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-20 w-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-inner">🏢</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Enterprise Solutions</h3>
                <p className="text-slate-500 leading-relaxed">Scalable commercial RO plants for offices, restaurants, and industrial buildings.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Need Immediate RO Service?</h2>
            <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">Our expert technicians are just a click away. Book a service online and we&apos;ll be at your doorstep within 24 hours.</p>
            <Link href="/services" className="bg-blue-600 text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-blue-700 transition shadow-lg inline-block">
              Schedule a Visit
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
