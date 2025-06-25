/// <reference types="vitest" />
import fs from 'node:fs'
import path from 'node:path'
import type { UserConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// biome-ignore lint/style/noCommonJs: ignore
const pj = require('./package.json')

const basePj = pj.name.replace('/root', '')

export default function makeConfig(
  dirName?: string,
  useDist = process.env.TEST_USE_DIST === 'true',
  useTransform = false,
): UserConfig {
  const alias = (name: string) => ({
    [`${basePj}/${name}`]: path.join(
      __dirname,
      `/${name}/${useDist || useTransform ? 'dist' : 'src'}`,
    ),
  })
  const projects = ['api']
  const d = dirName ? `${dirName}/` : ''
  return {
    plugins: useDist
      ? []
      : useTransform
        ? [
            // biome-ignore lint/style/noCommonJs: ignore
            require('@effect-app/compiler/vitePlugin2').effectPlugin({
              tsconfig: dirName ? `${d}tsconfig.json` : undefined,
            }),
          ]
        : [
            tsconfigPaths({
              projects: projects.map(_ => path.join(__dirname, `/${_}`)),
            }),
          ],
    test: {
      include: useDist
        ? ['./dist/**/*.test.js']
        : ['./src/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      exclude: ['./test/**/*'],
      reporters: 'verbose',
      globals: true,
    },
    resolve: dirName
      ? {
          alias: {
            ...projects.reduce(
              // biome-ignore lint/performance/noAccumulatingSpread: ignore
              (acc, cur) => Object.assign(acc, alias(cur)),
              {},
            ),
            [JSON.parse(fs.readFileSync(`${dirName}/package.json`, 'utf-8'))
              .name]: path.join(dirName, useDist ? '/dist' : '/src'),
            '@opentelemetry/resources': path.resolve(
              __dirname,
              'node_modules/@opentelemetry/resources/build/src/index.js',
            ),
          },
        }
      : undefined,
  }
}
