module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  class: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['San Francisco', 'sans-serif'],
        serif: ['San Francisco', 'serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
