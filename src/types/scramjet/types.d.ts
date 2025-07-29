import { ScramjetClient } from './client/index'
import { ScramjetFrame } from './controller/frame'
import { SCRAMJETCLIENT, SCRAMJETFRAME } from './symbols'
export type ScramjetFlags = {
  serviceworkers: boolean
  syncxhr: boolean
  naiiveRewriter: boolean
  strictRewrites: boolean
  rewriterLogs: boolean
  captureErrors: boolean
  cleanErrors: boolean
  scramitize: boolean
  sourcemaps: boolean
}
export interface ScramjetConfig {
  prefix: string
  globals: {
    wrapfn: string
    wrapthisfn: string
    trysetfn: string
    importfn: string
    rewritefn: string
    metafn: string
    setrealmfn: string
    pushsourcemapfn: string
  }
  files: {
    wasm: string
    all: string
    sync: string
  }
  flags: ScramjetFlags
  siteFlags: Record<string, Partial<ScramjetFlags>>
  codec: {
    encode: string
    decode: string
  }
}
export interface ScramjetInitConfig extends Omit<ScramjetConfig, 'codec' | 'flags'> {
  flags: Partial<ScramjetFlags>
  codec: {
    encode: (url: string) => string
    decode: (url: string) => string
  }
}
declare global {
  interface Window {
    COOKIE: string
    WASM: string
    REAL_WASM: Uint8Array
    [SCRAMJETCLIENT]: ScramjetClient
  }
  interface HTMLDocument {
    [SCRAMJETCLIENT]: ScramjetClient
  }
  interface HTMLIFrameElement {
    [SCRAMJETFRAME]: ScramjetFrame
  }
}
