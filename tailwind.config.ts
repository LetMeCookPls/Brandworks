import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "var(--brand-red)",
          "blue-light": "var(--brand-blue-light)",
          "blue-dark": "var(--brand-blue-dark)",
          green: "var(--brand-green)",
          yellow: "var(--brand-yellow)",
          black: "var(--brand-black)",
          dark: "var(--brand-dark)",
          surface: "var(--brand-surface)",
          glass: "var(--brand-glass)",
          border: "var(--brand-border)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
