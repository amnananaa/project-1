// app/new/page.tsx (Updated: Dynamic Data Fetching)
'use client';
import { supabase } from '@/lib/supabase';
import BookCard from '@/components/BookCard';
import { motion } from 'framer-motion';
import { Ship, Clock } from 'lucide-react';

interface Book {
    book_id: number;
    title: string;
    price: number;
    authors: { author_name: string; };
    cover_image_url?: string;
}

// Function to fetch New Releases
async function getNewReleases(): Promise<Book[]> {
    // Note: Agar aapke books table mein 'publication_date' column ho, toh use order mein use karein.
    const { data, error } = await supabase
        .from('books')
        .select(`
            book_id, 
            title, 
            price,
            cover_image_url,
            authors (author_name)
        `)
        // Yahan filtering ya sorting logic aayega:
        .order('book_id', { ascending: false }) // Temporary: Newest ID first (assuming newer entries have higher IDs)
        .limit(10); // Sirf top 10 new books dikhao

    if (error) {
        console.error('Error fetching new releases:', error);
        return [];
    }
    return data as Book[];
}

export default async function NewReleasesPage() {
  const books = await getNewReleases();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="container mx-auto p-4 md:p-8 font-sans">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-green-600 text-white p-8 rounded-xl shadow-lg mb-10 flex items-center space-x-4"
      >
        <Ship size={40} />
        <div>
          <h1 className="text-4xl font-serif font-extrabold">Fresh Off The Press</h1>
          <p className="text-lg opacity-80 mt-1">The latest arrivals in our collection ({books.length} titles).</p>
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
        <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-xl">
          <Clock size={40} className="mx-auto text-gray-500 mb-4" />
          <p className="text-xl text-gray-700">No new releases found at the moment.</p>
        </div>
      )}
    </div>
  );
}