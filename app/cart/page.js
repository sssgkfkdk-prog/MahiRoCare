'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart, isMounted } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [shippingDetails, setShippingDetails] = useState({
    name: '', email: '', phone: '', address: ''
  });

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
        body: JSON.stringify({ items: cart, amount: cartTotal, userEmail: shippingDetails.email })
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
              <p className="text-slate-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Link href="/products" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map(item => (
                  <div key={item._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                    <div className="h-24 w-24 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                       {item.images?.[0] ? (
                         <img src={item.images[0]} alt={item.name} className="h-full w-full object-contain mix-blend-multiply p-2" />
                       ) : (
                         <div className="h-full w-full flex items-center justify-center text-slate-400 text-xs text-center">No Image</div>
                       )}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
                      <p className="text-slate-500 text-sm mb-2">{item.category}</p>
                      <span className="text-xl font-bold text-blue-900">₹{item.price.toLocaleString('en-IN')}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-slate-200 rounded-lg">
                        <button onClick={() => updateQuantity(item._id, -1)} className="p-2 hover:bg-slate-50 text-slate-600"><Minus size={16} /></button>
                        <span className="w-10 text-center font-medium text-slate-800">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, 1)} className="p-2 hover:bg-slate-50 text-slate-600"><Plus size={16} /></button>
                      </div>
                      <button onClick={() => removeFromCart(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout Summary */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal ({cart.length} items)</span>
                      <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xl font-bold text-slate-800 mb-8">
                    <span>Total Amount</span>
                    <span className="text-blue-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-4">Shipping Details</h3>
                  <div className="space-y-4 mb-8">
                    <input type="text" placeholder="Full Name *" required value={shippingDetails.name} onChange={e => setShippingDetails({...shippingDetails, name: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50" />
                    <input type="email" placeholder="Email Address *" required value={shippingDetails.email} onChange={e => setShippingDetails({...shippingDetails, email: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50" />
                    <input type="tel" placeholder="Phone Number *" required value={shippingDetails.phone} onChange={e => setShippingDetails({...shippingDetails, phone: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50" />
                    <textarea placeholder="Full Shipping Address *" required rows={3} value={shippingDetails.address} onChange={e => setShippingDetails({...shippingDetails, address: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50"></textarea>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                  >
                    {loading ? 'Processing...' : `Pay ₹${cartTotal.toLocaleString('en-IN')}`}
                    {!loading && <ArrowRight size={20} />}
                  </button>
                  <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-slate-500">
                    <span>Secured by</span>
                    <span className="font-bold text-slate-700">Razorpay</span>
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
