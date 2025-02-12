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
  
  </style>
  