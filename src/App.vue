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
/* Ensure full height layout */
#app, .v-application {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1; /* Pushes footer down */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>