import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",    // Include the `app` directory if using Next.js 13+
    "./components/**/*.{js,ts,jsx,tsx}", // Include your `components` folder
    "./pages/**/*.{js,ts,jsx,tsx}",  // Include the `pages` directory for older Next.js projects
    "./lib/**/*.{js,ts,jsx,tsx}",    // Include any custom folders like `lib` if applicable
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SofiaPro', 'ui-sans-serif', 'system-ui'], 
      },
      screens: {
        'customBP': '1300px',
      }
    },
  },
  plugins: [],
};

export default config;
