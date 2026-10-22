/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.jsx",
    "./resources/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        ch: {
          teal: '#14b8a6',
          'teal-darker': '#0f766e',
          'teal-light': '#5eead4',
          'dark-slate': '#0f172a',
          'slate-muted': '#64748b',
          white: '#ffffff',
          'bg-light': '#f8fafc',
          border: '#e2e8f0',
          yellow: '#f59e0b',
          'yellow-dk': '#d97706',
          'yellow-light': '#fef08a',
        }
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        barlow: ['"Barlow"', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Barlow"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'modern-card': '0 35px 70px rgba(0, 0, 0, 0.5)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glow-teal': '0 0 25px rgba(20, 184, 166, 0.4)',
      },
      backgroundImage: {
        'radial-dots': 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
        'radial-dots-dark': 'radial-gradient(circle at 1px 1px, rgba(20, 184, 166, 0.15) 1px, transparent 0)',
      }
    }
  },
  plugins: [],
}
