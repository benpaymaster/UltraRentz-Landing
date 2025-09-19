/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-primary": "#201E1F",
        "container-bg": "#50B2C0",
        "text-primary": "#FEEFDD",
        "text-italic": "#FAAA8D",
        "cta-primary": "#50B2C0",
        "accent-green": "#9BFFC7",
        "dark-overlay": "#000000",
      },
      fontFamily: {
        pixelated: ["Courier New", "monospace"],
        brutalist: ["Inter", "system-ui", "sans-serif"],
        "space-grotesk": ["Space Grotesk", "sans-serif"],
      },
      fontSize: {
        "brutalist-xl": ["80px", { lineHeight: "1", letterSpacing: "0.05em" }],
        "brutalist-lg": [
          "48px",
          { lineHeight: "1.1", letterSpacing: "0.05em" },
        ],
        "brutalist-md": [
          "32px",
          { lineHeight: "1.2", letterSpacing: "0.02em" },
        ],
        "brutalist-sm": ["18px", { lineHeight: "1.6" }],
      },
      backgroundImage: {
        "grid-pattern": `
          linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
