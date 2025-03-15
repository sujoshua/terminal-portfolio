<script setup lang="ts">
import GerneralUsage from '@/components/GerneralUsage.vue'
import type { TermContext } from '@/components/TermContextProvider.vue'
import { computed, inject } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const ctx = inject<TermContext>('termContext')

const valid = ctx?.cmd === 'education' && ctx?.arg.length === 0

const eduBg = computed(() => [
  {
    title: t('education.cquptTitle'),
    desc: t('education.cquptDesc'),
  },
])
</script>

<template>
  <div v-if="valid">
    <div class="edu-intro">{{ t('education.intro') }}</div>
    <div class="edu-list" v-for="edu in eduBg" :key="edu.title">
      <p class="title">{{ edu.title }}</p>
      <p class="desc">{{ edu.desc }}</p>
    </div>
  </div>
  <GerneralUsage v-else cmd="education" />
</template>

<style scoped>
.edu-intro {
  margin-bottom: 0.75rem;
}

.edu-list {
  .title {
    font-weight: 700;
    margin-bottom: 0.125rem;
  }

  .desc {
    color: var(--text-color-200);
  }
}
</style>
