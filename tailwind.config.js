/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Add your JSX or TSX files here
    "./src/CSS/general.css",
  ],
  theme: {
    extend: {
      fontSize: {
        base: "62.5%", // Overrides the default base font size
      },
      colors: {
        "navy-blue": "#0F1C41",
        "light-blue": "#e7f5ff", // Merged the colors into a single object
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"], // Default font  family
      },
      textColor: {
        default: "#333", // Default text color
      },
      maxWidth: {
        "190rem": "190rem",
      },
    },
  },
  plugins: [],
};
