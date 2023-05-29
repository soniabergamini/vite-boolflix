/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlack: '#141414',
        secondaryBgDark: '#000000ab',
        tertiaryRed: '#E50914'
      }
    },
  },
  plugins: [],
}
