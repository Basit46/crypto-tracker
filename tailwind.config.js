/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        vsm: "450px",
        xmd: "900px",
      },
      colors: {
        primary: "#35374f",
      },
    },
  },
  plugins: [],
};
