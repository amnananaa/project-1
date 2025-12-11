// app/deals/page.tsx (Updated: Dynamic Data Fetching with Dummy Logic)
'use client';

import { supabase } from '@/lib/supabase';
import BookCard from '@/components/BookCard';
import { motion } from 'framer-motion';
import { DollarSign, Zap } from 'lucide-react';

interface Book {
    book_id: number;
    title: string;
    price: number;
    authors: { author_name: string; };
    cover_image_url?: string;
}

// Function to fetch Deals (Dummy Logic: Price < $15 or ID is even)
async function getDeals(): Promise<Book[]> {
    const { data, error } = await supabase
        .from('books')
        .select(`
            book_id, 
            title, 
            price,
            cover_image_url,
            authors (author_name)
        `)
        // Filtering example: Un books ko lo jinki price $15 se kam ho
        .lt('price', 15.00) 
        .order('price', { ascending: true }); 

    if (error) {
        console.error('Error fetching deals:', error);
        return [];
    }
    
    // Agar $15 se kam ki book na mile, toh dummy filter se kuch books nikal lo
    const deals = data.length > 0 ? data : (data as Book[]).filter(book => book.book_id % 2 === 0);
    
    return deals as Book[];
}

export default async function DealsPage() {
  const books = await getDeals();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="container mx-auto p-4 md:p-8 font-sans">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-red-600 text-white p-8 rounded-xl shadow-lg mb-10 flex items-center space-x-4"
      >
        <Zap size={40} />
        <div>
          <h1 className="text-4xl font-serif font-extrabold">⚡ Flash Deals & Offers</h1>
          <p className="text-lg opacity-80 mt-1">Grab these {books.length} discounted books before they're gone!</p>
        </div>
      </motion.header>
      
      {books.length > 0 ? (
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {books.map((book) => (
            <BookCard key={book.book_id} book={book} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed border-red-300 rounded-xl">
          <DollarSign size={40} className="mx-auto text-red-500 mb-4" />
          <p className="text-xl text-gray-700">Currently no flash deals available. Check back soon!</p>
        </div>
      )}
    </div>
  );
}