
import type { CustomAppConfig } from 'nuxt/schema'
import type { Defu } from 'defu'
import cfg0 from "/Users/new/Desktop/TecTeccompany/DocSpawnRecent/DocSpawn/apps/docs/app.config"
import cfg1 from "/Users/new/Desktop/TecTeccompany/DocSpawnRecent/DocSpawn/node_modules/.pnpm/@nuxt-themes+docus@1.15.0_nuxt@3.9.2_postcss@8.4.33_rollup@3.29.4_vue@3.4.14/node_modules/@nuxt-themes/docus/app.config"
import cfg2 from "/Users/new/Desktop/TecTeccompany/DocSpawnRecent/DocSpawn/node_modules/.pnpm/@nuxt-themes+typography@0.11.0_postcss@8.4.33_rollup@3.29.4_vue@3.4.14/node_modules/@nuxt-themes/typography/app.config"
import cfg3 from "/Users/new/Desktop/TecTeccompany/DocSpawnRecent/DocSpawn/node_modules/.pnpm/@nuxt-themes+elements@0.9.5_postcss@8.4.33_rollup@3.29.4_vue@3.4.14/node_modules/@nuxt-themes/elements/app.config"

declare const inlineConfig = {
  "nuxt": {
    "buildId": "b3646f4c-b37e-4e59-bcb5-7f44aea698f7"
  }
}
type ResolvedAppConfig = Defu<typeof inlineConfig, [typeof cfg0, typeof cfg1, typeof cfg2, typeof cfg3]>
type IsAny<T> = 0 extends 1 & T ? true : false

type MergedAppConfig<Resolved extends Record<string, unknown>, Custom extends Record<string, unknown>> = {
  [K in keyof (Resolved & Custom)]: K extends keyof Custom
    ? unknown extends Custom[K]
      ? Resolved[K]
      : IsAny<Custom[K]> extends true
        ? Resolved[K]
        : Custom[K] extends Record<string, any>
            ? Resolved[K] extends Record<string, any>
              ? MergedAppConfig<Resolved[K], Custom[K]>
              : Exclude<Custom[K], undefined>
            : Exclude<Custom[K], undefined>
    : Resolved[K]
}

declare module 'nuxt/schema' {
  interface AppConfig extends MergedAppConfig<ResolvedAppConfig, CustomAppConfig> { }
}
declare module '@nuxt/schema' {
  interface AppConfig extends MergedAppConfig<ResolvedAppConfig, CustomAppConfig> { }
}
