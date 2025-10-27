// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        'gradient-x': 'gradient-x 5s ease infinite',
        'slide-in': 'slide-in 0.8s ease-in-out forwards',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-1.25rem)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      colors: {
        'primary': '#4CAF50',
        'secondary': '#FFC107',
      },
    },
  },
  plugins: [],
};
