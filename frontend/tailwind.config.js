/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': "var(--background)",
        'foreground': "var(--foreground)",
        'border': 'var(--border)',
        'primary-text': 'var(--primary-text)',
        'secondary-text': 'var(--secondary-text)',
        'primary-blue': 'var(--primary-blue)',
        'primary-orange': 'var(--primary-orange)',
        'primary-btn-hover': 'var(--primary-btn-hover)',
        'primary-btn-disable': 'var(--primary-btn-disable)',
        'primary-nav-hover': 'var(--primary-nav-hover)',
        'light-secondary': 'var(--light-secondary)',
      },
      screens: {
        'mobile-xsm': '320px'
      }
    },
  },
  plugins: [],
};
