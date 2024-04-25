<template>
  <v-app>
    <app-header />
    <v-main>
      <router-view />
    </v-main>
  </v-app>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '@/components/AppHeader.vue'

export default defineComponent({
  components: {
    AppHeader
  }
})
</script>

<style scoped>

</style>
