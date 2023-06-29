<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '../../store/auth'

const email = ref<string>('maria@unosquare.com')
const password = ref<string>('password1')
const authStore = useAuthStore()

const login = () => {
  authStore.login(email.value, password.value)
}
</script>

<template>
  <v-card class="auth-card">
    <v-card-title class="title">Login</v-card-title>
    <v-alert v-if="authStore.hasError" color="error" variant="tonal" closable>{{
      authStore.errorMessage
    }}</v-alert>
    <v-card-text>
      <v-form ref="form" @submit.prevent="login">
        <v-text-field v-model="email" label="Email" type="text"></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
        ></v-text-field>
        <v-btn
          :loading="authStore.loading"
          color="primary"
          class="mt-4"
          type="submit"
          block
          >Log in</v-btn
        >
      </v-form>
    </v-card-text>
    <v-card-text
      >No account yet? create it
      <RouterLink :to="{ name: 'register' }">here</RouterLink>
    </v-card-text>
  </v-card>
</template>
