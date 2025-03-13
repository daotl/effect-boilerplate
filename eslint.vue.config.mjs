// @ts-check
import path from "node:path"
import { fileURLToPath } from "node:url"
import { config } from '@daotl/eslint-config'
import { Linter } from "eslint"
import { FlatConfigComposer } from "eslint-flat-config-utils"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * @param {...import('@antfu/eslint-config').Awaitable<import('@antfu/eslint-config').TypedFlatConfigItem | import('@antfu/eslint-config').TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>} userConfigs
 * @returns {import("eslint-flat-config-utils").FlatConfigComposer<import("@antfu/eslint-config").TypedFlatConfigItem, import('@antfu/eslint-config').ConfigNames>}
 */
export function vueConfig(...userConfigs) {
  return config({
    unocss: true,
  }, {
    ignores: ['cypress', '.nx', '**/*.md', 'tsconfig.*'],
  }, {
    languageOptions: {
      parserOptions: {
        project: [`${__dirname}/tsconfig.eslint.json`],
        extraFileExtensions: ['.vue'],
      },
    },
  }, ...userConfigs)
}
