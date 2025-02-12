<template>
    <v-container>
      <v-card class="pa-5 login-card">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <!-- Error Message -->
          <v-alert v-if="errorMessage" type="error" dismissible>
            {{ errorMessage }}
          </v-alert>
  
          <!-- Login Form -->
          <v-form @submit.prevent="handleLogin">
            <v-text-field v-model="username" label="Username" required></v-text-field>
            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
            
            <v-btn type="submit" color="primary" :loading="isLoading" :disabled="isLoading" block>
              <v-icon left>mdi-login</v-icon> Login
            </v-btn>
          </v-form>
  
          <!-- Register Link -->
          <div class="register-link">
            <p>Don't have an account? <router-link to="/register">Sign up here</router-link></p>
          </div>
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
  const errorMessage = ref('');
  const isLoading = ref(false);
  const authStore = useAuthStore();
  const router = useRouter();
  
  const handleLogin = async () => {
    errorMessage.value = ''; // Reset error message before login attempt
    isLoading.value = true;  // Start loading spinner
  
    try {
      await authStore.login(username.value, password.value);
      
      if (authStore.isAuthenticated) {
        router.push('/dashboard'); // Redirect to Dashboard on successful login
      } else {
        errorMessage.value = 'Invalid username or password. Please try again.';
      }
    } catch (error) {
      errorMessage.value = 'Login failed. Please check your credentials or try again later.';
    } finally {
      isLoading.value = false; // Stop loading spinner after request completes
    }
  };
  </script>
  
  <style scoped>
  .login-card {
    max-width: 400px;
    margin: auto;
  }
  
  .register-link {
    text-align: center;
    margin-top: 10px;
  }
  
  .register-link a {
    color: #00ff99;
    text-decoration: none;
    font-weight: bold;
  }
  
  .register-link a:hover {
    text-decoration: underline;
  }
  </style>
  