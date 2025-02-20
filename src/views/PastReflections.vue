<template>
    <v-container class="dashboard-container">
      <!-- Page Title -->
      <v-card class="page-title-card">
        <v-card-title class="text-h5">Past Reflections 📜</v-card-title>
        <v-card-subtitle>Review your past insights and learn from them</v-card-subtitle>
      </v-card>
  
      <!-- Sorting Options -->
      <v-card class="sorting-card">
        <v-card-title>Sort by</v-card-title>
        <v-card-text>
          <v-select
            v-model="sortOrder"
            :items="['Newest First', 'Oldest First']"
            label="Sorting Order"
            @update:modelValue="sortReflections"
            outlined
          ></v-select>
        </v-card-text>
      </v-card>
  
      <!-- Reflections List -->
      <v-card class="reflection-list-card">
        <v-card-title>Reflection History</v-card-title>
        <v-card-text>
          <v-list v-if="sortedReflections.length > 0">
            <v-list-item v-for="reflection in sortedReflections" :key="reflection.id" class="reflection-item">
              <v-list-item-content>
                <v-list-item-title class="reflection-date">
                  {{ formatDate(reflection.created_at) }}
                </v-list-item-title>
                <v-list-item-subtitle class="reflection-text">
                  {{ reflection.content }}
                </v-list-item-subtitle>
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
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  // Data
  const reflections = ref<{ id: number; content: string; created_at: string }[]>([]);
  const sortOrder = ref('Newest First'); // Default sorting order
  const router = useRouter();
  
  // Fetch Reflections from API
  const fetchReflections = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/reflections/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      reflections.value = response.data;
      sortReflections(); // Ensure sorting after fetching data
    } catch (error) {
      console.error("Error fetching reflections:", error);
    }
  };
  
  // Computed Property: Sorted Reflections
  const sortedReflections = computed(() => {
    return [...reflections.value].sort((a, b) => {
      return sortOrder.value === 'Newest First'
        ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        : new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });
  });
  
  // Function to handle sorting when selection changes
  const sortReflections = () => {
    reflections.value = [...sortedReflections.value];
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
  .sorting-card,
  .reflection-list-card {
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 255, 170, 0.2);
    background: rgba(20, 25, 30, 0.9);
    color: #e3f6f5;
  }
  
  /* Styling to keep reflections on a single line */
  .reflection-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
  }
  
  /* Limit text length & ensure truncation */
  .reflection-text {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 600px;
  }
  
  /* Style date for clarity */
  .reflection-date {
    font-weight: bold;
    margin-right: 15px;
  }
  
  .quick-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  </style>
  