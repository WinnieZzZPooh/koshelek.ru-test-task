<template>
  <v-data-table-virtual
    :headers="filteredHeaders"
    :items="items"
    :fixed-header="true"
    class="custom-table"
    density="compact"
  >
    <template v-slot:item="{ item }">
      <tr class="custom-table__row" :style="{ background: getRowBackgroundColor(item.quantity) }">
        <td :style="{ color: priceColor }">{{ item.price }}</td>
        <td v-if="isDesktop">{{ item.quantity }}</td>
        <td>{{ item.total }}</td>
      </tr>
    </template>
  </v-data-table-virtual>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

interface IProps {
  headers: { title: string; value: string }[]
  items: { price: number; quantity: number; total?: number }[]
  dataType: 'bids' | 'asks'
  priceColor?: string
}

const props = withDefaults(defineProps<IProps>(), {
  priceColor: '#0ecb81'
})

const { width } = useDisplay()

const isDesktop = computed(() => {
  return width.value > 680
})

const filteredHeaders = computed(() => {
  if (isDesktop.value) {
    return props.headers
  }
  return props.headers.filter((i) => i.value !== 'quantity')
})

const getMaxQuantity = () => {
  return Math.max(...props.items.map((item) => item.quantity))
}

const getRowBackgroundColor = (quantity: number) => {
  const maxQuantity = getMaxQuantity()
  const ratio = quantity / maxQuantity
  const bgMapper = {
    bids: `linear-gradient(to left, #082d1f 0%, #082d1f ${ratio * 100}%, transparent ${ratio * 100}%, transparent 100%)`,
    asks: `linear-gradient(to right, #35090f 0%, #35090f ${ratio * 100}%, transparent ${ratio * 100}%, transparent 100%)`
  }
  return bgMapper[props.dataType]
}
</script>

<style lang="scss" scoped>
.custom-table {
  &__row {
    :last-child {
      text-align: right;
    }

    @media (max-width: 520px) {
      font-size: 11px;

      :first-child {
        padding-left: 8px;
        padding-right: 0;
      }
      :last-child {
        padding-left: 0;
        padding-right: 8px;
      }
    }
  }
}
</style>