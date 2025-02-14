<template>
  <v-container class="reflection-container">
    <v-card class="reflection-card">
      <v-card-title>New Reflection</v-card-title>
      <v-card-text>
        <v-alert v-if="errorMessage" type="error" dismissible>{{ errorMessage }}</v-alert>
        <v-alert v-if="successMessage" type="success" dismissible>{{ successMessage }}</v-alert>

        <v-textarea v-model="reflection" label="Write your thoughts..." outlined></v-textarea>
        <v-btn color="success" @click="saveReflection" :loading="isSaving">
          <v-icon left>mdi-content-save</v-icon> Save
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const reflection = ref('');
const isSaving = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const saveReflection = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  if (!reflection.value.trim()) {
    errorMessage.value = "Reflection cannot be empty.";
    return;
  }

  isSaving.value = true;
  
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Unauthorized: No token found.");
    }

    await axios.post(
      "http://127.0.0.1:8000/api/reflections/",
      { content: reflection.value },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    successMessage.value = "Reflection saved successfully!";
    setTimeout(() => router.push('/dashboard'), 1000); // Redirect after success
  } catch (error) {
    errorMessage.value = error.response?.data?.error || "Failed to save reflection.";
  } finally {
    isSaving.value = false;
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

.v-btn {
  margin-top: 10px;
}
</style>
