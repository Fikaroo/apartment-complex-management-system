/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#514EF3",
        secondary: "#2EC4B6",
        success: "#2DC8A8",
        warning: "#FE8084",
        dark: "#092C4C",
      },
    },
  },
  plugins: [],
};
