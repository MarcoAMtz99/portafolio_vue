<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section id="about" class="about-section">
    <div class="about-container">
      <div class="section-heading">
        <p class="section-label">{{ t('about.label') }}</p>
        <h2>{{ t('about.title') }}</h2>
      </div>

      <div class="about-grid">
        <div class="about-main">
          <p>{{ t('about.paragraph1') }}</p>
          <p>{{ t('about.paragraph2') }}</p>
        </div>

        <div class="about-cards">
          <article class="info-card">
            <h3>{{ t('about.cards.card1.title') }}</h3>
            <p>{{ t('about.cards.card1.description') }}</p>
          </article>

          <article class="info-card">
            <h3>{{ t('about.cards.card2.title') }}</h3>
            <p>{{ t('about.cards.card2.description') }}</p>
          </article>

          <article class="info-card">
            <h3>{{ t('about.cards.card3.title') }}</h3>
            <p>{{ t('about.cards.card3.description') }}</p>
          </article>

          <article class="info-card">
            <h3>{{ t('about.cards.card4.title') }}</h3>
            <p>{{ t('about.cards.card4.description') }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding: 72px 20px;
}

.about-container {
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
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  color: var(--text-primary);
}

.about-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 28px;
}

.about-main {
  border: 1px solid var(--border);
  background: var(--card-bg);
  padding: 28px;
  border-radius: 16px;
  box-shadow: var(--shadow-soft);
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

.info-card {
  border: 1px solid var(--border);
  background: var(--card-bg);
  padding: 22px;
  border-radius: 16px;
  box-shadow: var(--shadow-soft);
}

.info-card h3 {
  margin: 0 0 10px;
  font-size: 1rem;
  color: var(--text-primary);
}

.info-card p {
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
  .about-section {
    padding: 56px 16px;
  }

  .about-main,
  .info-card {
    padding: 20px;
  }
}
</style>