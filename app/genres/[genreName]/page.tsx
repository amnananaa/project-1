// app/genres/[genreName]/page.tsx (New File)
'use client';

import { supabase } from '@/lib/supabase';
import BookCard from '@/components/BookCard';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import { BookOpenText } from 'lucide-react';

interface Book {
    book_id: number;
    title: string;
    price: number;
    authors: { author_name: string; };
    cover_image_url?: string;
}

// Function to fetch books by genre name
async function getBooksByGenre(genreName: string): Promise<Book[]> {
    // Note: Is logic ke liye, aapke paas database mein 'books' aur 'genres' ko link karne ke liye 
    // ek 'book_genres' join table ya 'books' table mein 'genre_id' column hona chahiye.
    // Hum simple join/filter logic assume kar rahe hain.
    
    // Step 1: Genre ID fetch karo (agar aapke 'genres' table mein 'genre_name' hai)
    const { data: genreData, error: genreError } = await supabase
        .from('genres')
        .select('genre_id')
        .eq('genre_name', decodeURIComponent(genreName)) // URL se aaye hue name ko decode karein
        .single();

    if (genreError || !genreData) {
        console.error('Genre not found or error:', genreError);
        return [];
    }
    
    // Step 2: Us ID ke hisaab se books fetch karo (assuming 'books' table has 'genre_id' column)
    const { data: booksData, error: booksError } = await supabase
        .from('books')
        .select(`
            book_id, 
            title, 
            price,
            cover_image_url,
            authors (author_name)
        `)
        .eq('genre_id', genreData.genre_id) // Filter by the fetched genre_id
        .order('title', { ascending: true }); 

    if (booksError) {
        console.error('Error fetching books by genre:', booksError);
        return [];
    }
    
    return booksData as Book[];
}

export default async function GenreBooksPage({ 
    params, 
}: { 
    params: { genreName: string }; 
}) {
    const cleanGenreName = decodeURIComponent(params.genreName);
    const books = await getBooksByGenre(params.genreName);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    return (
        <div className="container mx-auto p-4 md:p-8 font-sans">
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 text-white p-8 rounded-xl shadow-lg mb-10 flex items-center space-x-4"
            >
                <BookOpenText size={40} className="text-book-secondary" />
                <div>
                    <h1 className="text-4xl font-serif font-extrabold">{cleanGenreName} Books</h1>
                    <p className="text-lg opacity-80 mt-1">Found {books.length} titles in the {cleanGenreName} collection.</p>
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
                    <p className="text-xl text-gray-700">No books found for the genre: **{cleanGenreName}**.</p>
                </div>
            )}
        </div>
    );
}