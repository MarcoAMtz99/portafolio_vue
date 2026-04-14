<script setup>
import { ref, watch, onMounted } from 'vue'
import TheHeader from './components/TheHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'

// 👉 estado del tema
const themeFamily = ref('editorial') 
const themeMode = ref('dark')

const applyTheme = () => {
  document.documentElement.setAttribute('data-theme-family', themeFamily.value)
  document.documentElement.setAttribute('data-theme-mode', themeMode.value)
}

// aplicar cambios
watch([themeFamily, themeMode], applyTheme)

onMounted(() => {
  applyTheme()
})

// toggle dark/light
const toggleThemeMode = () => {
  themeMode.value = themeMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="app-shell">
    <TheHeader
      :theme-mode="themeMode"
      @toggle-theme="toggleThemeMode"
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