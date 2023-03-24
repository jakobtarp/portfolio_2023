/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('../public/img/noise.svg')",
      },
      colors: {
        transparent: "transparent",
        brown: "#100D0B",
        brown1: "#22160D",
        brown2: "#311C0E",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
