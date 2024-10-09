import Highlight from 'C:/non windowa/Tec.tech/docspawn/DocSpawn/node_modules/.pnpm/@nuxtjs+mdc@0.5.0_rollup@4.9.5/node_modules/@nuxtjs/mdc/dist/runtime/highlighter/rehype.mjs'

export const remarkPlugins = {
}

export const rehypePlugins = {
  'highlight': { instance: Highlight, options: {} },
}

export const highlight = {"theme":{"dark":"github-dark","default":"github-light"}}