<template>
    <v-container class="dashboard-container">
      <!-- Page Title -->
      <v-card class="page-title-card">
        <v-card-title class="text-h5">Past Reflections 📜</v-card-title>
        <v-card-subtitle>Review your past insights and learn from them</v-card-subtitle>
      </v-card>
  
      <!-- AI Insights -->
      <v-card class="ai-insights-card">
        <v-card-title>AI Summary</v-card-title>
        <v-card-text>
          <p>{{ aiSummary }}</p>
        </v-card-text>
      </v-card>
  
      <!-- Reflections List -->
      <v-card class="reflection-list-card">
        <v-card-title>Reflection History</v-card-title>
        <v-card-text>
          <v-list v-if="reflections.length > 0">
            <v-list-item v-for="reflection in reflections" :key="reflection.id">
              <v-list-item-content>
                <v-list-item-title>{{ formatDate(reflection.created_at) }}</v-list-item-title>
                <v-list-item-subtitle>{{ reflection.content }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon color="error" @click="deleteReflection(reflection.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-alert v-else type="info">No past reflections found. Start journaling today!</v-alert>
        </v-card-text>
      </v-card>
  
      <!-- Quick Actions -->
      <div class="quick-actions">
        <v-btn color="primary" @click="redirectToNewReflection">
          <v-icon left>mdi-plus</v-icon> Add Reflection
        </v-btn>
        <v-btn color="success" @click="router.push('/dashboard')">
          <v-icon left>mdi-view-dashboard</v-icon> Back to Dashboard
        </v-btn>
      </div>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  // Data
  const reflections = ref<{ id: number; content: string; created_at: string }[]>([]);
  const aiSummary = ref("Reflections provide insight into your patterns. Keep journaling to unlock deeper understanding.");
  const router = useRouter();
  
  // Fetch Reflections from API
  const fetchReflections = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/reflections/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      reflections.value = response.data;
    } catch (error) {
      console.error("Error fetching reflections:", error);
    }
  };
  
  // Delete a Reflection
  const deleteReflection = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/reflections/${id}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      reflections.value = reflections.value.filter(reflection => reflection.id !== id);
    } catch (error) {
      console.error("Error deleting reflection:", error);
    }
  };
  
  // Format Date for Display
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
  // Redirect to New Reflection Page
  const redirectToNewReflection = () => router.push('/new-reflection');
  
  onMounted(fetchReflections);
  </script>
  
  <style scoped>
  .dashboard-container {
    max-width: 900px;
    margin: auto;
    padding: 20px;
  }
  
  .page-title-card,
  .ai-insights-card,
  .reflection-list-card {
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 255, 170, 0.2);
    background: rgba(20, 25, 30, 0.9);
    color: #e3f6f5;
  }
  
  .quick-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  </style>
  