<script setup lang="ts">
import GeneralOutput from '@/components/GeneralOutput.vue';
import GerneralUsage from '@/components/GerneralUsage.vue';
import type { TermContext } from '@/components/TermContextProvider.vue';
import { hashString } from '@/utils/funcs';
import { inject } from 'vue';

const ctx = inject<TermContext>('termContext');

const valid = ctx?.cmd === 'history' && ctx?.arg.length === 0;
const hisotry = ctx?.getHistory()
  .slice(1) // to remove the current command,
  .reverse(); // to show the latest command first
</script>

<template>
  <template v-if="valid">
    <div v-for="item in hisotry" :key="hashString(item)">
      <GeneralOutput :text="item" />
    </div>
  </template>
  <GerneralUsage v-else cmd="history" />
</template>
