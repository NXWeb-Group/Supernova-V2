addEventListener(
  'message',
  ({
    data: {
      sab: e,
      args: [t, n, s, r, o],
      body: a,
      headers: g,
    },
  }) => {
    let i = new DataView(e),
      l = new Uint8Array(e),
      d = new XMLHttpRequest()
    if (((d.responseType = 'arraybuffer'), d.open(t, n, !0, r, o), g))
      for (let [e, t] of Object.entries(g)) d.setRequestHeader(e, t)
    d.send(a),
      (d.onload = () => {
        let t = 1
        i.setUint16(t, d.status), (t += 2)
        let n = d.getAllResponseHeaders()
        i.setUint32(t, n.length),
          (t += 4),
          e.byteLength < t + n.length && e.grow(t + n.length),
          l.set(new TextEncoder().encode(n), t),
          (t += n.length),
          i.setUint32(t, d.response.byteLength),
          (t += 4),
          e.byteLength < t + d.response.byteLength && e.grow(t + d.response.byteLength),
          l.set(new Uint8Array(d.response), t),
          i.setUint8(0, 1)
      }),
      (d.ontimeout =
        d.onerror =
        d.onabort =
          () => {
            console.error('xhr failed'), i.setUint8(0, 1)
          })
  },
)
//# sourceMappingURL=scramjet.sync.js.map
