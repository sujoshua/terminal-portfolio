<script setup lang="ts">
import GerneralUsage from '@/components/GerneralUsage.vue';
import type { TermContext } from '@/components/TermContextProvider.vue';
import { inject } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const ctx = inject<TermContext>('termContext');

const valid = ctx?.cmd === 'about' && ctx?.arg.length === 0;

</script>

<template>
  <div v-if="valid" class="about-wrapper">
    <i18n-t keypath="about.name" tag="p">
      <span class="highlight">Joshua Su</span>
    </i18n-t>
    <i18n-t keypath="about.location" tag="p">
      <span class="highlight">{{ t('about.profession') }}</span>
    </i18n-t>
    <p>
      {{ t("about.intro") }}
    </p>
  </div>
  <GerneralUsage v-else cmd="about" />
</template>

<style scoped>
.highlight {
  font-weight: 700;
}
</style>
