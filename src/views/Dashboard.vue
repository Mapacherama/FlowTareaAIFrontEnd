<template>
    <v-container class="dashboard-container">
      <!-- Welcome Message -->
      <v-card class="welcome-card">
        <v-card-title class="text-h5">Welcome back, {{ username }} 👋</v-card-title>
        <v-card-subtitle>Your personal AI-powered productivity assistant</v-card-subtitle>
      </v-card>
  
      <!-- AI-Generated Insights -->
      <v-card class="ai-insights-card">
        <v-card-title>AI Insights</v-card-title>
        <v-card-text>
          <p>{{ aiSummary }}</p>
        </v-card-text>
      </v-card>
  
      <!-- Productivity Chart -->
      <v-card class="chart-card">
        <v-card-title>Reflection Trends</v-card-title>
        <v-card-text>
          <canvas ref="chartCanvas"></canvas>
        </v-card-text>
      </v-card>
  
      <!-- Quick Actions -->
      <div class="quick-actions">
        <v-btn color="primary" @click="redirectToNewReflection">
          <v-icon left>mdi-plus</v-icon> Add Reflection
        </v-btn>
        <v-btn color="success" @click="viewPastReflections">
          <v-icon left>mdi-history</v-icon> View Past Reflections
        </v-btn>
      </div>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import Chart from 'chart.js/auto';
  
  // User Data
  const username = ref('User');
  const aiSummary = ref("Today's AI-generated reflection insight: Stay consistent, small daily progress leads to big results.");
  
  // Router Navigation
  const router = useRouter();
  const redirectToNewReflection = () => router.push('/new-reflection');
  const viewPastReflections = () => router.push('/past-reflections');
  
  // Chart Setup
  const chartCanvas = ref<HTMLCanvasElement | null>(null);
  
  onMounted(() => {
    if (chartCanvas.value) {
      new Chart(chartCanvas.value, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Reflections Logged',
              data: [2, 1, 3, 4, 2, 5, 3],
              borderColor: '#00ff99',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }
  });
  </script>
  
  <style scoped>
  .dashboard-container {
    max-width: 900px;
    margin: auto;
    padding: 20px;
  }
  
  .welcome-card,
  .ai-insights-card,
  .chart-card {
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
  