/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.categoryMarquee': {
          animation: 'marquee 5s linear infinite',
          'animation-direction': 'reverse',
        },
        '@keyframes categoryMarquee': {
          "0%" : {
            transform: "translateX(0%)"
          },
          "100%" : {
            transform: "translateX(100%)"
          },
          "100%" : {
            transform: "translateX(-100%)"
          },
          "0%" : {
            transform: "translateX(0%)"
          },
      }
    })
  }
  ],
}
