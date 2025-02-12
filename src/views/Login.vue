<template>
    <v-container>
      <v-card class="pa-5">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleLogin">
            <v-text-field v-model="username" label="Username"></v-text-field>
            <v-text-field v-model="password" label="Password" type="password"></v-text-field>
            <v-btn type="submit" color="primary">Login</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';
  
  const username = ref('');
  const password = ref('');
  const authStore = useAuthStore();
  const router = useRouter();
  
  const handleLogin = async () => {
    await authStore.login(username.value, password.value);
    if (authStore.isAuthenticated) {
      router.push('/dashboard'); 
    }
  };
  </script>
  