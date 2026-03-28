import nextConfig from 'eslint-config-next'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  {
    ignores: ['node_modules', '.next', 'out', 'public', 'eslint.config.mjs']
  },
  ...nextConfig,
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prettier/prettier': 'warn'
    }
  }
]
