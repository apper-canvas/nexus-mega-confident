/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#2563EB",
        accent: "#3B82F6",
        sidebar: {
          bg: "#0F172A",
          active: "#1E3A8A",
        },
        text: {
          primary: "#1E293B",
          secondary: "#475569",
        },
        border: "#CBD5E1",
        surface: "#F8FAFC",
        background: "#F1F5F9",
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