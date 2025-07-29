import { ScramjetConfig, ScramjetInitConfig } from '../types'
import { ScramjetFrame } from './frame'
export class ScramjetController {
  #private
  private db
  constructor(config: Partial<ScramjetInitConfig>)
  init(): Promise<void>
  createFrame(frame?: HTMLIFrameElement): ScramjetFrame
  encodeUrl(url: string | URL): string
  decodeUrl(url: string | URL): string
  openIDB(): Promise<IDBDatabase>
  modifyConfig(newconfig: ScramjetConfig): Promise<void>
}
