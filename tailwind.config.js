/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      animation: {
        'scroll': 'scroll-left 100s linear infinite', // Adjust speed here
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0)' }, 
          '95%': { transform: 'translateX(-100%)' },  
        },
      },
    },
  },
  plugins: [],
}

