/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        bg: "url('/Bg-screen.jpg')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      dropShadow: {
        '3xl': '0 0 5px #4ade80',
        '4xl': '0 0 20px #4ade80',
        '5xl': '0 10px 50px #4ade80',
        'artist': '0 0px 14px #4ade80',
        'text': '3px 12px 4px rgba(0, 0, 0, 0.40)'
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-30px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        rotate: 'rotate 15s linear infinite',
        float: 'float 2s ease-in-out infinite',
      },
      fontFamily: {
        'jim': ['"Jim Nightshade"'],
        'carter': ['"Carter One"'],
        'inter': ['"Inter"']
      },
    },
  },
  plugins: [],
};
