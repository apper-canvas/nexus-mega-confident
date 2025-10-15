/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
extend: {
      colors: {
        primary: "#6366F1",
        secondary: "#3B82F6",
        accent: "#A78BFA",
        sidebar: {
          bg: "#F3F2FF",
          active: "#E8E6FF",
        },
        text: {
          primary: "#1F2937",
          secondary: "#6B7280",
        },
        border: "#E5E7EB",
        surface: "#FFFFFF",
        background: "#FFFFFF",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};