import { Option } from '@effect-app/prelude'
// import { UsersRsc } from "@macs-configurator/resources"
import { makeHeadersHashMap, makeRuntime } from './shared.js'

const baseUrl = process.env['BASE_URL'] ?? 'http://localhost:5500'

export function makeRuntimes(namespace: string) {
  const apiUrl = `${baseUrl}/api/api`
  const { runtime: anonRuntime } = makeRuntime({
    apiUrl,
    headers: Option.some(makeHeadersHashMap(namespace)),
  })

  // const { runtime: managerRuntime } = makeRuntime(
  //   {
  //     apiUrl,
  //     headers: Option.some(makeHeadersHashMap(namespace, "manager"))
  //   }
  // )
  // const { runtime: userRuntime } = makeRuntime(
  //   {
  //     apiUrl,
  //     headers: Option.some(makeHeadersHashMap(namespace, "user"))
  //   }
  // )

  return {
    anonRuntime,
    // managerRuntime,
    // userRuntime
  }
}
