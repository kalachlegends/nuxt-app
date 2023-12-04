// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "url";

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  ssr: true,
  runtimeConfig: { VITE_BASE_URL: process.env.VITE_BASE_URL },
  modules: [
    // ...
    "@pinia/nuxt",
  ],
  alias: {
    "@style": fileURLToPath(new URL("./assets/scss/", import.meta.url)),
    "@page": fileURLToPath(new URL("./components/page/", import.meta.url)),
    "@": fileURLToPath(new URL("./", import.meta.url)),
    "@helper": fileURLToPath(new URL("./helper/", import.meta.url)),
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
