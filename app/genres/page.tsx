// app/genres/page.tsx (Updated: Dynamic Genre Fetching and Linking)
'use client';

import { supabase } from '@/lib/supabase';
import { Tags, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // Import Link for navigation

// Interface for genre data
interface Genre {
    genre_id: number;
    genre_name: string;
}

// Function to fetch all genres from the database
async function getAllGenres(): Promise<Genre[]> {
    // Assuming you have a 'genres' table with columns 'genre_id' and 'genre_name'
    const { data, error } = await supabase
        .from('genres')
        .select('genre_id, genre_name')
        .order('genre_name', { ascending: true }); 

    if (error) {
        console.error('Error fetching genres:', error);
        return [];
    }
    return data as Genre[];
}


export default async function GenresPage() {
  const genres = await getAllGenres(); // Fetch genres

  return (
    <div className="container mx-auto p-4 md:p-8 font-sans">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 text-white p-8 rounded-xl shadow-lg mb-10 flex items-center space-x-4"
      >
        <Tags size={40} className="text-book-secondary" />
        <div>
          <h1 className="text-4xl font-serif font-extrabold">Explore by Genre</h1>
          <p className="text-lg opacity-80 mt-1">Find your preferred literary world ({genres.length} categories).</p>
        </div>
      </motion.header>
      
      {genres.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {genres.map((genre, index) => (
            <Link
              key={genre.genre_id}
              href={`/genres/${encodeURIComponent(genre.genre_name)}`} // Link to the new dynamic page
              passHref
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)", scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-md cursor-pointer flex flex-col items-center justify-center text-center border-b-4 border-book-primary/50 transition-all duration-300"
              >
                <TrendingUp size={30} className="text-book-primary mb-2" />
                <span className="text-xl font-bold text-blue-700">{genre.genre_name}</span> {/* Display actual genre name */}
              </motion.div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-xl">
            <p className="text-xl text-gray-700">No genres found. Please check your **genres** Supabase table.</p>
        </div>
      )}
    </div>
  );
}