
import { updateAppConfig } from '#app/config'
import { defuFn } from 'defu'

const inlineConfig = {
  "nuxt": {
    "buildId": "dev"
  }
}

// Vite - webpack is handled directly in #app/config
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    updateAppConfig(newModule.default)
  })
}

import cfg0 from "C:/non windowa/Tec.tech/docspawn/DocSpawn/apps/docs/app.config.ts"
import cfg1 from "C:/non windowa/Tec.tech/docspawn/DocSpawn/node_modules/.pnpm/@nuxt-themes+docus@1.15.0_change-case@4.1.2_nuxt@3.9.2_@parcel+watcher@2.4.0_@types+node@20.1_lyrzpxpbfjjtltlqkgz2uwzgpe/node_modules/@nuxt-themes/docus/app.config.ts"
import cfg2 from "C:/non windowa/Tec.tech/docspawn/DocSpawn/node_modules/.pnpm/@nuxt-themes+typography@0.11.0_postcss@8.4.33_rollup@4.9.5_sass@1.70.0_vue@3.4.14_typescript@5.6.3_/node_modules/@nuxt-themes/typography/app.config.ts"
import cfg3 from "C:/non windowa/Tec.tech/docspawn/DocSpawn/node_modules/.pnpm/@nuxt-themes+elements@0.9.5_postcss@8.4.33_rollup@4.9.5_sass@1.70.0_vue@3.4.14_typescript@5.6.3_/node_modules/@nuxt-themes/elements/app.config.ts"

export default /*@__PURE__*/ defuFn(cfg0, cfg1, cfg2, cfg3, inlineConfig)
