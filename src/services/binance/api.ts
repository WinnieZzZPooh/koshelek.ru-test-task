import BaseApi from '@/services/_base-api/BaseApi'
import { ApiService, apiServiceUrls } from '@/services/_base-api/urls/serviceUrls'
import type { ApiBinanceDepthDto } from '@/services/_types/ApiBinance'

type OrderBookCallback = (data: Record<string, any>) => void

class BinanceApi extends BaseApi {
  public fetchOrderBook(symbol: string, limit: number = 1000): Promise<ApiBinanceDepthDto> {
    return this.get<ApiBinanceDepthDto>(
      `/depth?symbol=${symbol}&limit=${limit}`,
      ApiService.BINANCE_SERVICE
    )
  }

  public subscribeToOrderBook(symbol: string, callback: OrderBookCallback): WebSocket {
    const streamSymbol = symbol.toLowerCase()
    const ws = new WebSocket(`${apiServiceUrls[ApiService.BINANCE_STREAM]}/${streamSymbol}@depth`)

    ws.onmessage = (event) => {
      const data: Record<string, any> = JSON.parse(event.data)
      callback(data)
    }

    return ws
  }
}

const binanceApi = new BinanceApi()

export default function useBinanceApi() {
  return binanceApi
}
