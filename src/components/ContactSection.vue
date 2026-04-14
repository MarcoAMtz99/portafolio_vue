<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section id="contact" class="section-shell contact-section">
    <div class="section-container contact-container">
      <div class="section-heading">
        <p class="section-label">{{ t('contact.label') }}</p>
        <h2 class="section-title">{{ t('contact.title') }}</h2>
        <p class="section-description">
          {{ t('contact.description') }}
        </p>
      </div>

      <div class="contact-grid">
        <a href="#" class="panel contact-card">
          <div class="panel-content">
            <span>{{ t('contact.email') }}</span>
          </div>
        </a>

        <a href="#" class="panel contact-card">
          <div class="panel-content">
            <span>{{ t('contact.linkedin') }}</span>
          </div>
        </a>

        <a href="#" class="panel contact-card">
          <div class="panel-content">
            <span>{{ t('contact.github') }}</span>
          </div>
        </a>

        <a href="#" class="panel contact-card">
          <div class="panel-content">
            <span>{{ t('contact.cv') }}</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-container {
  max-width: 900px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.contact-card {
  color: var(--text-primary);
  text-align: center;
  transition:
    border-color 0.3s ease,
    transform 0.2s ease,
    background-color 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease;
}

.contact-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.contact-card span {
  display: inline-block;
  font-weight: 600;
}

@media (max-width: 640px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .contact-grid {
    gap: 14px;
  }
}
</style>