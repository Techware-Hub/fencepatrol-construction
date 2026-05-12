/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#F97316",
          orangeDark: "#EA580C",
          blue: "#1E40AF",
          blueDeep: "#0B1E3F",
          green: "#16A34A",
          dark: "#0A0F1C",
          panel: "#0E1626",
        },
      },
      fontFamily: {
        display: ["Anton", "Impact", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg,#F97316 0%,#EA580C 40%,#1E40AF 100%)",
        "blue-glow": "radial-gradient(circle at 50% 0%,rgba(30,64,175,0.35),transparent 60%)",
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(249,115,22,0.35)",
        glowBlue: "0 0 40px rgba(30,64,175,0.45)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        marquee: "marquee 30s linear infinite",
        "spin-slow": "spin 14s linear infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
