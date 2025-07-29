interface ScramjetControllerOptions {
  prefix: string
  globals?: {
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
    shared: string
    worker: string
    client: string
    sync: string
  }
  flags?: {
    serviceworkers?: boolean
    syncxhr?: boolean
    naiiveRewriter?: boolean
    strictRewrites?: boolean
    rewriterLogs?: boolean
    captureErrors?: boolean
    cleanErrors?: boolean
    scramitize?: boolean
    sourcemaps?: boolean
  }
  siteFlags?: {}
  codec?: {
    encode: string
    decode: string
  }
}

declare global {
  interface Window {
    iframeurl: string
  }

  declare const __uv$config: {
    prefix: string
    encodeUrl: (url: string) => string
    decodeUrl: (url: string) => string
    handler: string
    client: string
    bundle: string
    config: string
    sw: string
  }

  declare class ScramjetController {
    constructor(options: ScramjetControllerOptions)

    encodeUrl(url: string): string
    init(): void
  }
}

export {}
