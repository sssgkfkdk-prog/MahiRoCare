'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('ro-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart');
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('ro-cart', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => String(item._id) === String(product._id));
      if (existing) {
        return prev.map(item => 
          String(item._id) === String(product._id) ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => String(item._id) !== String(productId)));
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => {
      const newCart = [];
      for (const item of prev) {
        if (String(item._id) === String(productId)) {
          const newQ = item.quantity + delta;
          if (newQ > 0) {
            newCart.push({ ...item, quantity: newQ });
          }
          // If newQ <= 0, we don't push it (meaning it gets removed)
        } else {
          newCart.push(item);
        }
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount, isMounted }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
