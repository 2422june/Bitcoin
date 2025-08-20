/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bitcoin-gold': '#F7931A',
        'dark-bg': '#0F0F0F',
        'card-bg': '#1A1A1A',
        'border-color': '#333333',
      },
      fontFamily: {
        'korean': ['Noto Sans KR', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

