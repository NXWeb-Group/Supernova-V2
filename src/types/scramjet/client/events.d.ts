import { ScramjetClient } from './index'
export type ScramjetEvent = NavigateEvent | UrlChangeEvent | ScramjetContextEvent
export type ScramjetEvents = {
  navigate: NavigateEvent
  urlchange: UrlChangeEvent
  contextInit: ScramjetContextEvent
}
export declare class NavigateEvent extends Event {
  url: string
  type: string
  constructor(url: string)
}
export declare class UrlChangeEvent extends Event {
  url: string
  type: string
  constructor(url: string)
}
export declare class ScramjetContextEvent extends Event {
  window: Self
  client: ScramjetClient
  type: string
  constructor(window: Self, client: ScramjetClient)
}
