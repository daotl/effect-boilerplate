import { unsafe } from '@effect-app/schema'
import { ClientEvents } from '@effect-app-boilerplate/resources'
import ReconnectingEventSource from 'reconnecting-eventsource'

import { bus } from './bus'
import { onMountedWithCleanup } from './onMountedWithCleanup'

const parseEvent = unsafe(ClientEvents.Parser)

function listener(message: MessageEvent<unknown>) {
  const evt = parseEvent(JSON.parse(message.data))
  bus.emit('serverEvents', evt)
}

function makeSource() {
  const src = new ReconnectingEventSource('/api/events')
  src.addEventListener('message', listener)
  return src
}

export function useApiEventSource() {
  onMountedWithCleanup(() => {
    const source = makeSource()

    return () => {
      // eslint-disable-next-line no-console
      console.log('$closing source')
      source.removeEventListener('message', listener)
      source.close()
    }
  })
}