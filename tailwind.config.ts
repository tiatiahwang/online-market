import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: {
        1: '#C5E7BC',
        2: '#8CCF79',
        3: '#60BC46',
        4: '#4E9C38',
      },
      light: {
        bg: '#ECECEC',
        text: {
          DEFAULT: '#212529',
          1: '#CED4DA',
          2: '#868E96',
          3: '#495057',
        },
      },
      dark: {
        bg: '#212529',
        text: {
          DEFAULT: '#ECECEC',
          1: '#D9D9D9',
          2: '#ACACAC',
          3: '#595959',
        },
      },
      skeleton: '#404040',
    },
  },
  plugins: [],
};
export default config;
