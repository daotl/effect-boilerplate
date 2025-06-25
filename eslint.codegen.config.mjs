// @ts-nocheck
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tsParser from '@typescript-eslint/parser'
import codegen from 'eslint-plugin-codegen'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * @param {string} dirName
 * @param {boolean} [forceTS=false]
 * @returns {import("eslint").Linter.FlatConfig[]}
 */
export function baseConfig(dirName, forceTS = false, _project = undefined) {
  const enableTS = !!dirName && (forceTS || process.env.ESLINT_TS)
  return [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
      ignores: [
        '**/*.js',
        // "**/*.mjs",
        // "**/*.cjs",
        '**/*.jsx',
        '**/*.d.ts',
        '**/node_modules/**',
        'vitest.config.ts',
        'vitest.config.test.ts',
        'vite.config.ts',
        'eslint.*.mjs',
      ],
    },
    {
      // otherwise this config object doesn't apply inside vue files
      // I mean the rules are not applied, the plugins are not loaded
      // files: ["**/*.ts", "**/*.tsx"],
      name: 'base',
      languageOptions: {
        parser: tsParser,
        parserOptions: {
          extraFileExtensions: ['.vue'], // should be the same as vue config for perfomance reasons (https://typescript-eslint.io/troubleshooting/typed-linting/performance#project-service-issues)
          ...(enableTS && {
            tsconfigRootDir: dirName,
            projectService: true,
          }),
        },
      },
      plugins: {
        codegen,
      },
    },
  ]
}

/**
 * @param {string} dirName
 * @param {boolean} [forceTS=false]
 * @returns {import("eslint").Linter.FlatConfig[]}
 */
export function augmentedConfig(dirName, forceTS = false, project = undefined) {
  return [
    ...baseConfig(dirName, forceTS, project),
    {
      name: 'augmented',
      rules: {
        'codegen/codegen': [
          'error',
          {
            presets: '@effect-app/eslint-codegen-model/dist/presets/index.js',
          },
        ],
      },
    },
  ]
}
