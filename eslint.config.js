import js from '@eslint/js'
// import koa from 'eslint-config-koa/index'

export default [
  js.configs.recommended,

  {
    "env": {
        "browser": true,
        "node": true
    }
}
  ]
