/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./splashscreen.html",
    "./src/App.vue",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

