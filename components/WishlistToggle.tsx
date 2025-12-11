// components/WishlistToggle.tsx
'use client';

import { useStore } from '@/context/StoreContext';
import { Heart, HeartCrack } from 'lucide-react';
import { motion } from 'framer-motion';

// Book Item type (minimum data required for Wishlist)
interface BookItem {
    book_id: number;
    title: string;
    price: number;
}

export default function WishlistToggle({ book }: { book: BookItem }) {
    const { toggleWishlist, wishlist } = useStore();
    
    // Check if the item is already in the wishlist
    const isInWishlist = wishlist.some(item => item.book_id === book.book_id);

    const handleToggleWishlist = () => {
        toggleWishlist(book);
    };

    return (
        <motion.button
            onClick={handleToggleWishlist}
            whileTap={{ scale: 0.85 }}
            className={`flex items-center space-x-2 text-md font-semibold px-4 py-2 rounded-lg transition-colors duration-200 
                ${isInWishlist 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200 border-2 border-red-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-gray-300'
                }`}
            aria-label={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
            {isInWishlist ? (
                <>
                    <HeartCrack size={20} className="fill-red-500" />
                    <span>In Wishlist</span>
                </>
            ) : (
                <>
                    <Heart size={20} />
                    <span>Add to Wishlist</span>
                </>
            )}
        </motion.button>
    );
}