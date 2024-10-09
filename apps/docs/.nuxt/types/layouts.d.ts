import { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default" | "page"
declare module "../../../../node_modules/.pnpm/nuxt@3.9.2_@parcel+watcher@2.4.0_@types+node@20.11.4_encoding@0.1.13_eslint@8.56.0_optionator_uaakc4xtodmo6u5zhtkbw6zi7e/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}