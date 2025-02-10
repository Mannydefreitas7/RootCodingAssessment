import { Config } from 'tailwindcss';

const config: Config = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: 'selector',
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;