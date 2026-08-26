/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ig: {
          purple: '#833AB4',
          pink: '#E1306C',
          magenta: '#C13584',
          red: '#FD1D1D',
          orange: '#F77737',
          yellow: '#FCAF45',
          dark: '#121212',
          card: '#FFFFFF',
          border: '#DBDBDB',
          bg: '#FAFAFA',
          subtle: '#737373',
          text: '#262626'
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
      },
      backgroundImage: {
        'ig-gradient': 'linear-gradient(45deg, #FCAF45, #F77737, #FD1D1D, #E1306C, #833AB4)',
        'ig-gradient-btn': 'linear-gradient(to right, #E1306C, #FD1D1D, #F77737)',
        'ig-gradient-purple': 'linear-gradient(135deg, #833AB4 0%, #E1306C 100%)',
      }
    },
  },
  plugins: [],
}
