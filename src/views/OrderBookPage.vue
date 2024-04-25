<template>
  <v-container fluid class="order-book-page">
    <v-row>
      <v-col cols="6">
        <h2>Bids</h2>
        <custom-data-table
          :headers="headers"
          :items="displayedBids"
          data-type="bids"
          price-color="#0ecb81"
          class="order-book-page__table"
        />
      </v-col>
      <v-col cols="6">
        <h2>Asks</h2>
        <custom-data-table
          :headers="headers"
          :items="displayedAsks"
          data-type="asks"
          price-color="#F6465D"
          class="order-book-page__table"
        />
      </v-col>
    </v-row>
    <v-select v-model="limit" :items="['100', '500', '1000']" label="Limit" />
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderBookStore } from '@/stores/orderBookStore'
import { useSettingsStore } from '@/stores/settingsStore'
import CustomDataTable from '@/components/CustomDataTable.vue'

const route = useRoute()
const store = useOrderBookStore()

const limit = ref('100')
const currentSymbol = ref(route.params.symbol as string || useSettingsStore().symbol)

const displayedBids = computed(() => {
  const data = store.bids.slice(0, parseInt(limit.value))
  return mapData(data)
})

const displayedAsks = computed(() => {
  const data = store.asks.slice(0, parseInt(limit.value))
  return mapData(data)
})

onMounted(() => {
  if (!store.ws) {
    useSettingsStore().updateSymbol(currentSymbol.value)
    store.fetchInitialOrderBook(currentSymbol.value).then(() => store.initializeWebSocket(currentSymbol.value))
  }
})

const mapData = (entries: any) =>
  entries.map((entry: any) => ({
    price: parseFloat(entry[0]).toFixed(2),
    quantity: parseFloat(entry[1]).toFixed(5),
    total: (parseFloat(entry[0]) * parseFloat(entry[1])).toFixed(2)
  }))

const headers = [
  { title: 'Price', value: 'price' },
  { title: 'Quantity', value: 'quantity' },
  { title: 'Total', value: 'total', align: 'end' }
]
</script>

<style lang="scss" scoped>
.order-book-page {
  padding: 8px 16px;

  &__table {
    height: calc(100vh - 196px);
    margin-bottom: 10px;
  }
}
</style>