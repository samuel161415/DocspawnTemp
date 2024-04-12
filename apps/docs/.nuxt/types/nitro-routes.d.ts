// Generated by nitro
import type { Serialize, Simplify } from 'nitropack'
declare module 'nitropack' {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/api/search': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../../../node_modules/.pnpm/@nuxt-themes+docus@1.15.0_nuxt@3.9.2_postcss@8.4.33_rollup@3.29.4_vue@3.4.14/node_modules/@nuxt-themes/docus/server/api/search').default>>>>
    }
    '/opensearch.xml': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../../../node_modules/.pnpm/@nuxt-themes+docus@1.15.0_nuxt@3.9.2_postcss@8.4.33_rollup@3.29.4_vue@3.4.14/node_modules/@nuxt-themes/docus/server/routes/opensearch.xml').default>>>>
    }
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../../../node_modules/.pnpm/nuxt@3.9.2_@types+node@20.11.4_eslint@8.56.0_rollup@3.29.4_typescript@5.3.3_vite@5.0.11/node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
    '/__studio.json': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../../../node_modules/.pnpm/@nuxthq+studio@1.0.11_rollup@3.29.4/node_modules/@nuxthq/studio/dist/runtime/server/routes/studio').default>>>>
    }
    '/api/component-meta': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../../../node_modules/.pnpm/nuxt-component-meta@0.6.3_rollup@3.29.4/node_modules/nuxt-component-meta/dist/runtime/server/api/component-meta.get').default>>>>
    }
    '/api/component-meta.json': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../../../node_modules/.pnpm/nuxt-component-meta@0.6.3_rollup@3.29.4/node_modules/nuxt-component-meta/dist/runtime/server/api/component-meta.get').default>>>>
    }
    '/api/component-meta/:component?': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../../../node_modules/.pnpm/nuxt-component-meta@0.6.3_rollup@3.29.4/node_modules/nuxt-component-meta/dist/runtime/server/api/component-meta.get').default>>>>
    }
    '/api/_mdc/highlight': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../../../node_modules/.pnpm/@nuxtjs+mdc@0.5.0_rollup@3.29.4/node_modules/@nuxtjs/mdc/dist/runtime/highlighter/event-handler').default>>>>
    }
    '/api/_content/query/:qid/**:params': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../../../node_modules/.pnpm/@nuxt+content@2.12.0_nuxt@3.9.2_rollup@3.29.4_vue@3.4.14/node_modules/@nuxt/content/dist/runtime/server/api/query').default>>>>
    }
    '/api/_content/query/:qid': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../../../node_modules/.pnpm/@nuxt+content@2.12.0_nuxt@3.9.2_rollup@3.29.4_vue@3.4.14/node_modules/@nuxt/content/dist/runtime/server/api/query').default>>>>
    }
    '/api/_content/query': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../../../node_modules/.pnpm/@nuxt+content@2.12.0_nuxt@3.9.2_rollup@3.29.4_vue@3.4.14/node_modules/@nuxt/content/dist/runtime/server/api/query').default>>>>
    }
    '/api/_content/cache.1712905096083.json': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../../../node_modules/.pnpm/@nuxt+content@2.12.0_nuxt@3.9.2_rollup@3.29.4_vue@3.4.14/node_modules/@nuxt/content/dist/runtime/server/api/cache').default>>>>
    }
    '/api/_content/navigation/:qid/**:params': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../../../node_modules/.pnpm/@nuxt+content@2.12.0_nuxt@3.9.2_rollup@3.29.4_vue@3.4.14/node_modules/@nuxt/content/dist/runtime/server/api/navigation').default>>>>
    }
    '/api/_content/navigation/:qid': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../../../node_modules/.pnpm/@nuxt+content@2.12.0_nuxt@3.9.2_rollup@3.29.4_vue@3.4.14/node_modules/@nuxt/content/dist/runtime/server/api/navigation').default>>>>
    }
    '/api/_content/navigation': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../../../node_modules/.pnpm/@nuxt+content@2.12.0_nuxt@3.9.2_rollup@3.29.4_vue@3.4.14/node_modules/@nuxt/content/dist/runtime/server/api/navigation').default>>>>
    }
  }
}
export {}