<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const contactLinks = computed(() => [
  {
    key: 'email',
    label: t('contact.email'),
    href: t('contactLinks.emailUrl'),
    external: false,
  },
  {
    key: 'linkedin',
    label: t('contact.linkedin'),
    href: t('contactLinks.linkedinUrl'),
    external: true,
  },
  {
    key: 'github',
    label: t('contact.github'),
    href: t('contactLinks.githubUrl'),
    external: true,
  },
  {
    key: 'cv',
    label: t('contact.cv'),
    href: t('contactLinks.cvUrl'),
    external: true,
  },
])
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

        <p class="availability">
          {{ t('contact.availability') }}
        </p>
      </div>

      <div class="contact-grid">
          <a
            v-for="link in contactLinks"
            :key="link.key"
            :href="link.href"
            :target="link.external ? '_blank' : null"
            :rel="link.external ? 'noopener noreferrer' : null"
            :download="link.key === 'cv' ? currriculum : null"
            class="panel contact-card"
          >
          <div class="panel-content">
            <span>{{ link.label }}</span>
            <small>{{ link.external ? 'Open link' : 'Send email' }}</small>
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

.availability {
  margin: 16px 0 0;
  max-width: 680px;
  line-height: 1.7;
  color: var(--accent);
  font-size: 0.95rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.contact-card {
  color: var(--text-primary);
  text-align: left;
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
  display: block;
  font-weight: 700;
  margin-bottom: 6px;
}

.contact-card small {
  color: var(--text-secondary);
  font-size: 0.82rem;
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