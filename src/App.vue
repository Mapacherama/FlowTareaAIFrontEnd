<template>
  <v-app class="app-container">
    <AppHeader />
    <v-main class="main-content">
      <router-view />
    </v-main>   
    <AppFooter /> 
  </v-app>  
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<style>
</style>