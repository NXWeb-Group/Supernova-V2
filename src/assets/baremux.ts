import { BareMuxConnection } from '@mercuryworkshop/bare-mux'
import { defaultConfig } from './stuff'

let conn: BareMuxConnection
try {
  conn = new BareMuxConnection('/baremux/worker.js')
} catch (err) {
  console.error(err)
}

export async function initTransport(transportsel: string) {
  const wispUrl = localStorage.getItem('wisp') || defaultConfig.wisp
  const bareUrl = localStorage.getItem('bare') || defaultConfig.bare
  try {
    if (transportsel == 'epoxy') {
      await conn.setTransport('/epoxy/index.mjs', [{ wisp: wispUrl }])
    } else if (transportsel == 'libcurl') {
      await conn.setTransport('/libcurl/index.mjs', [{ websocket: wispUrl }])
    } else {
      await conn.setTransport('/bareasmodule/index.mjs', [bareUrl])
    }
    console.log(await conn.getTransport())
  } catch (err) {
    console.error(err)
  }
}
