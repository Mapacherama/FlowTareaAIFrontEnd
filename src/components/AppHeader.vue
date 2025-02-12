<template>
    <v-app-bar app>
      <v-toolbar-title>FlowTrackAI</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!isAuthenticated" to="/login">Login</v-btn>
      <v-btn v-if="isAuthenticated" @click="logout">Logout</v-btn>
    </v-app-bar>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  
  export default {
    setup() {
      const authStore = useAuthStore();
  
      const isAuthenticated = computed(() => authStore.isAuthenticated);
  
      const logout = () => {
        authStore.logout();
      };
  
      return { isAuthenticated, logout };
    },
  };
  </script>  