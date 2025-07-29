import { ScramjetClient } from '../index'
export declare const order = 2
export declare const enabled: (client: ScramjetClient) => boolean
export declare function disabled(_client: ScramjetClient, _self: Self): void
export default function (client: ScramjetClient, _self: Self): void
