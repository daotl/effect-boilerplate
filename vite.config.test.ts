/// <reference types="vitest" />

import fs from 'node:fs'
import AutoImport from 'unplugin-auto-import/vite'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import makeConfig from './vite.config.base'

// biome-ignore lint/style/noCommonJs: ignore
const pj = require('./package.json')

const _basePj = pj.name.replace('/root', '')

export default function defineTestConfig(
  dirName?: string,
  transform?: (
    cfg: UserConfig,
    useDist: boolean,
    useFullDist: boolean,
  ) => UserConfig,
  options: {
    useTransform?: boolean
    useFullDist?: boolean
    useDist?: boolean
  } = {
    useTransform: false,
    useDist: process.env.TEST_USE_DIST === 'true',
    useFullDist: process.env.TEST_USE_FULL_DIST === 'true',
  },
) {
  let {
    useDist = process.env.TEST_USE_DIST === 'true',
    useFullDist = process.env.TEST_USE_FULL_DIST === 'true',
    useTransform = false,
  } = options
  if (useFullDist) {
    useDist = true
  }

  const b = makeConfig(dirName, useDist, useTransform)
  // autoimport seems to work best, even if in some cases setting vitest/globals as types works.
  const autoImport = AutoImport({
    dts: './test/auto-imports.d.ts',
    // include: [
    //   /\.test\.[tj]sx?$/ // .ts, .tsx, .js, .jsx
    // ],
    imports: [
      'vitest',
      {
        '@effect-app/infra/vitest': [
          'describe',
          'it',
          'expect',
          'beforeAll',
          'afterAll',
          'beforeEach',
          'afterEach',

          'layer',

          'createRandomInstance',
          'createRandomInstanceI',

          'assert',
          'suite',
          'test',
        ],
      },
    ],
  })

  const d = dirName ? `${dirName}/` : ''
  const cfg = {
    ...b,
    plugins: [
      ...(b.plugins ?? []),
      ...(useFullDist
        ? [autoImport]
        : [
            ...(useTransform
              ? [
                  // biome-ignore lint/style/noCommonJs: ignore
                  require('@effect-app/compiler/vitePlugin2').effectPlugin({
                    tsconfig: fs.existsSync(`${d}tsconfig.test.local.json`)
                      ? `${d}tsconfig.test.local.json`
                      : `${d}tsconfig.test.json`,
                  }),
                ]
              : []),
            autoImport,
          ]),
    ],
    test: {
      ...b.test,
      include: useFullDist
        ? ['./test/**/*.test.{js,mjs,cjs,jsx}']
        : ['./test/**/*.test.{ts,mts,cts,tsx}'],
      exclude: ['**/node_modules/**'],
    },
    watchExclude: ['**/node_modules/**'],
    // forceRerunTriggers: ['**/package.json/**', '**/vitest.config.*/**', '**/vite.config.*/**', '**/dist/**']
  }
  // console.log("cfg", cfg)
  return defineConfig(transform ? transform(cfg, useDist, useFullDist) : cfg)
}
