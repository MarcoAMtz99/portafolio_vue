<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section id="projects" class="projects-section">
    <div class="projects-container">
      <div class="section-heading">
        <p class="section-label">{{ t('projects.label') }}</p>
        <h2>{{ t('projects.title') }}</h2>
        <p class="section-description">
          {{ t('projects.description') }}
        </p>
      </div>

      <div class="projects-grid">
        <article class="project-card">
          <p class="project-stack">{{ t('projects.items.project1.stack') }}</p>
          <h3>{{ t('projects.items.project1.title') }}</h3>
          <p class="project-description">
            {{ t('projects.items.project1.description') }}
          </p>
        </article>

        <article class="project-card">
          <p class="project-stack">{{ t('projects.items.project2.stack') }}</p>
          <h3>{{ t('projects.items.project2.title') }}</h3>
          <p class="project-description">
            {{ t('projects.items.project2.description') }}
          </p>
        </article>

        <article class="project-card">
          <p class="project-stack">{{ t('projects.items.project3.stack') }}</p>
          <h3>{{ t('projects.items.project3.title') }}</h3>
          <p class="project-description">
            {{ t('projects.items.project3.description') }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  padding: 72px 20px;
}

.projects-container {
  max-width: 1100px;
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
  max-width: 720px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.project-card {
  border: 1px solid var(--border);
  background: var(--card-bg);
  padding: 24px;
  border-radius: 16px;
  box-shadow: var(--shadow-soft);
}

.project-stack {
  margin: 0 0 12px;
  color: var(--accent);
  font-size: 0.9rem;
}

.project-card h3 {
  margin: 0 0 12px;
  font-size: 1.05rem;
  line-height: 1.5;
  color: var(--text-primary);
}

.project-description {
  margin: 0;
  line-height: 1.8;
  color: var(--text-secondary);
}

@media (max-width: 960px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .projects-section {
    padding: 56px 16px;
  }

  .project-card {
    padding: 20px;
  }
}
</style>