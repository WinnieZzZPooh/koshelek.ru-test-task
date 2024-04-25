import { defineStore } from 'pinia'

interface ILog {
  message: string
  time: number
}

interface ISettingsState {
  symbolsList: string[]
  symbol: string
  changeLogs: ILog[]
}

export const useSettingsStore = defineStore('settings', {
  state: (): ISettingsState => ({
    symbolsList: ['BTCUSDT', 'BNBBTC', 'ETHBTC'],
    symbol: 'BTCUSDT',
    changeLogs: []
  }),
  actions: {
    setChangeLogs(newLog: ILog) {
      this.changeLogs.unshift(newLog)
    },
    updateSymbol(newSymbol: string) {
      this.symbol = newSymbol
    }
  }
})
