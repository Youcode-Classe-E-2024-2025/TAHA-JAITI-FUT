/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'stadium': "url('./assets/field-bg.webp')",
        'card': "url('./assets/card.webp')",
      },
    },
  },
  plugins: [],
}

