/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'myfont': ['MyFont', 'sans-serif'],
        'mark-bold': ['Mark-Simonson-Bold', 'sans-serif'],
        'mark-regular': ['Mark-Simonson-Regular', 'sans-serif']
      },
      keyframes: {
        
      }
    },
  },
  plugins: [],
}

