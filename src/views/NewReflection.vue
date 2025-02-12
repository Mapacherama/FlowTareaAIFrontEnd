<template>
    <v-container class="reflection-container">
      <v-card class="reflection-card">
        <v-card-title>New Reflection</v-card-title>
        <v-card-text>
          <v-textarea
            v-model="reflection"
            label="Write your thoughts..."
            outlined
          ></v-textarea>
          <v-btn color="success" @click="saveReflection">Save</v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const reflection = ref('');
  
  const saveReflection = () => {
    if (reflection.value.trim()) {
      console.log('Reflection saved:', reflection.value);
      router.push('/dashboard'); // Redirect back to the dashboard after saving
    }
  };
  </script>
  
  <style scoped>
  .reflection-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .reflection-card {
    width: 100%;
    max-width: 600px;
    padding: 20px;
  }
  </style>
  