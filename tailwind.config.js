/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '90rem'
      },
      imageRendering: {
        pixelated: 'pixelated'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.pixelated': {
          'image-rendering': 'pixelated'
        }
      })
    }
  ]
}
