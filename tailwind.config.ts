import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        medicare: {
          navy: '#0B1F33',
          blue: '#1479FF',
          cyan: '#18C7C9',
          softBlue: '#EAF4FF',
          bg: '#F7FAFC',
          white: '#FFFFFF',
          textPrimary: '#102A43',
          textSecondary: '#627D98',
          success: '#20B26B',
          // Dark Mode specific
          darkBg: '#071521',
          darkCard: '#0E2438',
          darkInput: '#102A43',
          darkText: '#F0F6FC',
          darkSecondary: '#9FB3C8',
          darkAccent: '#36A3FF',
        },
      },
      borderRadius: {
        'card': '20px',
        'input': '12px',
        'btn': '14px',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(11, 31, 51, 0.06)',
        'card': '0 12px 35px rgba(11, 31, 51, 0.08)',
        'glow': '0 0 25px rgba(20, 121, 255, 0.22)',
        'dark-glow': '0 0 30px rgba(54, 163, 255, 0.22)',
      },
    },
  },
  plugins: [],
};

export default config;
