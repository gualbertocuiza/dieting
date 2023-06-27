<template>
  <v-card class="auth-card">
    <v-card-title class="title">Login</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field label="Email" type="text"></v-text-field>
        <v-text-field label="Password" type="password"></v-text-field>
        <v-btn color="primary" class="mt-4" block>Log in</v-btn>
      </v-form>
    </v-card-text>
    <v-card-text
      >No account yet? create it
      <RouterLink :to="{ name: 'register' }">here</RouterLink>
    </v-card-text>
  </v-card>
</template>
