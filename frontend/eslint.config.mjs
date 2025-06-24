/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { vueConfig } from "../eslint.vue.config.mjs"
import nuxt from "./.nuxt/eslint.config.mjs"

export default nuxt(
  vueConfig({
    rules: {
      // 'unicorn/no-abusive-eslint-disable': 'off',
    },
  }, {
    name: "vue",
    files: ["*.vue", "**/*.vue"],
  }, {
    files: ["pages/**/*.vue", "components/**/*.vue", "layouts/**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
    },
  })
)
