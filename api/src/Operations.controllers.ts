import { Effect } from 'effect-app'
import { Router, matchFor } from '#api/lib/routing'
import { Operations } from '#api/services'
import { OperationsRsc } from '#resources'
import { OperationsDefault } from './lib/layers.js'

export default Router(OperationsRsc)({
  dependencies: [OperationsDefault],
  effect: Effect.gen(function* () {
    const operations = yield* Operations

    return matchFor(OperationsRsc)({
      FindOperation: ({ id }) =>
        operations.find(id).pipe(Effect.andThen(_ => _.value ?? null)),
    })
  }),
})
