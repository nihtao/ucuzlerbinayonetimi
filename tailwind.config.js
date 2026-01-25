/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: 'class' satırını tamamen sildik
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}