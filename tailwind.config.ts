import type { Config } from "tailwindcss";
import twDefaultTheme from "tailwindcss/defaultTheme"
import twDefaultColors from "tailwindcss/colors"

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./src/**/*.tsx"],
  presets: [],
  darkMode: "media", // or 'class'
  theme: {
    ...twDefaultTheme,
    colors: {
      ...twDefaultColors,
    },
    extend: {},
  },
  // node_modules/tailwindcss/types/generated/corePluginList.d.ts
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
  ],
} satisfies Config;
