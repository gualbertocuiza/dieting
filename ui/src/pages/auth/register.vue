<script lang="ts" setup>
import { ref } from 'vue'
import RegFormValidators from '../../components/auth/reg-form-validators'

const first_name = ref('')
const last_name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
</script>

<template>
  <v-card class="auth-card">
    <v-card-title class="title">Register</v-card-title>
    <v-card-text>
      <reg-form-validators
        :first_name="first_name"
        :password="password"
        :confirmation="password_confirmation"
        v-slot="{ required, matching, complexity }"
      >
        <v-form ref="form">
          <v-text-field
            v-model="first_name"
            :rules="required"
            label="First Name"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="last_name"
            label="Last Name"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="password_confirmation"
            label="Confirm Password"
            type="password"
            :rules="matching"
          ></v-text-field>
          <v-btn color="primary" class="mt-4" block>Register</v-btn>
        </v-form>
        <p>Matches: {{ matching }}</p>
        <p>Complex: {{ complexity }}</p>
      </reg-form-validators>
    </v-card-text>

    <v-card-text
      >Already have an account? log in
      <RouterLink :to="{ name: 'login' }">here</RouterLink>
    </v-card-text>
  </v-card>
</template>
