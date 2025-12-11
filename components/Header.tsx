// components/Header.tsx (Updated for visibility and slight redesign)
'use client';

import Link from 'next/link';
import { ShoppingCart, Heart, Search, BookOpen, Menu } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function Header() {
  const { cartItemCount, wishlistItemCount } = useStore();
  
  const navItems = [
    { name: 'All Books', href: '/books' },
    { name: 'New Releases', href: '/new' },
    { name: 'Genres', href: '/genres' },
    { name: 'Deals', href: '/deals' },
  ];

  return (
    <header className="bg-white shadow-xl sticky top-0 z-50 font-sans border-b-4 border-book-secondary"> {/* Border added */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center space-x-2 text-book-primary hover:text-indigo-900 transition-colors">
          <BookOpen size={30} strokeWidth={2.5} />
          <span className="text-3xl font-serif font-extrabold tracking-tight hidden sm:block"> {/* Hide brand name on very small screens */}
            Bookstore
          </span>
        </Link>
        
        {/* Main Navigation - Hidden removed from smaller breakpoint */}
        {/* Change 'hidden md:flex' to 'flex' so tabs always show (or adjust breakpoints) */}
        <nav className="flex space-x-3 sm:space-x-6 text-sm"> {/* Reduced spacing for small screens */}
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="text-gray-700 hover:text-book-primary font-semibold transition-all border-b-2 border-transparent hover:border-book-primary py-2 px-1" // Better hover effect
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Action Icons & Search */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          {/* Search Icon */}
          <button className="text-gray-600 hover:text-book-primary p-2 transition-colors rounded-full hover:bg-gray-100 hidden sm:block">
            <Search size={20} />
          </button>

          {/* Wishlist Icon (Dynamic) */}
          <Link href="/wishlist" className="relative text-gray-600 hover:text-red-500 p-2 transition-colors">
            <Heart size={20} />
            {wishlistItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center -mt-1 -mr-1 font-bold">
                    {wishlistItemCount}
                </span>
            )}
          </Link>

          {/* Cart Icon (Dynamic) */}
          <Link href="/cart" className="relative text-gray-600 hover:text-green-600 p-2 transition-colors">
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-book-secondary text-book-primary text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center -mt-1 -mr-1">
                    {cartItemCount}
                </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}