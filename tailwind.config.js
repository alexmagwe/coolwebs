/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'ping': 'ping 0.5s linear',
      }
    },
  },
  plugins: [
     require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),


  ],
};
