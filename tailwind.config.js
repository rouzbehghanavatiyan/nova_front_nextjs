import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-iransans)", "system-ui", "sans-serif"],
        iransans: ["var(--font-iransans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        sausage: "#FEE4E2",
        main: "#006EF7",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

export default config;
