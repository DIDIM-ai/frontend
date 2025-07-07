import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
          primary: {
            DEFAULT: "#ff7710"
          },
          secondary: {
            DEFAULT: "#ffe4cf"
          }
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)', ...defaultTheme.fontFamily.sans],
        suite: ['var(--font-suite)', ...defaultTheme.fontFamily.sans],
        montserrat: ['var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;
