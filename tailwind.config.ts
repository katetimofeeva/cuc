import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A90E2", // Основной цвет
        secondary: "#A8D5BA", // Вторичный цвет
        accent: "#F39C12", // Акцентный цвет
        background: "#F8F9FA", // Цвет фона
        text: "#333333", // Цвет текста
        accentText: "#008763",
      },
      boxShadow: {
        "border-shadow": "0 4px 8px 0 rgba(0, 0, 0, .059)",
        "second-shadow": "0 -4px 8px 0 rgba(0, 0, 0, .059)",
        // "0 3px 14px 0 rgba(169, 214, 229, 0.5)",
      },
      backgroundImage: {
        "main-screen": "url('/sofa-big-screen.webp')",
        "main-screen-mob": "url('/main-screen-mob.webp')",
        "custom-gradient":
          "linear-gradient(167deg, #ffec00 10.08%, #F39C12 110.07%)",

        "hover-custom-gradient":
          "linear-gradient(167deg, #ffec00 10.08%, #F39C12 80.07%)",
      },
      animation: {
        "pulse-scale": "pulse-scale 2s ease-in-out infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        "pulse-scale": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.9" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
