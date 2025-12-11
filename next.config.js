// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['picsum.photos'], // Placeholder images domain
    // Agar aap Supabase Storage use karte hain to uska domain bhi yahan aayega
  },
};

module.exports = nextConfig;