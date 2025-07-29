import type { URLMeta } from './shared/rewriters/url'
declare const _default: {
  fmt: (severity: string, message: string, ...args: any[]) => void
  print(severity: string, tag: string, message: string, ...args: any[]): void
  log: (message: string, ...args: any[]) => void
  warn: (message: string, ...args: any[]) => void
  error: (message: string, ...args: any[]) => void
  debug: (message: string, ...args: any[]) => void
  time(meta: URLMeta, before: number, type: string): void
}
export default _default
