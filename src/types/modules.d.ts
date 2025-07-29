import * as controller from './scramjet/controller/index'

declare global {
  interface Window {
    iframeurl: string
  }

  function $scramjetLoadController(): typeof controller

  const __uv$config: {
    prefix: string
    encodeUrl: (url: string) => string
    decodeUrl: (url: string) => string
    handler: string
    client: string
    bundle: string
    config: string
    sw: string
  }
}

export {}
