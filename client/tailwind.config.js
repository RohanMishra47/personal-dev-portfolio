/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF7",
        ink: "#1C1D1A",
        pine: {
          DEFAULT: "#2B4C3F",
          light: "#3D6A57",
          dark: "#1E3A30",
        },
        graphite: "#8A6A4B",
        brick: "#C0392B",
        hairline: "#E4E1D6",
      },
      fontFamily: {
        serif: ["'Source Serif 4'", "ui-serif", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Type scale following a ~1.25 ratio, tuned for a report/notebook feel
        xs: ["0.8rem", { lineHeight: "1.5" }],
        sm: ["0.9rem", { lineHeight: "1.6" }],
        base: ["1.0625rem", { lineHeight: "1.75" }],
        lg: ["1.25rem", { lineHeight: "1.7" }],
        xl: ["1.6rem", { lineHeight: "1.4" }],
        "2xl": ["2rem", { lineHeight: "1.25" }],
        "3xl": ["2.75rem", { lineHeight: "1.15" }],
        "4xl": ["3.75rem", { lineHeight: "1.05" }],
        "5xl": ["4.5rem", { lineHeight: "1.0" }],
      },
      maxWidth: {
        prose: "65ch",
      },
    },
  },
  plugins: [],
};
