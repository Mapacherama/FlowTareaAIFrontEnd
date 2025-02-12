<template>
  <v-footer class="footer-container">
    <div class="footer-content">
      <p class="footer-text">&copy; {{ currentYear }} FlowTrackAI — Built for productivity & reflection</p>
      <div class="social-icons">
        <a v-for="item in socialLinks" 
           :key="item.title" 
           :href="item.href" 
           :title="item.title" 
           class="social-link" 
           rel="noopener noreferrer" 
           target="_blank">
          <v-icon :icon="item.icon" size="20" />
        </a>
      </div>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());

const socialLinks = [
  { title: 'GitHub', icon: 'mdi-github', href: 'https://https://github.com/Mapacherama' },
  { title: 'Instagram', icon: 'mdi-instagram', href: 'https://instagram.com/yourproject' },
  { title: 'LinkedIn', icon: 'mdi-linkedin', href: 'https://www.linkedin.com/in/jerome-tesselaar/' },
];
</script>

<style scoped>
/* Minimalistic, futuristic, and clean footer */
.footer-container {
  background: rgba(20, 25, 30, 0.9); /* Dark futuristic transparency */
  color: #e3f6f5; /* Soft contrast for eye comfort */
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 255, 170, 0.2);
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  text-align: center;
}

.footer-text {
  font-size: 14px;
  color: #a1eafb;
}

.social-icons {
  display: flex;
  gap: 12px;
}

.social-link {
  color: rgba(var(--v-theme-on-background), 0.6);
  text-decoration: none;
  transition: 0.3s ease-in-out;
}

.social-link:hover {
  color: #00ff99; /* Neon green accent */
  transform: scale(1.1);
}
</style>
