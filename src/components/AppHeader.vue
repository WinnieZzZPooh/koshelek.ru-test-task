<template>
  <v-app-bar app>
    <v-toolbar-title class="pr-4">
      <v-img
        src="@/assets/hamster.png"
        cover
        width="50"
        @click="router.push('/')"
      />
    </v-toolbar-title>
    <v-btn :to="`/order-book/${store.symbol}`">Order Book</v-btn>
    <v-btn to="/settings">Settings</v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useSettingsStore } from "@/stores/settingsStore"

const router = useRouter()
const store = useSettingsStore()
</script>