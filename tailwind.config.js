/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["selector", '[data-mode="light"]'],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "ml-64",
    "ml-0",
  ],
  theme: {
    extend: {
      colors: {
        youtubeRed: "#FF0000",
        darkGray: "#282828",
        lightGray: "#F1F1F1",
        black: "#111111",
        white: "#FFFFFF",
        gray: "#e5e7eb",
      },
      fontFamily: {
        sans: ["Roboto", "Arial", "sans-serif"],
      },
      fontSize: {
        base: "16px",
        lg: "18px",
        xl: "20px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  plugins: [require("tailwind-scrollbar-hide")],
};
