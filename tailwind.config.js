/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream':       '#FAF7F2',
        'warm-white':  '#FFF9F5',
        'deep-dark':   '#0D0A0B',
        'midnight':    '#12080F',
        'dusk':        '#1A0E14',
        'blush':       '#F2C4CE',
        'rose':        '#E8A0B0',
        'dusty-rose':  '#C98B9A',
        'mauve':       '#B07080',
        'wine':        '#7A3B4B',
        'lavender':    '#D4C5E2',
        'lilac':       '#C9B8D8',
        'champagne':   '#F5E6D3',
        'gold':        '#D4AF7A',
        'warm-cream':  '#F0E6D3',
      },
      fontFamily: {
        'display':     ['Cormorant Garamond', 'serif'],
        'heading':     ['Playfair Display', 'serif'],
        'script':      ['Great Vibes', 'cursive'],
        'handwritten': ['Dancing Script', 'cursive'],
        'body':        ['Poppins', 'sans-serif'],
        'detail':      ['Inter', 'sans-serif'],
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
