<template>
    <v-container class="full-height">
      <v-card class="card-container">
        <v-card-title class="card-title">Welcome to FlowTrackAI</v-card-title>
        <v-card-subtitle class="card-subtitle">
          AI-powered productivity and reflection made simple.
        </v-card-subtitle>
  
        <v-divider class="divider"></v-divider>
  
        <v-card-text>
          <p>
            Stay on top of your daily reflections, track productivity trends, and let AI generate actionable insights to keep you growing.
          </p>
          <p>
            Get started by logging in or exploring the dashboard!
          </p>
        </v-card-text>
  
        <v-divider class="divider"></v-divider>
  
        <v-btn v-if="!isAuthenticated" to="/login" color="primary" class="button-spacing">
          <v-icon left>mdi-login</v-icon> Login
        </v-btn>
  
        <v-btn v-if="isAuthenticated" to="/dashboard" color="success">
          <v-icon left>mdi-chart-line</v-icon> Go to Dashboard
        </v-btn>
      </v-card>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  
  // Authentication state
  const authStore = useAuthStore();
  const isAuthenticated = computed(() => authStore.isAuthenticated);
  </script>
  
  <style scoped>
  .full-height {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #0a0f14, #16222a); /* Deep space blue */
  }
  
  .card-container {
    padding: 24px;
    text-align: center;
    max-width: 600px;
    background: rgba(20, 25, 30, 0.9); /* Slight transparency for futuristic depth */
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 255, 170, 0.2); /* Neon green accent */
    color: #e3f6f5; /* Soft contrast text for eye comfort */
  }
  
  .card-title {
    font-size: 24px;
    font-weight: bold;
    color: #00ff99; /* Tesla cyberpunk green */
  }
  
  .card-subtitle {
    font-size: 16px;
    color: #a1eafb; /* Soft blue for a calming feel */
  }
  
  .divider {
    margin: 16px 0;
    background-color: rgba(0, 255, 170, 0.5);
  }
  
  .button-spacing {
    margin-right: 8px;
  }
  
  /* Button Styling */
  .v-btn {
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 1px;
    transition: all 0.3s ease-in-out;
  }
  
  .v-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(0, 255, 170, 0.5);
  }
  </style>
  