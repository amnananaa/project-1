// app/books/page.tsx
'use client';

import { supabase } from '@/lib/supabase';
import BookCard from '@/components/BookCard';
import { motion } from 'framer-motion'
import { RefreshCcw, Library } from 'lucide-react'; // Icon for loading

// Same Book Interface as used in page.tsx
interface Book {
  book_id: number;
  title: string;
  price: number;
  authors: { author_name: string; };
}

async function getAllBooks(): Promise<Book[]> {
  // Database se saari books laao, ordered by title
  const { data, error } = await supabase
    .from('books')
    .select(`
      book_id, 
      title, 
      price,
      authors (
        author_name
      )
    `)
    .order('title', { ascending: true }); // Alphabetical order

  if (error) {
    console.error('Error fetching all books:', error);
    return [];
  }
  return data as Book[];
}

export default async function AllBooksPage() {
  const books = await getAllBooks();

  // Animation variants for staggered load
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.05 // Har card 0.05s ke interval par load hoga
      } 
    },
  };

  return (
    <div className="container mx-auto p-4 md:p-8 font-sans">
      
      {/* Stylish Header Section */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-book-primary text-white p-8 rounded-xl shadow-lg mb-10 flex items-center space-x-4"
      >
        <Library size={40} className="text-book-secondary" />
        <div>
          <h1 className="text-4xl font-serif font-extrabold">The Complete Collection</h1>
          <p className="text-lg opacity-80 mt-1">Browse all {books.length} titles in our inventory.</p>
        </div>
      </motion.header>
      
      {books.length > 0 ? (
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible" // Main animation trigger
        >
          {/* Note: BookCard already has individual item animations (initial, animate) */}
          {books.map((book) => (
            // BookCard ab image ke saath render hoga
            <BookCard key={book.book_id} book={book} /> 
          ))}
        </motion.div>
      ) : (
        // ... (Error/Loading state remains the same)
        <div className="text-center py-20 text-gray-500">
            <RefreshCcw size={40} className="mx-auto mb-4 animate-spin" />
            <p className="text-xl">Could not load books. Check Supabase connection and RLS policies on the 'books' table.</p>
        </div>
      )}
    </div>
  );
}