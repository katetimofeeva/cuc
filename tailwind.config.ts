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
        "border-shadow": "0 3px 14px 0 rgba(169, 214, 229, 0.5)",
      },
      backgroundImage: {
        "main-screen-mob": "url('/sofa-mobile.png')",
      },
    },
  },
  plugins: [],
};
export default config;
