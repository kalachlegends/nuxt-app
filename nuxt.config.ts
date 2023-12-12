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
  build: {
    transpile: ["class-validator"],
  },
  vite: {
    optimizeDeps: {
      exclude: ["class-validator"],
    },
  },
  runtimeConfig: { VITE_BASE_URL: process.env.VITE_BASE_URL },
  modules: [
    // ...
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "nuxt-primevue",
  ],
  alias: {
    "class-validator": "class-validator/cjs/index.js",
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
