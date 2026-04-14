<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section id="projects" class="section-shell projects-section">
    <div class="section-container">
      <div class="section-heading">
        <p class="section-label">{{ t('projects.label') }}</p>
        <h2 class="section-title">{{ t('projects.title') }}</h2>
        <p class="section-description">
          {{ t('projects.description') }}
        </p>
      </div>

      <div class="projects-grid">
        <article class="panel project-card">
          <div class="panel-content">
            <p class="project-stack">{{ t('projects.items.project1.stack') }}</p>
            <h3>{{ t('projects.items.project1.title') }}</h3>
            <p class="project-description">
              {{ t('projects.items.project1.description') }}
            </p>
          </div>
        </article>

        <article class="panel project-card">
          <div class="panel-content">
            <p class="project-stack">{{ t('projects.items.project2.stack') }}</p>
            <h3>{{ t('projects.items.project2.title') }}</h3>
            <p class="project-description">
              {{ t('projects.items.project2.description') }}
            </p>
          </div>
        </article>

        <article class="panel project-card">
          <div class="panel-content">
            <p class="project-stack">{{ t('projects.items.project3.stack') }}</p>
            <h3>{{ t('projects.items.project3.title') }}</h3>
            <p class="project-description">
              {{ t('projects.items.project3.description') }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
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
  .projects-grid {
    gap: 14px;
  }
}
</style>