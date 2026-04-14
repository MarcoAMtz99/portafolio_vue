<script setup>
import { ref, watch, onMounted } from 'vue'
import TheHeader from './components/TheHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'

const themeFamily = ref('default')

// const themeFamily = ref('editorial')

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

const random = (min, max) => Math.random() * (max - min) + min

const rainDrops = Array.from({ length: 36 }, (_, index) => ({
  id: index,
  left: `${(index + 1) * 4}%`,
  height: `${40 + (index % 6) * 18}px`,
  duration: `${6 + (index % 5) * 1.5}s`,
  delay: `${(index % 7) * 0.8}s`,
  opacity: themeMode.value === 'light'
  ? random(0.7, 1.0)
  : random(0.48, 0.68),
  width: `${random(5, 25)}px`
}))
</script>

<template>
  <div class="app-shell">
    <div class="app-background">
      <span
        v-for="drop in rainDrops"
        :key="drop.id"
        class="rain-drop"
        :style="{
          left: drop.left,
          height: drop.height,
          width: random(10, 25) + 'px',
          animationDuration: drop.duration,
          animationDelay: drop.delay,
          opacity: drop.opacity
        }"
      />
    </div>

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

.app-background {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.rain-drop {
  position: absolute;
  top: -200px;

  border-radius: 12px;

  background: linear-gradient(
    to bottom,
    transparent 0%,
    var(--rain-line-soft-color) 20%,
    var(--rain-line-strong-color) 50%,
    var(--rain-line-soft-color) 80%,
    transparent 100%
  );


  box-shadow:
  0 0 16px var(--rain-line-strong-color),
  inset 0 0 10px rgba(255, 255, 255, 0.12);


  animation-name: rainFall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  filter: blur(0.4px);
}

.rain-drop::before {
  content: "";
  position: absolute;
  inset: 0;

  background: linear-gradient(
    to bottom,
    transparent,
    rgba(255, 255, 255, 0.15),
    transparent
  );

  opacity: 0.3;
}

header,
main,
section {
  position: relative;
  z-index: 1;
}

@keyframes rainFall {
  0% {
    transform: translateY(-20vh);
  }
  100% {
    transform: translateY(120vh);
  }
}
</style>