<script setup>
import ShiftReportBuilder from '../components/ShiftReportBuilder.vue'
</script>

<template>
  <main class="shift-page">
    <ShiftReportBuilder />
  </main>
</template>

<style scoped>
.shift-page {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 72px;
}
</style>