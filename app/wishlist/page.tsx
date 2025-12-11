// app/wishlist/page.tsx (Redesigned)
'use client';

import { useStore } from '@/context/StoreContext';
import { ShoppingCart, HeartOff, BookOpenCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  const handleMoveToCart = (item: any) => {
    addToCart(item);
    toggleWishlist(item); 
  };

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[70vh] font-sans">
      <h1 className="text-4xl font-serif font-extrabold text-book-primary mb-10 border-b pb-2">
        💖 My Wishlist
      </h1>
      
      {wishlist.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 bg-white rounded-xl shadow-lg"
        >
          <BookOpenCheck size={50} className="mx-auto text-gray-400 mb-4" />
          <p className="text-2xl font-semibold text-gray-600">Your wishlist is empty.</p>
          <p className="text-lg text-gray-500 mt-2">Tap the heart icon on any book to add it here!</p>
        </motion.div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <motion.div 
              key={item.book_id} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" }}
              className="flex flex-col bg-white p-5 rounded-xl shadow-md border-t-4 border-red-500"
            >
              <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
              <p className="text-lg font-extrabold text-book-secondary mt-2 mb-4">${item.price.toFixed(2)}</p>
              
              <div className="mt-auto pt-3 border-t flex space-x-3">
                <button 
                  onClick={() => handleMoveToCart(item)}
                  className="flex-1 flex items-center justify-center bg-book-primary text-white py-2 rounded-lg hover:bg-indigo-900 transition-colors text-sm font-semibold"
                >
                  <ShoppingCart size={16} className="mr-2" /> Add to Cart
                </button>
                <button 
                  onClick={() => toggleWishlist(item)}
                  className="p-2 bg-gray-200 text-red-500 rounded-lg hover:bg-gray-300 transition-colors"
                  title="Remove from Wishlist"
                >
                  <HeartOff size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}