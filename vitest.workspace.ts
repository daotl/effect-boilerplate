import * as path from 'node:path'
import { type UserWorkspaceConfig, defineWorkspace } from 'vitest/config'

// Remaining issues:
// - Random failures (browser): https://github.com/vitest-dev/vitest/issues/4497
// - Alias resolution (browser, has workaround): https://github.com/vitest-dev/vitest/issues/4744
// - Workspace optimization: https://github.com/vitest-dev/vitest/issues/4746

// TODO: Once https://github.com/vitest-dev/vitest/issues/4497 and https://github.com/vitest-dev/vitest/issues/4746
// are resolved, we can create specialized workspace groups in separate workspace files to better control test groups
// with different dependencies (e.g. playwright browser) in CI.

// biome-ignore lint/correctness/noUnusedVariables: keep
const project = (
  config: UserWorkspaceConfig['test'] & { name: `${string}|${string}` },
  root = config.root ??
    path.join(__dirname, `packages/${config.name.split('|').at(0)}`),
) => ({
  // extends: "vitest.shared.ts",
  test: { root, ...config },
})

export default defineWorkspace([
  // Add specialized configuration for some packages.
  // project({ name: "effect|browser", environment: "happy-dom" }),
  // project({ name: "schema|browser", environment: "happy-dom" }),
  // Add the default configuration for all packages.
  '*',
])
