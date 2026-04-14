<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <main class="hero">
    <section class="hero-content">
      <p class="eyebrow">{{ t('hero.eyebrow') }}</p>

      <h1>{{ t('hero.title') }}</h1>
      <h2>{{ t('hero.subtitle') }}</h2>

      <p class="description">
        {{ t('hero.description') }}
      </p>

      <div class="actions">
        <a href="#projects" class="btn btn-primary">{{ t('hero.primaryButton') }}</a>
        <a href="#contact" class="btn btn-secondary">{{ t('hero.secondaryButton') }}</a>
      </div>
    </section>
  </main>
</template>

<style scoped>
.hero {
  min-height: calc(100vh - 73px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px 48px;
}

.hero-content {
  max-width: 760px;
  text-align: center;
}

.eyebrow {
  margin: 0 0 12px;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent);
}

h1 {
  margin: 0;
  font-size: clamp(2.4rem, 7vw, 4.2rem);
  line-height: 1.05;
  color: var(--text-primary);
}

h2 {
  margin: 16px 0 0;
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  font-weight: 500;
  color: var(--text-secondary);
}

.description {
  margin: 24px auto 0;
  max-width: 620px;
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.actions {
  margin-top: 32px;
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 14px 22px;
  border-radius: 10px;
  font-weight: 600;
  transition: 0.2s ease;
}

.btn-primary {
  background: var(--accent);
  color: #02100a;
}

.btn-primary:hover {
  background: var(--accent-hover);
}

.btn-secondary {
  border: 1px solid var(--border);
  color: var(--text-primary);
  background: transparent;
}

.btn-secondary:hover {
  background: var(--card-bg);
}

@media (max-width: 520px) {
  .description {
    font-size: 0.95rem;
  }
}
</style>