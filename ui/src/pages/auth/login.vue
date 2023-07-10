<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '../../store/auth'
import LoginFormValidators from '../../components/auth/login-form-validator'

const email = ref<string>('')
const password = ref<string>('')
const validForm = ref(false)
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
      <login-form-validators
        :email="email"
        :password="password"
        v-slot="{ emailRules, passwordRules }"
      >
        <v-form @submit.prevent="login" v-model="validForm" ref="form">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
          ></v-text-field>
          <v-btn
            :loading="authStore.loading"
            :disabled="!validForm"
            color="primary"
            class="mt-4"
            type="submit"
            block
            >Log in</v-btn
          >
        </v-form>
      </login-form-validators>
    </v-card-text>
    <v-card-text
      >No account yet? create it
      <RouterLink :to="{ name: 'register' }">here</RouterLink>
    </v-card-text>
  </v-card>
</template>
