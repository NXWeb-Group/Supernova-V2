import { URLMeta } from './url'
export declare function rewriteJs(
  js: string | Uint8Array,
  url: string | null,
  meta: URLMeta,
  module?: boolean,
): any
export declare function rewriteJsWithMap(
  js: string | Uint8Array,
  url: string | null,
  meta: URLMeta,
  module?: boolean,
):
  | {
      js: string | Uint8Array
      map: Uint8Array | null
      tag: string
    }
  | {
      js: any
      tag: string
      map: any
    }
