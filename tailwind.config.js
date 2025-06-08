/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        night: {
          50: 'var(--color-night-50)',
          100: 'var(--color-night-100)',
          200: 'var(--color-night-200)',
          300: 'var(--color-night-300)',
          400: 'var(--color-night-400)',
          500: 'var(--color-night-500)',
          600: 'var(--color-night-600)',
          700: 'var(--color-night-700)',
          800: 'var(--color-night-800)',
          900: 'var(--color-night-900)',
          950: 'var(--color-night-950)',
        },
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        pulse: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};