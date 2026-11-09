/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        // Wide desktop (design 5d): filters move into a wider sidebar.
        wide: '1500px'
      },
      maxWidth: {
        '8xl': '90rem'
      },
      imageRendering: {
        pixelated: 'pixelated'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        nunito: ['Nunito', 'system-ui', 'sans-serif']
      },
      // Pokex tokens resolve to CSS variables (src/styles/pokex.css) so the
      // light/dark palette swaps by flipping `data-theme` on the `.pkx` root.
      colors: {
        pkx: {
          bg: 'var(--pkx-bg)',
          surface: 'var(--pkx-surface)',
          surface2: 'var(--pkx-surface2)',
          ink: 'var(--pkx-ink)',
          ink2: 'var(--pkx-ink2)',
          ink3: 'var(--pkx-ink3)',
          line: 'var(--pkx-line)',
          track: 'var(--pkx-track)',
          field: 'var(--pkx-field-line)',
          card: 'var(--pkx-card-line)',
          'duo-ink': 'var(--pkx-duo-ink)',
          'duo-ink2': 'var(--pkx-duo-ink2)',
          heart: '#e5484d'
        }
      },
      borderRadius: {
        'pkx-card': '22px',
        'pkx-btn': '14px',
        'pkx-pill': '8px'
      },
      boxShadow: {
        'pkx-card': 'var(--pkx-card-shadow)',
        'pkx-pop': 'var(--pkx-pop-shadow)',
        'pkx-duo': 'var(--pkx-duo-edge)'
      },
      opacity: {
        'pkx-ball': 'var(--pkx-duo-ball)'
      },
      keyframes: {
        'pkx-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' }
        },
        'pkx-fade': {
          from: { opacity: '0' },
          to: { opacity: '1' }
        }
      },
      animation: {
        'pkx-pulse': 'pkx-pulse 1s ease-in-out infinite',
        'pkx-fade': 'pkx-fade 0.15s ease'
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
