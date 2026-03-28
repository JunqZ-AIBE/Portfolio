import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0C0C0E",
        surface: "rgba(255,255,255,0.03)",
        border: "rgba(255,255,255,0.07)",
        primary: "#E8E6E0",
        secondary: "rgba(232,230,224,0.5)",
        muted: "rgba(232,230,224,0.25)",
        accent: "#4AE3B5",
        "accent-bg": "rgba(74,227,181,0.10)",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-onest)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      backgroundImage: {
        "radial-accent":
          "radial-gradient(circle at 50% 50%, rgba(74,227,181,0.06) 0%, transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
