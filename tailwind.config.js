/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        slideL: 'sliderL 500ms linear',
        slideR: 'sliderR 500ms linear',
      },
      keyframes: {
        slideL: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideR: {
          '0%': { transform: 'translateX(100%)' },
          '100%' : { transform: 'translateX(0)' }
        },
      },
    },
  },
  plugins: [],
};
