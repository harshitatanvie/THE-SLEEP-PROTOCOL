/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        horror: {
          black: '#050505',
          red: '#8b0000',
          grey: '#1a1a1a',
          vhs: '#222222',
        }
      },
      animation: {
        'glitch-skew': 'glitch-skew 1s infinite linear alternate-reverse',
        'noise': 'noise 0.2s infinite',
      },
      keyframes: {
        'glitch-skew': {
          '0%': { transform: 'skew(0deg)' },
          '20%': { transform: 'skew(-5deg)' },
          '40%': { transform: 'skew(5deg)' },
          '60%': { transform: 'skew(-10deg)' },
          '80%': { transform: 'skew(10deg)' },
          '100%': { transform: 'skew(0deg)' },
        },
        'noise': {
          '0%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-5%,-5%)' },
          '20%': { transform: 'translate(-10%,5%)' },
          '30%': { transform: 'translate(5%,-10%)' },
          '40%': { transform: 'translate(-5%,15%)' },
          '50%': { transform: 'translate(-10%,5%)' },
          '60%': { transform: 'translate(15%,0)' },
          '70%': { transform: 'translate(0,10%)' },
          '80%': { transform: 'translate(-15%,0)' },
          '90%': { transform: 'translate(10%,5%)' },
          '100%': { transform: 'translate(5%,0)' },
        }
      }
    },
  },
  plugins: [],
}
