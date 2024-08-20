// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'node:path'
import federation from '@originjs/vite-plugin-federation'

// import { resolve } from 'node:path'

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
    plugins: [
      federation({
        name: 'docGeneration',
        filename: 'remoteEntry.js',
        remotes: {
          mainApp: 'mainApp@https://doc-spawn-web-nuxt-git-microfronte-d14ccd-techtectechs-projects.vercel.app/_nuxt/remoteEntry.js', // Ensure the URL points to where the main app is running
        },
        shared: ['vue'],
      }),
    ],

  },
  srcDir: './src',
  modules: [
    'nuxt-primevue',
    'nuxt-gtag',
    '@nuxtjs/i18n',
  ],

  i18n: {
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
      { code: 'fr', name: 'Français', iso: 'fr-FR', file: 'fr.json' },
    ],
    lazy: true,
    langDir: '../lang/', // Simplified path
    defaultLocale: 'en',
    vueI18n: '../i18n.config.js',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'en',
    },
  },

  primevue: {
    options: {
      unstyled: false,
    },
    importPT: {
      // from: path.resolve(__dirname, './src/presets/lara/'),
      from: '../src/presets/lara/',
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
  plugins: [
    '~/plugins/fontawesome.js',
  ],
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
  runtimeConfig: {
    public: {
      BASE_URL: process.env.NUXT_API_BASE_URL,
      ADMIN_PASSWORD: process.env.NUXT_APP_ADMIN_PASSWORD,
      OUTSETA_API_KEY: process.env.OUTSETA_API_KEY,

    },
  },

})
