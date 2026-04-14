<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section id="about" class="section-shell about-section">
    <div class="section-container">
      <div class="section-heading">
        <p class="section-label">{{ t('about.label') }}</p>
        <h2 class="section-title">{{ t('about.title') }}</h2>
      </div>

      <div class="about-grid">
        <div class="panel panel-window about-main">
          <div class="panel-content">
            <p>{{ t('about.paragraph1') }}</p>
            <p>{{ t('about.paragraph2') }}</p>
          </div>
        </div>

        <div class="about-cards">
          <article class="panel about-card">
            <div class="panel-content">
              <h3>{{ t('about.cards.card1.title') }}</h3>
              <p>{{ t('about.cards.card1.description') }}</p>
            </div>
          </article>

          <article class="panel about-card">
            <div class="panel-content">
              <h3>{{ t('about.cards.card2.title') }}</h3>
              <p>{{ t('about.cards.card2.description') }}</p>
            </div>
          </article>

          <article class="panel about-card">
            <div class="panel-content">
              <h3>{{ t('about.cards.card3.title') }}</h3>
              <p>{{ t('about.cards.card3.description') }}</p>
            </div>
          </article>

          <article class="panel about-card">
            <div class="panel-content">
              <h3>{{ t('about.cards.card4.title') }}</h3>
              <p>{{ t('about.cards.card4.description') }}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 28px;
}

.about-main p {
  margin: 0 0 18px;
  line-height: 1.9;
  color: var(--text-secondary);
}

.about-main p:last-child {
  margin-bottom: 0;
}

.about-cards {
  display: grid;
  gap: 18px;
}

.about-card h3 {
  margin: 0 0 10px;
  font-size: 1rem;
  color: var(--text-primary);
}

.about-card p {
  margin: 0;
  line-height: 1.7;
  color: var(--text-secondary);
}

@media (max-width: 860px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .about-cards {
    gap: 14px;
  }
}
</style>