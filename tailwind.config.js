/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        secondary: "#3B82F6",
        accent: "#A78BFA",
        surface: "rgba(255, 255, 255, 0.05)",
        background: "#0F0F1E",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        glass: "20px",
      },
      boxShadow: {
        glass: "0 4px 24px rgba(124, 58, 237, 0.15)",
        glow: "0 0 20px rgba(124, 58, 237, 0.4)",
      },
    },
  },
  plugins: [],
};