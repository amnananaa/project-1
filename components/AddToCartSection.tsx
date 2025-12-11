// components/AddToCartSection.tsx
'use client';

import { useStore } from '@/context/StoreContext';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Book Item type (should match the minimum data required by StoreContext)
interface BookItem {
    book_id: number;
    title: string;
    price: number;
}

export default function AddToCartSection({ book }: { book: BookItem }) {
    const { addToCart, cart } = useStore();
    const [quantity, setQuantity] = useState(1);
    
    // Check if the item is already in the cart to show a different button state
    const itemInCart = cart.find(item => item.book_id === book.book_id);

    const handleAddToCart = () => {
        // Quantity ke hisaab se item add karo
        for (let i = 0; i < quantity; i++) {
            addToCart(book);
        }
        // Quantity ko reset kar sakte hain, ya phir confirmation message de sakte hain.
        // setQuantity(1); 
    };

    return (
        <div className="flex items-center space-x-6 border-b pb-4 mb-6">
            
            {/* Price Display (Optional, could be in parent) */}
            <span className="text-4xl font-extrabold text-red-600">
                ${book.price.toFixed(2)}
            </span>
            
            {/* Quantity Controls */}
            <div className="flex items-center space-x-3 bg-gray-100 p-2 rounded-xl border">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="p-2 bg-white rounded-lg shadow hover:bg-gray-200 transition-colors"
                >
                    <Minus size={18} />
                </motion.button>
                <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="p-2 bg-white rounded-lg shadow hover:bg-gray-200 transition-colors"
                >
                    <Plus size={18} />
                </motion.button>
            </div>

            {/* Add to Cart Button */}
            <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.95 }}
                className="flex items-center bg-book-primary text-white font-bold text-lg px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-900 transition-colors"
            >
                <ShoppingCart size={20} className="mr-3" />
                {itemInCart ? 'Add More' : 'Add to Cart'}
            </motion.button>
        </div>
    );
}