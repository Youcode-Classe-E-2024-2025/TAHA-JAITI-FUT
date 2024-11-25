const { addDynamicIconSelectors } = require('@iconify/tailwind');
const { addIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'stadium': "url('./assets/field-bg.webp')",
        'card': "url('./assets/card.webp')",
        'bg-stadium': "url('./assets/stadium.webp')",
        'gold-card': "url('./assets/goldcard.webp')",
      },
      fontFamily: {
        'roboto': 'Roboto Condensed',
      },
      colors: {
        'black-rich': '#1F1F1F',
        'black-slate': '#141414',
        'lime-green': '#7AE7C7',
        'dark-green': '#75BBA7',
      }
    },
  },
  plugins: [addDynamicIconSelectors(), addIconSelectors(['gg','mingcute']),],
}

