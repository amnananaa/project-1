// app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import { StoreProvider } from '@/context/StoreContext'; // 👈 StoreProvider import kiya

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Online Bookstore',
  description: 'Your next favorite book is here.',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-book-bg`}> 
        <StoreProvider> {/* 👈 Poori App ko StoreProvider se wrap kiya */}
          <Header /> 
          <main> 
            {children} 
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}