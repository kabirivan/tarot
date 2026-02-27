import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B5CF6",
        secondary: "#F59E0B",
        accent: "#EC4899",
        dark: "#0F0A1F",
        "dark-surface": "#1E1B4B",
        light: "#FAF8FF",
        success: "#10B981",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
        "gradient-dark": "linear-gradient(180deg, #0F0A1F 0%, #1E1B4B 100%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { opacity: "0.6" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
