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
      },
      boxShadow: {
        "border-shadow": "0 0 20px 0 rgba(169, 214, 229, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
