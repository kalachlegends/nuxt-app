// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "url";

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/assets/css/main.css",
    "primevue/resources/themes/lara-light-indigo/theme.css",
    "~/assets/scss/main.scss",
  ],
  ssr: true,
  primevue: {
    components: { include: "*" },
    options: {
      ripple: true,
    },
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
    usePrimeVue: true,
    directives: {
      include: "*",
    },
  },
  runtimeConfig: { VITE_BASE_URL: process.env.VITE_BASE_URL },
  modules: [
    // ...
    "@pinia/nuxt",
    "nuxt-primevue",
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
