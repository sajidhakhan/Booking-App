/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    container:{
      padding: {
        md: "8rem",
      },      
    },
  },
  plugins: [],
}