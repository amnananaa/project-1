// app/cart/page.tsx (Redesigned)
'use client';

import { useStore } from '@/context/StoreContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart } = useStore();
  const cartTotal = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

  // Note: For simplicity, update quantity logic is skipped, but structure is ready.

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[70vh] font-sans">
      <h1 className="text-4xl font-serif font-extrabold text-book-primary mb-10 border-b pb-2">
        🛒 Your Cart
      </h1>
      
      {cart.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 bg-white rounded-xl shadow-lg"
        >
          <ShoppingBag size={50} className="mx-auto text-gray-400 mb-4" />
          <p className="text-2xl font-semibold text-gray-600">Your cart is feeling a little empty!</p>
          <Link href="/books" className="text-book-primary font-bold mt-3 inline-block hover:underline">
            Start browsing our collection
          </Link>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <motion.div 
                key={item.book_id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-book-secondary"
              >
                {/* Image Placeholder */}
                <div className="w-16 h-20 bg-gray-200 rounded-lg mr-4 flex-shrink-0">
                  {/*  */}
                </div>

                <div className="flex-grow mr-4">
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                  <p className="text-md font-semibold text-book-primary mt-1">
                    Price: ${item.price.toFixed(2)}
                  </p>
                </div>
                
                {/* Quantity Controls (Basic UI for now) */}
                <div className="flex items-center space-x-2 mr-6 border rounded-full p-1">
                    <button className="text-gray-600 hover:bg-gray-100 rounded-full"><Minus size={16} /></button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button className="text-gray-600 hover:bg-gray-100 rounded-full"><Plus size={16} /></button>
                </div>

                <p className="text-lg font-extrabold w-20 text-right">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                </p>

                <motion.button 
                  onClick={() => removeFromCart(item.book_id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-red-500 hover:text-red-700 p-2 ml-4 transition-colors"
                  title="Remove"
                >
                  <Trash2 size={22} />
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Summary / Checkout */}
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-2xl h-fit sticky top-24 border-t-8 border-book-primary">
            <h2 className="text-2xl font-serif font-bold mb-5">Order Summary</h2>
            <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span>Subtotal ({cart.length} items):</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg border-b pb-3">
                  <span>Shipping:</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
            </div>
            
            <div className="flex justify-between text-2xl font-extrabold mt-6 pt-4 border-t border-dashed">
              <span>Order Total:</span>
              <span className="text-book-primary">${cartTotal.toFixed(2)}</span>
            </div>
            
            <button className="w-full mt-8 bg-book-secondary text-book-primary font-extrabold text-lg py-3 rounded-xl hover:bg-yellow-400 transition-colors shadow-lg">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}