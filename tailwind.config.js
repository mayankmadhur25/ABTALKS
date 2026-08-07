/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        card: "var(--card)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-faint": "var(--ink-faint)",
        line: "var(--line)",
        blue: "var(--blue)",
        "blue-deep": "var(--blue-deep)",
        pink: "var(--pink)",
        yellow: "var(--yellow)",
        green: "var(--green)",
      },
      fontFamily: {
        display: ["Unbounded", "system-ui", "sans-serif"],
        sans: ['"Instrument Sans"', "system-ui", "sans-serif"],
        mono: ['"DM Mono"', "ui-monospace", "monospace"],
      },
      keyframes: {
        pop: {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(1.12)" },
        },
      },
      animation: {
        pop: "pop 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
