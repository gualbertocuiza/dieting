<script lang="ts" setup>
import { useAuthStore } from '../../store/auth'

const authStore = useAuthStore()
</script>

<template>
  <h2>
    Welcome {{ authStore.auth.first_name }} {{ authStore.auth.last_name }}
  </h2>
  <v-btn> Button </v-btn>
</template>
