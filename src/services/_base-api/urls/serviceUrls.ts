export enum ApiService {
  BINANCE_SERVICE = 'BINANCE_SERVICE',
  BINANCE_STREAM = 'BINANCE_STREAM'
}

export const apiServiceUrls: Record<ApiService, string> = {
  BINANCE_SERVICE: 'https://api.binance.com/api/v3',
  BINANCE_STREAM: 'wss://stream.binance.com:9443/ws',
}
