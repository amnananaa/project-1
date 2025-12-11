// app/books/[bookId]/page.tsx
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { BookOpen, DollarSign, Package } from 'lucide-react';
import { notFound } from 'next/navigation';
import AddToCartSection from '@/components/AddToCartSection';
import WishlistToggle from '@/components/WishlistToggle';


// Interface for detailed book data (assuming you have a 'description' column)
interface DetailedBook {
    book_id: number;
    title: string;
    description: string; // Add this column if not present
    price: number;
    stock: number;
    cover_image_url: string | null;
    authors: { author_name: string; author_bio: string; }; // Assuming authors also has bio
    publishers: { publisher_name: string; };
}

// Function to fetch single book detail
async function getBookDetails(bookId: string): Promise<DetailedBook | null> {
    const { data, error } = await supabase
        .from('books')
        .select(`
            book_id,
            title,
            description,
            price,
            stock,
            cover_image_url,
            authors (author_name, author_bio),
            publishers (publisher_name)
        `)
        .eq('book_id', bookId) // Filter by the dynamic ID
        .single(); // Expect only one result

    if (error || !data) {
        console.error('Error fetching book details:', error);
        return null;
    }
    return data as DetailedBook;
}

// Dynamic Page Component
export default async function BookDetailPage({ 
  params, 
}: { 
  params: { bookId: string }; 
}) {
  const book = await getBookDetails(params.bookId);

  if (!book) {
      notFound();
  }

  const imageUrl = book.cover_image_url || `https://picsum.photos/seed/${book.book_id}/500/750`;

  // Cart aur Wishlist ke liye required data extract karein
  const actionBookData = {
      book_id: book.book_id,
      title: book.title,
      price: book.price,
  };

  return (
      <div className="container mx-auto p-8 font-sans">
          <div className="grid md:grid-cols-3 gap-12 bg-white p-8 rounded-xl shadow-2xl">
              
              {/* Left Column: Image (Same) */}
              {/* ... */}
              
              {/* Right Column: Details */}
              <div className="md:col-span-2">
                  <h1 className="text-5xl font-serif font-extrabold text-book-primary mb-2">{book.title}</h1>
                  {/* ... (Author and Price/Stock Info) */}
                  
                  {/* ACTION ROW */}
                  <div className="mt-8 border-t pt-6">
                      <h2 className="text-2xl font-bold mb-4">Pricing & Actions</h2>
                      
                      {/* 1. Add to Cart Section */}
                      <AddToCartSection book={actionBookData} />
                      
                      {/* 2. Wishlist Toggle */}
                      <div className="mt-4">
                         <WishlistToggle book={actionBookData} /> {/* 👈 Yahan add kiya */}
                      </div>

                  </div>
                  
                  {/* Key Info, Description, etc. (Same) */}
                  {/* ... */}
              </div>
          </div>
      </div>
  );
}