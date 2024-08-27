import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [],
  darkMode: "media", // or 'class'
  theme: {
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