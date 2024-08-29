import { fileURLToPath, URL } from "url";
import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  // const { command, mode, isSsrBuild, isPreview } = configEnv
  // console.log(configEnv);
  String(configEnv);

  // console.log([
  //   `${chalk.yellowBright.bold("⌘")} ${chalk.cyanBright("defineConfig")}()`,
  //   `${chalk.dim(" ┗━┳━")} ${chalk.greenBright("command")}    : ${chalk.yellowBright(`"${command}"`)},`,
  //   `${chalk.dim("   ┣━")} ${chalk.greenBright("mode")}       : ${chalk.yellowBright(`"${mode}"`)},`,
  //   `${chalk.dim("   ┣━")} ${chalk.greenBright("isSsrBuild")} : ${chalk.yellowBright(isSsrBuild ? "☒ true | ☐ false" : "☐ true | ☒ false")},`,
  //   `${chalk.dim("   ┗━")} ${chalk.greenBright("isPreview")}  : ${chalk.yellowBright(isPreview ? "☒ true | ☐ false" : "☐ true | ☒ false")}`,
  // ].join("\n"))

  const r: UserConfig = {
    plugins: [react()],
    base: "/digai-frontend-hiring-challenge/",

    build: {},

    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };

  return r;
});
