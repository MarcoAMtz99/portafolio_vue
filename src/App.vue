<script setup>
import { ref, watch, onMounted } from 'vue'
import TheHeader from './components/TheHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'

const theme = ref('dark')

const applyTheme = (value) => {
  document.documentElement.setAttribute('data-theme', value)
}

watch(theme, (newTheme) => {
  applyTheme(newTheme)
})

onMounted(() => {
  applyTheme(theme.value)
})

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="app-shell">
    <TheHeader
      :theme="theme"
      @toggle-theme="toggleTheme"
    />
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <ContactSection />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(34, 197, 94, 0.08), transparent 35%),
    var(--bg-primary);
  transition:
    background 0.5s ease,
    color 0.4s ease;
}
</style>