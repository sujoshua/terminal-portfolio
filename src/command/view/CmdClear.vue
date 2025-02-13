<script setup lang="ts">
import GerneralUsage from '@/components/GerneralUsage.vue';
import type { TermContext } from '@/components/TermContextProvider.vue';
import { inject } from 'vue';

const ctx = inject<TermContext>('termContext');

const valid = ctx?.cmd === 'clear' && ctx?.arg.length === 0;

if (valid) {
  ctx?.clearHistory();
}
</script>

<template>
  <GerneralUsage v-if="!valid" cmd="clear" />
</template>
