/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      white: "#ffffff",
      black: "#000000",
      "text-primary": "#141414",
      primary: "#120B48",
      grey: "#616163",
      "grey-light": "#E7E7ED",
      transparent: "transparent",
    },
    fontFamily: {
      sora: ["Sora", "sans-serif"],
      workSans: ["Work-Sans", "sans-serif"],
    },
  },
  plugins: [],
};
