const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  vue: {
    overrides: {
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      }],
    },

  },
  rules: {
    'no-undef': 'off', // Disable no-undef for Vue Composition API functions
  },
})
