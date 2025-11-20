/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-purple': '#8B5CF6',
        'cyber-pink': '#EC4899',
        'cyber-blue': '#3B82F6',
        'cyber-gold': '#F59E0B',
        'dark-bg': '#0F0F23',
        'dark-card': '#1A1A2E',
      },
      fontFamily: {
        'gaming': ['Orbitron', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' },
          '50%': { opacity: 0.8, boxShadow: '0 0 40px rgba(139, 92, 246, 0.8)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
