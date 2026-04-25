<script setup>
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()
</script>

<template>
  <main class="hero">
    <section class="hero-content">

      <p class="hero-label">
        > {{ t('hero.eyebrow') }}
      </p>

      <h1 class="hero-title">
        {{ t('hero.title') }}
      </h1>

      <h2 class="hero-subtitle">
        {{ t('hero.subtitle') }}
      </h2>

      <p class="hero-description">
        {{ t('hero.description') }}
      </p>

      <!-- ACTIONS -->
      <div class="hero-actions">
        <a href="#projects" class="btn btn-primary">
          {{ t('hero.primaryButton') }}
        </a>

        <a href="#contact" class="btn btn-secondary">
          {{ t('hero.secondaryButton') }}
        </a>

        <!-- 👇 SHIFT TOOL -->
        <RouterLink to="/shift-report" class="btn btn-accent">
          Open Shift Tool →
        </RouterLink>
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

.hero-label {
  margin: 0 0 12px;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent);
  opacity: 0.9;
}

.hero-title {
  margin: 0;
  font-size: clamp(2.4rem, 7vw, 4.2rem);
  line-height: 1.05;
  color: var(--text-primary);
}

.hero-subtitle {
  margin: 16px 0 0;
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  font-weight: 500;
  color: var(--text-secondary);
}

.hero-description {
  margin: 24px auto 0;
  max-width: 620px;
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.hero-actions {
  margin-top: 32px;
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

/* BOTONES BASE */
.btn {
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
  display: inline-block;
}

/* PRIMARY */
.btn-primary {
  background: var(--button-primary-bg);
  color: var(--button-primary-text);
}

/* SECONDARY */
.btn-secondary {
  border: 1px solid var(--border);
  color: var(--text-primary);
}

/* NUEVO BOTÓN SHIFT */
.btn-accent {
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
}

.btn-accent:hover {
  background: var(--accent);
  color: var(--bg-primary);
}

/* HOVERS GENERALES */
.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.06);
}

/* MOBILE */
@media (max-width: 520px) {
  .hero-description {
    font-size: 0.95rem;
  }

  .hero-actions {
    gap: 12px;
  }

  .btn {
    width: 100%;
  }
}
</style>