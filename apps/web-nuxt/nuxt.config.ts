// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'

// import federation from '@originjs/vite-plugin-federation'

// import { resolve } from 'node:path'

export default defineNuxtConfig({
  experimental: {
    asyncEntry: true,
  },

  vite: {

    build: {
      target: ['esnext', 'es2022'],
      modulePreload: false,
      minify: false,
      cssCodeSplit: false,

    },
    esbuild: {
      target: 'es2022',
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2022',
      },
    },

    server: {
      cors: { origin: '*' },
    },

  },

  build: {
    transpile: [/@syncfusion/],
  },
  devServer: {
    port: 3001,

  },
  srcDir: './src',
  modules: [
    'nuxt-primevue',
    'nuxt-gtag',
    '@nuxtjs/i18n',
    'nuxt-tiptap-editor',
  ],
  tiptap: {
    prefix: 'Tiptap', // This prefix will be used for importing Tiptap components
  },

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
  // plugins: [
  //   '~/plugins/fontawesome.js',
  //   '~/plugins/vue-recaptcha.js',
  //   '~/plugins/syncfusion.js',
  //   '~/plugins/syncfusion-components.js',
  // ],
  app: {
    layoutTransition: {
      name: 'slide-right',
      mode: 'out-in',
    },
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/scss/main.scss',
    // 'node_modules/@syncfusion/ej2-base/styles/material.css',

    '@syncfusion/ej2-base/styles/material.css',
    '@syncfusion/ej2-buttons/styles/material.css',
    '@syncfusion/ej2-inputs/styles/material.css',
    '@syncfusion/ej2-popups/styles/material.css',
    '@syncfusion/ej2-lists/styles/material.css',
    '@syncfusion/ej2-navigations/styles/material.css',
    '@syncfusion/ej2-splitbuttons/styles/material.css',
    '@syncfusion/ej2-dropdowns/styles/material.css',
    '@syncfusion/ej2-vue-documenteditor/styles/material.css',
    '@syncfusion/ej2-vue-navigations/styles/material.css',

  ],
  runtimeConfig: {
    public: {
      BASE_URL: process.env.NUXT_API_BASE_URL,
      ADMIN_PASSWORD: process.env.NUXT_APP_ADMIN_PASSWORD,

    },
  },
  // routeRules: {
  //   // Other route rules...

  //   // Add CORS headers to remoteEntry.js
  //   '/_nuxt/remoteEntry.js': { cors: true },
  //   // Add CORS headers to all assets in the _nuxt directory
  //   '/_nuxt/**': {
  //     headers: {
  //       'Access-Control-Allow-Origin': '*', // Allow all origins
  //       'Access-Control-Allow-Methods': 'GET,OPTIONS', // Allow specific methods
  //       'Access-Control-Allow-Headers': 'Content-Type', // Allow specific headers
  //     },
  //   },

  //   // Add CORS headers to all API routes
  //   '/api/**': { cors: true },
  // },

})
