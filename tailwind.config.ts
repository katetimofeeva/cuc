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
        primary: "#A9D6E5", // Основной цвет
        secondary: "#A8D5BA", // Вторичный цвет
        accent: "#F39C12", // Акцентный цвет
        background: "#FFFFFF", // Цвет фона
        text: "#333333", // Цвет текста
        accentText: "#008763",
      },
      boxShadow: {
        "border-shadow": "0 4px 8px 0 rgba(0, 0, 0, .059)",
        "second-shadow": "0 -4px 8px 0 rgba(0, 0, 0, .059)",
        // "0 3px 14px 0 rgba(169, 214, 229, 0.5)",
      },
      backgroundImage: {
        "main-screen": "url('/sofa-big-screen.png')",
        "custom-gradient":
          "linear-gradient(167deg, yellow 24.08%, #F39C12 117.07%)",
        "hover-custom-gradient":
          "linear-gradient(167deg, yellow 16.08%, #F39C12 97.07%)",
      },
    },
  },
  plugins: [],
};
export default config;
