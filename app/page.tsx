// app/page.tsx (Updated with Hero and Featured Sections)
'use client';

import { supabase } from '@/lib/supabase';
import BookCard from '@/components/BookCard';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react'; 

interface Book {
    book_id: number;
    title: string;
    price: number;
    authors: { author_name: string; };
    cover_image_url?: string;
}

// Function to fetch a limited number of featured books
async function getFeaturedBooks(): Promise<Book[]> {
    const { data, error } = await supabase
        .from('books')
        .select(`
            book_id, 
            title, 
            price,
            cover_image_url,
            authors (author_name)
        `)
        .order('book_id', { ascending: false }) // Example: latest 5 books as featured
        .limit(5);

    if (error) {
        console.error('Error fetching featured books:', error);
        return [];
    }
    return data as Book[];
}

// Animation variant for staggered load
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1 
      } 
    },
};

export default async function HomePage() {
  const books = await getFeaturedBooks();

  return (
    <div className="min-h-screen bg-book-bg font-sans">
      
      {/* 1. Animated Hero Section (Client component should be used for complex animations, but we use server-side motion for simple fade-in) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-book-primary text-white pt-20 pb-24 mb-12 shadow-2xl"
      >
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-6xl font-serif font-extrabold mb-4 tracking-tight">
                Discover Your Next Adventure
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
                The best selection of digital and physical books. Your next favorite book is here.
            </p>
            <Link 
              href="/books" 
              className="inline-flex items-center bg-book-secondary text-book-primary font-bold text-lg px-8 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition-colors transform hover:scale-[1.03]"
            >
              Browse All Books
              <ArrowRight size={20} className="ml-3" />
            </Link>
        </div>
      </motion.section>
      
      <main className="container mx-auto px-4">
        {/* 2. Featured Books Section */}
        <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-serif font-extrabold text-gray-800 flex items-center">
                    <Sparkles size={28} className="text-book-secondary mr-3" />
                    Featured Bestsellers
                </h2>
                <Link href="/new" className="text-book-primary font-semibold hover:underline flex items-center">
                    View New Releases
                    <ArrowRight size={16} className="ml-2" />
                </Link>
            </div>

            {books.length > 0 ? (
                <motion.div 
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {books.map((book) => (
                        <BookCard key={book.book_id} book={book} /> 
                    ))}
                </motion.div>
            ) : (
                <div className="text-center py-10 text-gray-500">
                    <p>No featured books available right now.</p>
                </div>
            )}
        </section>

        {/* 3. TODO: Add another section like "Shop by Genre" or "Top Deals" */}
        
      </main>
    </div>
  );
}