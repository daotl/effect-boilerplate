import { Effect } from 'effect-app'
import { Router, matchFor } from '#api/lib/routing'
import { UserRepo } from '#api/services'
import { AccountsRsc } from '#resources'

export default Router(AccountsRsc)({
  dependencies: [UserRepo.Default],
  effect: Effect.gen(function* () {
    const userRepo = yield* UserRepo

    return matchFor(AccountsRsc)({
      GetMe: userRepo.getCurrentUser,
    })
  }),
})
