/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          deep: '#1a4d2e',
          main: '#2d6a4f',
          light: '#52b788',
          accent: '#95d5b2',
        },
        secondary: {
          clay: '#d4a373',
          sand: '#f4e4c1',
        },
        neutral: {
          dark: '#2b3a2f',
          mid: '#829a92',
          light: '#e8f1ed',
          white: '#fafdf9',
        },
        accent: {
          warning: '#fb8500',
          success: '#06d6a0',
          info: '#4895ef',
        },
      },
      fontFamily: {
        display: ['Cabinet Grotesk', 'sans-serif'],
        body: ['Inter Variable', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
