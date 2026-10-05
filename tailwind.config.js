/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#bcd3ff',
          300: '#8eb6ff',
          400: '#598dff',
          500: '#3366ff',
          600: '#1e4ae6',
          700: '#1a3acc',
          800: '#1e3a8a',
          900: '#1e2f6b',
          950: '#0f1a47',
        },
        gold: {
          50: '#fdf9ec',
          100: '#faf0c8',
          200: '#f4df8d',
          300: '#eec85a',
          400: '#e9b43a',
          500: '#d4af37',
          600: '#b8861f',
          700: '#92631c',
          800: '#784e1d',
          900: '#64401e',
          950: '#3a2310',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Hind', 'system-ui', 'sans-serif'],
        hindi: ['Hind', 'Noto Sans Devanagari', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'fade-in': 'fade-in 0.7s ease-out both',
        'scale-in': 'scale-in 0.5s ease-out both',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
