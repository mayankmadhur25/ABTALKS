/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        line: "var(--line)",
        paper: "var(--paper)",
        muted: "var(--muted)",
        "muted-2": "var(--muted-2)",
        lamp: "var(--lamp)",
        "lamp-deep": "var(--lamp-deep)",
        "lamp-dim": "var(--lamp-dim)",
        ship: "var(--ship)",
        dark: "var(--dark)",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        sans: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      keyframes: {
        breathe: {
          "0%, 100%": { boxShadow: "0 0 10px 1px rgba(255,180,84,0.27)" },
          "50%": { boxShadow: "0 0 18px 4px rgba(255,180,84,0.6)" },
        },
      },
      animation: {
        breathe: "breathe 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
