import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        surface2: "var(--surface-2)",
        border: "var(--border)",
        text: "var(--text)",
        textMuted: "var(--text-muted)",
        accent: "var(--accent)",
        accentFg: "var(--accent-fg)",
        accent2: "var(--accent-2)",
        midnight: "var(--midnight)",
        midnightMuted: "var(--midnight-muted)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: [
          "clamp(2.75rem, 6vw + 1rem, 5.75rem)",
          { lineHeight: "1.02", letterSpacing: "-0.03em" },
        ],
      },
      maxWidth: {
        prose: "62ch",
      },
      boxShadow: {
        card: "0 1px 0 rgba(18,16,12,0.02), 0 30px 60px -40px rgba(18,16,12,0.35)",
        cardLift: "0 1px 0 rgba(18,16,12,0.02), 0 40px 80px -30px rgba(18,16,12,0.45)",
      },
    },
  },
  plugins: [animate],
};

export default config;
