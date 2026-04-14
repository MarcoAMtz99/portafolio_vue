<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="contact-container">
      <div class="section-heading">
        <p class="section-label">{{ t('contact.label') }}</p>
        <h2>{{ t('contact.title') }}</h2>
        <p class="section-description">
          {{ t('contact.description') }}
        </p>
      </div>

      <div class="contact-grid">
        <a href="#" class="contact-card">
          <span>{{ t('contact.email') }}</span>
        </a>

        <a href="#" class="contact-card">
          <span>{{ t('contact.linkedin') }}</span>
        </a>

        <a href="#" class="contact-card">
          <span>{{ t('contact.github') }}</span>
        </a>

        <a href="#" class="contact-card">
          <span>{{ t('contact.cv') }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding: 72px 20px;
}

.contact-container {
  max-width: 900px;
  margin: 0 auto;
}

.section-heading {
  margin-bottom: 32px;
}

.section-label {
  margin: 0 0 10px;
  color: var(--accent);
  letter-spacing: 1px;
}

.section-heading h2 {
  margin: 0 0 12px;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  color: var(--text-primary);
}

.section-description {
  margin: 0;
  max-width: 680px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.contact-card {
  border: 1px solid var(--border);
  background: var(--card-bg);
  padding: 22px;
  border-radius: 16px;
  text-align: center;
  color: var(--text-primary);
  box-shadow: var(--shadow-soft);
  transition:
    border-color 0.3s ease,
    transform 0.2s ease,
    background-color 0.3s ease,
    color 0.3s ease;
}

.contact-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .contact-section {
    padding: 56px 16px;
  }

  .contact-card {
    padding: 20px;
  }
}
</style>