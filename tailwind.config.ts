import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",    // Include the `app` directory if using Next.js 13+
    "./components/**/*.{js,ts,jsx,tsx}", // Include your `components` folder
    "./pages/**/*.{js,ts,jsx,tsx}",  // Include the `pages` directory for older Next.js projects
    "./lib/**/*.{js,ts,jsx,tsx}",    // Include any custom folders like `lib` if applicable
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
