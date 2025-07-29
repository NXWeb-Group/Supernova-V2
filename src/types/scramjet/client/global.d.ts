import { ScramjetClient } from './index'
export declare const UNSAFE_GLOBALS: string[]
export declare function createGlobalProxy(
  client: ScramjetClient,
  self: typeof globalThis,
): typeof globalThis
