import { FakeServiceWorker } from './fakesw'
import BareClient from '@mercuryworkshop/bare-mux'
import { ScramjetConfig } from '../types'
import { CookieStore } from '../shared/cookie'
export declare class ScramjetServiceWorker extends EventTarget {
  client: BareClient
  config: ScramjetConfig
  syncPool: Record<number, (val?: any) => void>
  synctoken: number
  cookieStore: CookieStore
  serviceWorkers: FakeServiceWorker[]
  constructor()
  dispatch(client: Client, data: MessageW2C): Promise<MessageC2W>
  loadConfig(): Promise<void>
  route({ request }: FetchEvent): boolean
  fetch({ request, clientId }: FetchEvent): Promise<any>
}
type RegisterServiceWorkerMessage = {
  scramjet$type: 'registerServiceWorker'
  port: MessagePort
  origin: string
}
type CookieMessage = {
  scramjet$type: 'cookie'
  cookie: string
  url: string
}
type ConfigMessage = {
  scramjet$type: 'loadConfig'
  config: ScramjetConfig
}
type MessageCommon = {
  scramjet$type: string
  scramjet$token?: number
}
type MessageTypeC2W = RegisterServiceWorkerMessage | CookieMessage | ConfigMessage
type MessageTypeW2C = CookieMessage
export type MessageC2W = MessageCommon & MessageTypeC2W
export type MessageW2C = MessageCommon & MessageTypeW2C
export {}
