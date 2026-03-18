/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tech-blue': '#0ea5e9',
        'tech-purple': '#8b5cf6',
        'tech-amber': '#f59e0b',
        'tech-emerald': '#10b981',
        'tech-red': '#ef4444',
        'tech-rose': '#f43f5e',
        'tech-indigo': '#6366f1',
      },
    },
  },
  plugins: [],
}