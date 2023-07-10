<script lang="ts" setup>
import { ref } from 'vue'
import RegFormValidators from '../../components/auth/reg-form-validators'

const first_name = ref('')
const last_name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const validForm = ref(false)
</script>

<template>
  <v-card class="auth-card">
    <v-card-title class="title">Register</v-card-title>
    <v-card-text>
      <reg-form-validators
        :first_name="first_name"
        :last_name="last_name"
        :email="email"
        :password="password"
        :confirmation="password_confirmation"
        v-slot="{
          firstNameRules,
          lastNameRules,
          emailRules,
          passwordRules,
          passwordConfirmationRules,
        }"
      >
        <v-form v-model="validForm" ref="form">
          <v-text-field
            v-model="first_name"
            :rules="firstNameRules"
            label="First Name"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="last_name"
            :rules="lastNameRules"
            label="Last Name"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            type="email"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="password_confirmation"
            label="Confirm Password"
            type="password"
            :rules="passwordConfirmationRules"
          ></v-text-field>
          <v-btn :disabled="!validForm" color="primary" class="mt-4" block
            >Register</v-btn
          >
        </v-form>
      </reg-form-validators>
    </v-card-text>

    <v-card-text
      >Already have an account? log in
      <RouterLink :to="{ name: 'login' }">here</RouterLink>
    </v-card-text>
  </v-card>
</template>
