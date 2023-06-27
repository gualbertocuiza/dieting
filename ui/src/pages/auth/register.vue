<template>
  <v-card class="auth-card">
    <v-card-title class="title">Register</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field label="First Name" type="text"></v-text-field>
        <v-text-field label="Last Name" type="text"></v-text-field>
        <v-text-field label="Email" type="email"></v-text-field>
        <v-text-field label="Password" type="password"></v-text-field>
        <v-text-field label="Confirm Password" type="password"></v-text-field>
        <v-btn color="primary" class="mt-4" block>Register</v-btn>
      </v-form>
    </v-card-text>
    <v-card-text
      >Already have an account? log in
      <RouterLink :to="{ name: 'login' }">here</RouterLink>
    </v-card-text>
  </v-card>
</template>
