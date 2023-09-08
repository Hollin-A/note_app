/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        dark: "#2E3640",
        grey: "#BABDBF",
        light: "#F2F2F2",
        lightBeige: "#F2EBDC",
        beige: "#BFA08E",
        red: "#7D0A0A",
      },
    },
  },
  plugins: [],
};
