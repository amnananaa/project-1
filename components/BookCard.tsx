// components/BookCard.tsx (FINAL UPDATED VERSION)
'use client';

import { motion } from 'framer-motion';
import { Heart, HeartCrack, ImageOff } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import Image from 'next/image';
import Link from 'next/link'; // <-- Zaroori

interface Book {
  book_id: number;
  title: string;
  price: number;
  authors: { author_name: string; };
  cover_image_url?: string; 
}

// Temporary function to get a placeholder image if URL is missing
const getPlaceholderUrl = (id: number) => 
  `https://picsum.photos/seed/${id}/300/450`; 

export default function BookCard({ book }: { book: Book }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isInWishlist = wishlist.some(item => item.book_id === book.book_id);
  const imageUrl = book.cover_image_url || getPlaceholderUrl(book.book_id);

  // 1. Handlers
  const handleAddToCart = (e: React.MouseEvent) => {
    // Ye zaroori hai! Yeh link par click hone se rokega, sirf cart action karega.
    e.preventDefault(); 
    e.stopPropagation(); 
    addToCart(book);
  };
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    // Ye zaroori hai! Yeh link par click hone se rokega.
    e.preventDefault(); 
    e.stopPropagation();
    toggleWishlist(book);
  };
  
  // 2. Main Render
  return (
    // Link component poore card ko wrap karega
    <Link href={`/books/${book.book_id}`} passHref>
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0, 0, 0, 0.15)" }}
            // Remove 'cursor-pointer' from Link, it's better on the inner element.
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer flex flex-col font-sans border-t-4 border-book-primary relative h-full"
        >
            {/* Wishlist Toggle Button */}
            <motion.button
              onClick={handleToggleWishlist} // 👈 Handler attached
              whileTap={{ scale: 0.8 }}
              className={`absolute top-2 right-2 p-1 rounded-full z-10 
                   ${isInWishlist ? 'text-red-500 bg-white shadow-md' : 'text-gray-400 hover:text-red-500 bg-white/80'}`}
            >
              {isInWishlist ? <HeartCrack size={20} fill="red" /> : <Heart size={20} />}
            </motion.button>

            {/* Image Integration */}
            <div className="relative w-full h-64"> 
              {imageUrl ? (
                  <Image
                      src={imageUrl}
                      alt={`Cover of ${book.title}`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 hover:scale-110"
                  />
              ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <ImageOff size={40} />
                  </div>
              )}
            </div>
            
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-book-primary mb-1">{book.title}</h3>
              <p className="text-sm text-gray-600 italic">By {book.authors.author_name}</p>
              
              <div className="mt-auto pt-3 flex justify-between items-center">
                <span className="text-2xl font-serif font-bold text-book-secondary">
                  ${book.price.toFixed(2)}
                </span>
                <motion.button
                  onClick={handleAddToCart} // 👈 Updated Handler attached
                  whileTap={{ scale: 0.9 }}
                  className="bg-book-primary text-white text-sm px-4 py-2 rounded-full hover:bg-indigo-900 transition-colors"
                >
                  Add to Cart
                </motion.button>
              </div>
            </div>
        </motion.div>
    </Link>
  );
}