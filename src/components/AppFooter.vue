<template>
  <v-footer height="50" app class="elon-footer">
    <div class="d-flex align-center mx-auto">
      <v-icon class="icon-glow" size="24">mdi-rocket-launch</v-icon>
      <span class="ml-2 text-subtitle-1">Made with ❤️ in Vue.js and Vuetify</span>
      <v-icon class="icon-glow ml-2" size="24">mdi-lightning-bolt</v-icon>
    </div>

    <div class="social-links">
      <a
        v-for="item in items"
        :key="item.title"
        :href="item.href"
        :title="item.title"
        class="mx-3 social-link"
        rel="noopener noreferrer"
        target="_blank"
      >
        <v-icon
          :icon="item.icon"
          size="20"
          class="social-icon"
        />
      </a>
    </div>
  </v-footer>
</template>

<script setup>
const items = [
  {
    title: "LinkedIn",
    icon: "mdi-linkedin",
    href: "https://www.linkedin.com/in/jerome-tesselaar/",
  },
  {
    title: "Instagram",
    icon: "mdi-instagram",
    href: "https://www.instagram.com/mapacherama/",
  },
  {
    title: "GitHub",
    icon: "mdi-github",
    href: "https://github.com/Mapacherama",
  },
];
</script>

<style scoped>
.elon-footer {
  background: #000;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  position: relative;
}

.social-links {
  display: flex;
  align-items: center;
  position: absolute;
  right: 16px;
}

.social-link .v-icon {
  color: #aaa;
  transition: transform 0.3s ease-in-out, color 0.2s ease-in-out;
}

.social-link .v-icon:hover {
  color: #fff;
  transform: scale(1.3);
}

.icon-glow {
  color: #0ff;
  animation: glow 1.5s infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 0 0 5px rgba(0, 255, 255, 0.7);
  }
  to {
    text-shadow: 0 0 15px rgba(0, 255, 255, 1);
  }
}
</style>