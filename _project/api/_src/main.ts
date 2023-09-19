/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@effect-app-boilerplate/api/api'
import { ApiConfig, BaseConfig } from './config.js'
import { Emailer, MemQueue } from './services.js'

import { runMain } from '@effect-app-boilerplate/messages/basicRuntime'
import { runtimeDebug } from '@effect/data/Debug'

runtimeDebug.traceStackLimit = 50
const appConfig = BaseConfig.config.runSync$
if (process.argv.includes('--debug') || appConfig.env === 'local-dev') {
  runtimeDebug.minumumLogLevel = 'Debug'
  runtimeDebug.tracingEnabled = true
  runtimeDebug.traceStackLimit = 100
  // runtimeDebug.filterStackFrame = _ => true
}

// Sentry.init({
//   dsn: appConfig.sentry.dsn.value,
//   environment: appConfig.env,
//   enabled: appConfig.env !== "local-dev",
//   release: appConfig.apiVersion,
//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0
// })

const main = Effect.gen(function* ($) {
  const apiConfig = yield* $(ApiConfig.config)
  const cfg = { ...appConfig, ...apiConfig }
  console.debug(`Config: ${JSON.stringify(cfg, undefined, 2)}`)

  return yield* $(Effect.never().scoped.provideLayer(api(cfg)))
})

// NOTE: all dependencies should have been provided, for us to be able to run the program.
// if you get a type error here on the R argument, you haven't provided that dependency yet, or not at the appropriate time / location
const program = main.provideSomeLayer(
  (appConfig.sendgrid.apiKey
    ? Emailer.LiveSendgrid(Config(appConfig.sendgrid))
    : Emailer.Fake) > MemQueue.Live,
)

// NOTE: all dependencies should have been provided, for us to be able to run the program.
// if you get a type error here on the R argument, you haven't provided that dependency yet, or not at the appropriate time / location
runMain(program)
