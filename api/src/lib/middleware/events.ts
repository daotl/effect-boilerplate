import { makeSSE } from '@effect-app/infra/api/middlewares'
import { Effect } from 'effect-app'
import { ClientEvents } from '#resources'
import { Events } from '#services'

export const makeEvents = Effect.gen(function* () {
  const events = yield* Events
  return Effect.gen(function* () {
    const stream = yield* events.stream
    return yield* makeSSE(ClientEvents)(stream)
  })
})
