<script setup>
import { ref, watch, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'

const themeFamily = ref('default')
const themeMode = ref('dark')

const applyTheme = () => {
  document.documentElement.setAttribute('data-theme-family', themeFamily.value)
  document.documentElement.setAttribute('data-theme-mode', themeMode.value)
}

watch([themeFamily, themeMode], applyTheme)

onMounted(() => {
  applyTheme()
})

const toggleThemeMode = () => {
  themeMode.value = themeMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="app-shell">
    <div class="app-background">
      <!-- si ya tienes rainDrops, los mantenemos después -->
    </div>

    <TheHeader
      :theme-mode="themeMode"
      @toggle-theme="toggleThemeMode"
    />

    <RouterView />
  </div>
</template>

<style>
.app-shell {
  position: relative;
  min-height: 100vh;
  background: var(--bg-primary);
  overflow: hidden;
  transition:
    background 0.5s ease,
    color 0.4s ease;
}

header,
main,
section {
  position: relative;
  z-index: 1;
}
</style>