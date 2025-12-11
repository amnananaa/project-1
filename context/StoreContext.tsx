// context/StoreContext.tsx
'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';

// Types for Cart and Wishlist items
interface StoreItem {
  book_id: number;
  title: string;
  price: number;
  quantity?: number; // Only for cart
}

interface StoreContextType {
  cart: StoreItem[];
  wishlist: StoreItem[];
  addToCart: (item: StoreItem) => void;
  removeFromCart: (bookId: number) => void;
  toggleWishlist: (item: StoreItem) => void;
  cartItemCount: number;
  wishlistItemCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<StoreItem[]>([]);
  const [wishlist, setWishlist] = useState<StoreItem[]>([]);

  // 1. Add to Cart Logic
  const addToCart = (item: StoreItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.book_id === item.book_id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.book_id === item.book_id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // 2. Remove from Cart Logic
  const removeFromCart = (bookId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.book_id !== bookId));
  };

  // 3. Toggle Wishlist Logic
  const toggleWishlist = (item: StoreItem) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((i) => i.book_id === item.book_id)) {
        return prevWishlist.filter((i) => i.book_id !== item.book_id);
      } else {
        // Adding item to wishlist
        return [...prevWishlist, item];
      }
    });
  };

  // Memoized counts for performance
  const cartItemCount = useMemo(() => cart.reduce((total, item) => total + (item.quantity || 0), 0), [cart]);
  const wishlistItemCount = useMemo(() => wishlist.length, [wishlist]);

  const value = {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    toggleWishlist,
    cartItemCount,
    wishlistItemCount,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};