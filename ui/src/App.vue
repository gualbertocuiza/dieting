<script setup lang="ts">
//import { useAuthStore } from './store/auth'
import { onBeforeMount } from 'vue'

//const authStore = useAuthStore()

onBeforeMount(() => {
  //authStore.getAuthUser()
})
</script>

<template>
  <router-view />
</template>
