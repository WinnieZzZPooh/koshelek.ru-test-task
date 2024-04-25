<template>
  <v-container class="settings-page">
    <v-select v-model="selectedSymbol" :items="symbolsList" item-text="symbol" item-value="symbol" />
    <v-card>
      <v-card-title>Change Log</v-card-title>
      <v-card-text>
        <v-list dense class="settings-page__list">
          <v-list-item v-for="log in changeLogs" :key="log.time">
            <v-list-item-action>{{ log.message }}</v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useOrderBookStore } from '@/stores/orderBookStore'
import { useSettingsStore } from '@/stores/settingsStore'

const orderBookStore = useOrderBookStore()
const settingsStore = useSettingsStore()
const { changeLogs, symbolsList, symbol } = storeToRefs(settingsStore)

const selectedSymbol = ref(symbol.value)

watch(selectedSymbol, (newSymbol, oldSymbol) => {
  settingsStore.updateSymbol(newSymbol)
  orderBookStore.reset()

  const timestamp = new Date().toLocaleTimeString()
  settingsStore.setChangeLogs({
    message: `Changed from ${oldSymbol} to ${newSymbol} at ${timestamp}`,
    time: Date.now()
  })
})
</script>

<style lang="scss" scoped>
.settings-page {
  &__list {
    height: calc(100vh - 240px);
  }
}
</style>
