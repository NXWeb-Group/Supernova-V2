import { BareMuxConnection } from '@mercuryworkshop/bare-mux'

let scramjet: ScramjetController
let conn: BareMuxConnection
try {
  conn = new BareMuxConnection('/baremux/worker.js')

  scramjet = new ScramjetController({
    prefix: '/service/scramjet/',
    files: {
      wasm: '/scramjet/scramjet.wasm.wasm',
      worker: '/scramjet/scramjet.worker.js',
      client: '/scramjet/scramjet.client.js',
      shared: '/scramjet/scramjet.shared.js',
      sync: '/scramjet/scramjet.sync.js',
    },
    flags: {
      rewriterLogs: false,
    },
  })
} catch (err) {
  console.error(err)
}

const wispUrl = (location.protocol === 'https:' ? 'wss' : 'ws') + '://' + location.host + '/wisp/'

const bareUrl = location.protocol + '//' + location.host + '/bare/'

export async function initTransport(transportsel: string) {
  try {
    if (transportsel == 'epoxy') {
      await conn.setTransport('/epoxy/index.mjs', [{ wisp: wispUrl }])
    } else if (transportsel == 'libcurl') {
      await conn.setTransport('/libcurl/index.mjs', [{ websocket: wispUrl }])
    } else {
      await conn.setTransport('/bareasmodule/index.mjs', [bareUrl])
    }
  } catch (err) {
    console.error(err)
  }
}

export { scramjet }
