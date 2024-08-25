import { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default" | "page"
declare module "../../../../node_modules/.pnpm/nuxt@3.9.2_@types+node@20.11.4_eslint@8.56.0_rollup@3.29.4_typescript@5.5.4_vite@5.0.11/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}