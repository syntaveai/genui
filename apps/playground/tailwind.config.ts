const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", ...fontFamily.sans],
        mono: ["JetBrains Mono", ...fontFamily.mono],
      },
      colors: {
        syntave: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          500: "#737373",
          800: "#262626",
          900: "#171717",
        },
      },
    },
  },
  plugins: [],
};
