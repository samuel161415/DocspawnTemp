// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';

export default defineNuxtConfig({
  srcDir: "./src",
  modules: [
    'nuxt-primevue'
  ],
  primevue: {
    options: {
      unstyled: true,
    },
    importPT: {
      from: path.resolve(__dirname, "./src/presets/lara/"),
      as: "TailwindLara"
    },
    components: {
      include: "*",
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    layoutTransition: {
      name: "slide-right",
      mode: "out-in",
    },
  },
  css: ["~/assets/scss/main.scss"],

})
