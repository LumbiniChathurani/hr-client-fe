/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-purple": "#F3E8FF",
        "lilac-purple": "	#E9D5FF",
        "dark-purple": "#2E2235",
        "dark-purple-light": "#3C2F4B",
        "dark-purple-muted": "#4A3A57",
        "hover-purple": "#6D5D85",
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
