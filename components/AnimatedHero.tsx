// components/AnimatedHero.tsx
'use client';

import { motion } from 'framer-motion';

export default function AnimatedHero() {
  return (
    <div className="bg-book-primary text-white p-16 rounded-b-xl shadow-2xl mb-10">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-6xl font-serif font-extrabold leading-tight">
          Discover Your Next Story.
        </h1>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-4 text-xl font-sans max-w-2xl"
      >
        The finest collection of fiction, romance, and fantasy, delivered right to your door.
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#FFEB3B" }} // Light yellow on hover
        whileTap={{ scale: 0.95 }}
        className="mt-8 px-8 py-3 bg-book-secondary text-book-primary font-bold rounded-full shadow-lg"
      >
        Shop Best Sellers
      </motion.button>
    </div>
  );
}