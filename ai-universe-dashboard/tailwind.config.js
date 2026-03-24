/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-fast': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-reverse-slow': 'spin-reverse 8s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' }
        }
      },
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