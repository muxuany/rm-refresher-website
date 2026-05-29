import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        peach: "#F3A3A0",
        coral: "#E96F6B",
        blush: "#FFF2EE",
        cream: "#FFF8EF",
        beige: "#EED8C0",
        "milk-tea": "#6B3F2E",
        rosewood: "#9A6B62",
        espresso: "#3F261E",
        taro: "#DCC8F2",
        caramel: "#C98A54"
      },
      boxShadow: {
        glow: "0 20px 80px rgba(233, 111, 107, 0.18)",
        soft: "0 18px 50px rgba(63, 38, 30, 0.1)"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"]
      },
      backgroundImage: {
        "peach-radial":
          "radial-gradient(circle at top left, rgba(243, 163, 160, 0.35), transparent 44%), radial-gradient(circle at bottom right, rgba(238, 216, 192, 0.52), transparent 42%)"
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(24px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)"
          },
          "50%": {
            transform: "translateY(-10px)"
          }
        }
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out both",
        float: "float 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
