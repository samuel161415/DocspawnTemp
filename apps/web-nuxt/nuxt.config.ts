// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'node:path'

export default defineNuxtConfig({
  vite: {
    build: {
      target: ['esnext', 'es2022'],
    },
    esbuild: {
      target: 'es2022',
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2022',
      },
    },
  },
  srcDir: './src',
  modules: [
    'nuxt-primevue',
    'nuxt-gtag',
  ],

  primevue: {
    options: {
      unstyled: false,
    },
    importPT: {
      from: path.resolve(__dirname, './src/presets/lara/'),
      // from: '../src/presets/lara/',
      as: 'TailwindLara',
    },
    components: {
      include: '*',
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
      name: 'slide-right',
      mode: 'out-in',
    },
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/scss/main.scss',
  ],

})
