export type ApiBinanceDepthDto = {
  lastUpdateId: number
  bids: Array<[string, string]>
  asks: Array<[string, string]>
}

export type ApiOrderBookLevel = {
  price: string
  quantity: string
}
