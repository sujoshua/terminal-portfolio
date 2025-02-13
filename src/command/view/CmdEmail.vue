<script setup lang="ts">
import GerneralUsage from '@/components/GerneralUsage.vue';
import type { TermContext } from '@/components/TermContextProvider.vue';
import { inject } from 'vue';

const ctx = inject<TermContext>('termContext');

const valid = ctx?.cmd === 'email' && ctx?.arg.length === 0;

const email = "i@joshua.su";
</script>

<template>
  <div v-if="valid">
    <i18n-t keypath="email.intro" tag="p">
      <span class="email">{{ email }}</span>
    </i18n-t>
    <i18n-t keypath="email.sendMe" tag="p">
      <a :href="`mailto:${email}`" class="email-link">{{ email }}</a>
    </i18n-t>
  </div>
  <GerneralUsage v-else cmd="email" />
</template>


<style scoped>
p {
  margin-bottom: 0.25rem;
}

.email {
  font-weight: bold;
}

.email-link {
  color: var(--secondary-color);
  border-bottom: 2px dashed var(--secondary-color);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    border-bottom-style: solid;
  }
}
</style>
