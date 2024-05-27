import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default" | "page"
declare module "../../../../node_modules/.pnpm/nuxt@3.11.2_@opentelemetry+api@1.8.0_@types+node@20.12.10_@unocss+reset@0.59.4_eslint@8.57.0__onpynyzvz5jo34mtxqysf4jme4/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}