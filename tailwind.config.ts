// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}', // <--- components folder add karein
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Aapki bookstore ka main color (e.g., Deep Navy for professional look)
        'book-primary': '#1A237E', 
        'book-secondary': '#FFD54F', // Accent color (e.g., Gold/Amber)
        'book-bg': '#F8F8FF',
      },
      fontFamily: {
        // Google Font se koi professional font use karein (e.g., Lora or Playfair Display)
        serif: ['Lora', 'serif'], 
        sans: ['Inter', 'sans-serif'],
      },
      // Custom Animation keyframes add karein
      keyframes: {
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;