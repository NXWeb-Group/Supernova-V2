export function search(input: string) {
  const template = 'https://www.google.com/search?q=%s'
  try {
    // input is a valid URL:
    return new URL(input).toString()
  } catch {
    // Ignore invalid URL
  }

  try {
    const url = new URL(`http://${input}`)
    if (url.hostname.includes('.')) return url.toString()
  } catch {
    // Ignore invalid URL
  }

  return template.replace('%s', encodeURIComponent(input))
}

export function setFavicon(iconPath: string) {
  let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.href = iconPath
}

const isBrowser = typeof window !== 'undefined'

const wispUrl = isBrowser
  ? (location.protocol === 'https:' ? 'wss' : 'ws') + '://' + location.host + '/wisp/'
  : 'ws://localhost/wisp/'

const bareUrl = isBrowser
  ? location.protocol + '//' + location.host + '/bare/'
  : 'http://localhost/bare/'

export const defaultConfig = { proxy: 'uv', transport: 'epoxy', wisp: wispUrl, bare: bareUrl }

export async function setProxy(proxysel: string) {
  localStorage.setItem('proxy', proxysel)
}

export async function setTransportStorage(transportsel: string) {
  localStorage.setItem('transport', transportsel)
}
