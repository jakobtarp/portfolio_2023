/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        brown: "#100D0B",
        brown1: "#22160D",
        brown2: "#311C0E",
      },

      backgroundImage: {
        hero: "url('../public/img/baggrund.webp')",
        mobil: "url('../public/img/mobil.png')",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
