export type SlippageMode = false | 'price' | 'bps'
declare module 'test.worker' {
  // You need to change `Worker`, if you specified a different value for the `workerType` option
  class WebpackWorker extends Worker {
    constructor()
  }

  // Uncomment this if you set the `esModule` option to `false`
  // export = WebpackWorker;
  export default WebpackWorker
}

export interface AggregatorPayload {
  op: string
  data?: any
  trackingId?: string
}

export interface AggregatedTrade extends Trade {
  prices: number
  count: number
  timeout: number
}

export interface AggregatorSettings {
  calculateSlippage?: SlippageMode
  aggregateTrades?: boolean
  preferQuoteCurrencySize?: boolean
  buckets?: { [bucketId: string]: string[] }
}

export interface Market {
  id: string
  exchange: string
  pair: string
}

export interface Trade {
  exchange: string
  pair: string
  timestamp: number
  price: number
  size: number
  side: 'buy' | 'sell'
  count?: number
  originalPrice?: number
  liquidation?: boolean
  slippage?: number
}

export interface QueuedTrade extends Trade {
  timeout?: number
}

export interface Volumes {
  vbuy: number
  vsell: number
  cbuy: number
  csell: number
  lbuy: number
  lsell: number
}

export interface Connection {
  exchange: string
  pair: string
  hit: number
  timestamp: number
  bucket?: Volumes
}

export interface ProductsStorage {
  exchange: string
  timestamp?: number
  data: ProductsData
}

export interface GifsStorage {
  slug: string
  keyword: string
  timestamp?: number
  data: string[]
}
export interface Workspace {
  createdAt: number
  updatedAt: number
  id: string
  name: string
  states: { [id: string]: any }
}

export type ProductsData = string[] | { [prop: string]: any }
