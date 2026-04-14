<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  themeMode: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['toggle-theme'])

const { t, locale } = useI18n()

const languages = ['en', 'es', 'pt']

const currentLanguageLabel = computed(() => locale.value.toUpperCase())

const currentThemeLabel = computed(() => {
  return props.themeMode === 'dark' ? 'Dark' : 'Light'
})

const changeLanguage = () => {
  const currentIndex = languages.indexOf(locale.value)
  const nextIndex = (currentIndex + 1) % languages.length
  locale.value = languages[nextIndex]
}
</script>

<template>
  <header class="site-header">
    <div class="brand">
      <span class="brand-command">&gt;</span>
      <span class="brand-name">Marco.dev</span>
    </div>

    <nav class="site-nav">
      <a href="#about">{{ t('header.about') }}</a>
      <a href="#projects">{{ t('header.projects') }}</a>
      <a href="#contact">{{ t('header.contact') }}</a>
    </nav>

    <div class="header-actions">
      <button class="action-button" @click="changeLanguage">
        {{ currentLanguageLabel }}
      </button>

      <button class="action-button" @click="emit('toggle-theme')">
        {{ currentThemeLabel }}
      </button>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 24px;
  border-bottom: 1px solid var(--border);
  background: color-mix(in srgb, var(--bg-primary) 85%, transparent);
  backdrop-filter: blur(8px);
  transition:
    background 0.4s ease,
    border-color 0.4s ease,
    color 0.4s ease;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.brand-command {
  color: var(--accent);
  font-weight: 700;
}

.brand-name {
  font-weight: 700;
  letter-spacing: 0.5px;
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 22px;
}

.site-nav a {
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.site-nav a:hover {
  color: var(--accent);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.action-button {
  border: 1px solid var(--border);
  background: var(--card-bg);
  color: var(--text-primary);
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.35s ease,
    color 0.35s ease,
    border-color 0.35s ease,
    transform 0.2s ease;
}

.action-button:hover {
  transform: translateY(-1px);
}

@media (max-width: 820px) {
  .site-header {
    flex-wrap: wrap;
    justify-content: center;
  }

  .site-nav {
    order: 3;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    gap: 14px;
  }
}

@media (max-width: 640px) {
  html,
  body {
    transition: background-color 0.3s ease, color 0.3s ease;
  }
}
@media (max-width: 520px) {
  .site-header {
    padding: 16px;
  }

  .brand-name {
    font-size: 0.95rem;
  }

  .action-button {
    padding: 8px 10px;
  }
}
</style>