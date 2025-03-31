/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import antfu from '@antfu/eslint-config'
import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt(
  antfu()
)
