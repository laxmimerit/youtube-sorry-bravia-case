/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#087A58",
        "primary-strong": "#066748",
        "primary-ink": "#065F43",
        "primary-soft": "#EEFAF5",
        "primary-soft-2": "#DCF3EA",
        "primary-border": "#B9E6D6",
        "on-primary": "#FFFFFF",
        "primary-bright": "#34D399",
        secondary: "#0D1117",
        "on-secondary": "#FFFFFF",
        neutral: "#FFFFFF",
        surface: "#FFFFFF",
        "surface-2": "#FBFCFD",
        "surface-muted": "#F7F8FA",
        "surface-sunken": "#F2F4F7",
        "on-surface": "#363C47",
        "on-surface-strong": "#0D1117",
        "on-surface-variant": "#5B6472",
        "on-surface-muted": "#697382",
        outline: "#E7EAEF",
        "outline-strong": "#D6DBE3",
        error: "#D61F26",
        "on-error": "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(13,17,23,.05), 0 6px 16px -10px rgba(13,17,23,.14)",
        raised: "0 2px 6px rgba(13,17,23,.04), 0 18px 44px -22px rgba(13,17,23,.22)",
        float: "0 4px 10px rgba(13,17,23,.05), 0 34px 70px -30px rgba(13,17,23,.28)",
        input: "0 1px 2px rgba(13,17,23,.04)",
      },
      borderRadius: {
        sm: "12px",
        md: "18px",
        lg: "26px",
      },
      maxWidth: {
        shell: "1180px",
        "shell-narrow": "880px",
      },
      animation: {
        ticker: "ticker 46s linear infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
