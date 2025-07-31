/** @type {import('tailwindcss').Config} */
export default {
  content: [ // This now tells Tailwind where to look
    "./index.html",         // Look in the main index.html file
    "./src/**/*.{js,ts,jsx,tsx}", // Look in all .js, .ts, .jsx, and .tsx files inside the 'src' folder and any subfolders
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}