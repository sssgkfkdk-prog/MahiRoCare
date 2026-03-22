'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as motion from 'framer-motion/client';
import Image from 'next/image';

export default function CartPage() {
  const { cart, cartTotal, cartCount, removeFromCart, updateQuantity, clearCart, isMounted } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [shippingDetails, setShippingDetails] = useState({
    name: '', email: '', phone: '', address: ''
  });

  const platformFee = cartTotal > 0 ? cartTotal * 0.006 : 0;
  const gst = cartTotal > 0 ? 9 : 0;
  const finalTotal = cartTotal + platformFee + gst;

  const handleCheckout = async () => {
    if (!shippingDetails.name || !shippingDetails.email || !shippingDetails.phone || !shippingDetails.address) {
      alert("Please fill all shipping details.");
      return;
    }

    setLoading(true);

    try {
      // 1. Create order on server to get Razorpay Order ID
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, amount: finalTotal, userEmail: shippingDetails.email })
      });

      const orderData = await res.json();

      if (!res.ok) throw new Error(orderData.error);

      // 2. Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'your_razorpay_key_id_here', // Public key
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Mahi RO Care',
        description: 'Store Purchase',
        order_id: orderData.id,
        handler: async function (response) {
          // 3. Verify Payment
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              items: cart,
              amount: cartTotal,
              user: shippingDetails
            })
          });

          if (verifyRes.ok) {
            clearCart();
            alert('Payment Successful! Your order has been placed.');
            router.push('/products');
          } else {
            alert('Payment verification failed.');
          }
        },
        prefill: {
          name: shippingDetails.name,
          email: shippingDetails.email,
          contact: shippingDetails.phone
        },
        theme: {
          color: '#2563eb'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error(error);
      alert('Error initiating checkout.');
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">Shopping Cart</h1>

          {cart.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-slate-400 mb-4 flex justify-center"><ShoppingCart size={64} /></div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
              <p className="text-slate-500 mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
              <Link href="/products" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cart.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6 hover:shadow-xl hover:border-blue-200 transition-all group relative"
                  >
                    <div className="h-28 w-28 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100 p-2 relative">
                      {item.images?.[0] ? (
                        <Image src={item.images[0]} alt={item.name} fill className="object-contain mix-blend-multiply transition-transform hover:scale-105" unoptimized />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-slate-300 text-xs text-center font-medium">No Image</div>
                      )}
                    </div>
                    <div className="flex-1 text-center sm:text-left w-full">
                      <h3 className="text-lg font-bold text-slate-800 mb-1">{item.name}</h3>
                      <p className="text-slate-500 text-sm mb-3 font-medium bg-slate-100 inline-block px-3 py-1 rounded-full">{item.category}</p>
                      <div className="text-xl font-extrabold text-blue-700">₹{item.price.toLocaleString('en-IN')}</div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto mt-4 sm:mt-0 gap-6">
                      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1 shadow-inner">
                        <button onClick={() => updateQuantity(item._id, -1)} className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-slate-600 transition-all"><Minus size={18} strokeWidth={2.5} /></button>
                        <span className="w-12 text-center font-bold text-slate-800">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, 1)} className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-slate-600 transition-all"><Plus size={18} strokeWidth={2.5} /></button>
                      </div>
                      <button onClick={() => removeFromCart(item._id)} className="p-2.5 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors sm:absolute sm:top-4 sm:right-4" title="Remove item">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Checkout Summary */}
              <div className="space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md sticky top-6">
                  <h3 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
                    Order Summary
                  </h3>

                  <div className="space-y-4 mb-6 pb-6 border-b border-slate-100">
                    <div className="flex justify-between text-slate-600 font-medium tracking-wide text-sm">
                      <span>Subtotal ({cartCount} items)</span>
                      <span className="text-slate-800">₹{cartTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>
                    {cartTotal > 0 && (
                      <>
                        <div className="flex justify-between text-slate-600 font-medium tracking-wide text-sm">
                          <span>Platform Fee (0.6%)</span>
                          <span className="text-slate-800">₹{platformFee.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between text-slate-600 font-medium tracking-wide text-sm">
                          <span>GST</span>
                          <span className="text-slate-800">₹{gst.toFixed(2)}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between text-slate-600 font-medium tracking-wide text-sm">
                      <span>Shipping Delivery</span>
                      <span className="text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded">FREE</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mb-8">
                    <span className="text-slate-500 font-medium">Total Amount</span>
                    <span className="text-3xl font-black text-blue-700">₹{finalTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Shipping Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">Full Name</label>
                        <input type="text" placeholder="John Doe" required value={shippingDetails.name} onChange={e => setShippingDetails({ ...shippingDetails, name: e.target.value })} className="w-full px-4 py-3 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm bg-slate-50 text-slate-900 font-medium transition-all outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">Email Address</label>
                        <input type="email" placeholder="john@example.com" required value={shippingDetails.email} onChange={e => setShippingDetails({ ...shippingDetails, email: e.target.value })} className="w-full px-4 py-3 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm bg-slate-50 text-slate-900 font-medium transition-all outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">Phone Number</label>
                        <input type="tel" placeholder="+91 9876543210" required value={shippingDetails.phone} onChange={e => setShippingDetails({ ...shippingDetails, phone: e.target.value })} className="w-full px-4 py-3 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm bg-slate-50 text-slate-900 font-medium transition-all outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">Complete Address</label>
                        <textarea placeholder="House No, Street, Landmark, City, State, PIN" required rows={3} value={shippingDetails.address} onChange={e => setShippingDetails({ ...shippingDetails, address: e.target.value })} className="w-full px-4 py-3 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm bg-slate-50 text-slate-900 font-medium transition-all outline-none resize-none"></textarea>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                  >
                    {loading ? 'Processing Secure Payment...' : 'Proceed to Secure Checkout'}
                    {!loading && <ArrowRight size={22} strokeWidth={2.5} />}
                  </button>
                  <div className="mt-5 flex items-center justify-center space-x-2 text-xs text-slate-400 font-medium">
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-400">
                      <path d="M10 5.25V4.08333C10 1.83333 8.35 0 6 0C3.65 0 2 1.83333 2 4.08333V5.25C0.9 5.25 0 6.15 0 7.25V12C0 13.1 0.9 14 2 14H10C11.1 14 12 13.1 12 12V7.25C12 6.15 11.1 5.25 10 5.25ZM6 10.75C5.175 10.75 4.5 10.075 4.5 9.25C4.5 8.425 5.175 7.75 6 7.75C6.825 7.75 7.5 8.425 7.5 9.25C7.5 10.075 6.825 10.75 6 10.75ZM8.5 5.25H3.5V4.08333C3.5 2.68333 4.625 1.55833 6 1.55833C7.375 1.55833 8.5 2.68333 8.5 4.08333V5.25Z" fill="currentColor" />
                    </svg>
                    <span>Payments Secured by <strong className="text-slate-600 tracking-wide ml-0.5">Razorpay</strong></span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
