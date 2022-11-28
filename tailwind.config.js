/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    themes: ["halloween"],
    extend: {},
  },
  plugins: [require("daisyui")],
}