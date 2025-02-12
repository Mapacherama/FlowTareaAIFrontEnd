<template>
    <v-container>
      <v-card class="pa-5 register-card">
        <v-card-title>Sign Up</v-card-title>
        <v-card-text>
          <!-- Error Message -->
          <v-alert v-if="errorMessage" type="error" dismissible>
            {{ errorMessage }}
          </v-alert>
  
          <!-- Registration Form -->
          <v-form @submit.prevent="handleRegister">
            <v-text-field v-model="username" label="Username" required></v-text-field>
            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
            <v-text-field v-model="confirmPassword" label="Confirm Password" type="password" required></v-text-field>
            
            <v-btn type="submit" color="primary" :loading="isLoading" :disabled="isLoading" block>
              <v-icon left>mdi-account-plus</v-icon> Register
            </v-btn>
          </v-form>
  
          <!-- Login Link -->
          <div class="login-link">
            <p>Already have an account? <router-link to="/login">Login here</router-link></p>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const username = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const errorMessage = ref('');
  const isLoading = ref(false);
  const router = useRouter();
  
  const handleRegister = async () => {
    errorMessage.value = ''; // Reset error message
    isLoading.value = true;  // Show loading spinner
  
    // Check if passwords match
    if (password.value !== confirmPassword.value) {
      errorMessage.value = "Passwords do not match.";
      isLoading.value = false;
      return;
    }
  
    try {
      // Send registration request to backend
      const response = await axios.post('http://127.0.0.1:8000/auth/register/', {
        username: username.value,
        password: password.value,
      });
  
      if (response.status === 201) {
        router.push('/login'); // Redirect to login page after successful registration
      }
    } catch (error: any) {
      errorMessage.value = error.response?.data?.error || "Registration failed. Please try again.";
    } finally {
      isLoading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .register-card {
    max-width: 400px;
    margin: auto;
  }
  
  .login-link {
    text-align: center;
    margin-top: 10px;
  }
  
  .login-link a {
    color: #00ff99;
    text-decoration: none;
    font-weight: bold;
  }
  
  .login-link a:hover {
    text-decoration: underline;
  }
  </style>
  