/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontSize: {
        base: "62.5%", // Overrides the default base font size
      },
      colors: {
        "navy-blue": "#0F1C41",
      },
      colors: {
        "light-blue": "#e7f5ff",
      },
    },
  },
  plugins: [],
};
