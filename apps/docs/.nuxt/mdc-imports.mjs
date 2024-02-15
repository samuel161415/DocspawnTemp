import Highlight from '/Users/new/Desktop/TecTeccompany/DocSpawn/node_modules/.pnpm/@nuxtjs+mdc@0.5.0_rollup@3.29.4/node_modules/@nuxtjs/mdc/dist/runtime/highlighter/rehype.mjs'

export const remarkPlugins = {
}

export const rehypePlugins = {
  'highlight': { instance: Highlight, options: {} },
}

export const highlight = {"theme":{"dark":"github-dark","default":"github-light"}}