/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        primary_: "#0984e3",
        white_: "#ffffff",
        medium_dark_: "#e5e9f2",
        dark_gray_: "#adb5bd",
        dark_: "#495057",
        deep_dark_: "#8094ae"
      },
      fontFamily: {
        sans: [],
      },
      screens: {
        xs: "400px",
        ms: "550px",
        xll: "1440px",
      }
    },
  },
  plugins: [],
}