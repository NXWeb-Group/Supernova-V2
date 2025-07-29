import { ScramjetController } from './index'
import type { ScramjetClient } from '../client/index'
import { ScramjetEvents } from '../client/events'
export declare class ScramjetFrame extends EventTarget {
  private controller
  frame: HTMLIFrameElement
  constructor(controller: ScramjetController, frame: HTMLIFrameElement)
  get client(): ScramjetClient
  get url(): URL
  go(url: string | URL): void
  back(): void
  forward(): void
  reload(): void
  addEventListener<K extends keyof ScramjetEvents>(
    type: K,
    listener: (event: ScramjetEvents[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ): void
}
