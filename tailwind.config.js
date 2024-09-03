/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./splashscreen.html",
    "./src/main.ts",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    'formkit.theme.ts'
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
}

