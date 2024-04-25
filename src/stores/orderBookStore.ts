import { defineStore } from 'pinia'
import useBinanceApi from '@/services/binance/api'

const api = useBinanceApi()

interface IOrderBookState {
  lastUpdateId: number
  bids: Array<[string, string]>
  asks: Array<[string, string]>
  ws: WebSocket | null
}

export const useOrderBookStore = defineStore('orderBookStore', {
  state: (): IOrderBookState => ({
    bids: [],
    asks: [],
    lastUpdateId: -1,
    ws: null
  }),

  actions: {
    async fetchInitialOrderBook(symbol: string) {
      const data = await api.fetchOrderBook(symbol)
      this.lastUpdateId = data.lastUpdateId
      this.bids = data.bids
      this.asks = data.asks
    },

    initializeWebSocket(symbol: string) {
      this.ws = api.subscribeToOrderBook(symbol, (data) => {
        if (data.u <= this.lastUpdateId) {
          return
        }
        this.lastUpdateId = data.u
        this.updateOrderBook(data.b, data.a)
      })
    },

    updateOrderBook(newBids: Array<[string, string]>, newAsks: Array<[string, string]>) {
      this.bids = this.mergeOrderBookUpdates(this.bids, newBids)
      this.asks = this.mergeOrderBookUpdates(this.asks, newAsks)
    },

    mergeOrderBookUpdates(currentData: Array<[string, string]>, updates: Array<[string, string]>) {
      const updatedData = new Map(currentData.map((entry) => [entry[0], entry[1]]))
      for (const [price, qty] of updates) {
        if (qty === '0.00000000') {
          updatedData.delete(price)
        } else {
          updatedData.set(price, qty)
        }
      }
      return Array.from(updatedData).sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]))
    },

    reset() {
      this.bids = []
      this.asks = []
      if (this.ws) {
        this.ws.close()
        this.ws = null
      }
    }
  }
})
