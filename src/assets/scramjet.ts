
import { ScramjetController } from "@mercuryworkshop/scramjet/bundled"

let scramjet: InstanceType<typeof ScramjetController>

try {
  scramjet = new ScramjetController({
    prefix: '/service/scramjet/',
    files: {
      wasm: '/scramjet/scramjet.wasm.wasm',
      all: '/scramjet/scramjet.all.js',
      sync: '/scramjet/scramjet.sync.js',
    },
    flags: {
      rewriterLogs: false,
    },
  })
} catch (err) {
  console.error('Failed to initialize ScramjetController:', err)
}

export { scramjet }
