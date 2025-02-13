<script setup lang="ts">
import GeneralOutput from '@/components/GeneralOutput.vue';
import GerneralUsage from '@/components/GerneralUsage.vue';
import type { TermContext } from '@/components/TermContextProvider.vue';
import { inject } from 'vue';

const ctx = inject<TermContext>('termContext');

const valid = ctx?.cmd === 'whoami' && ctx?.arg.length === 0;

// TODO:
// use api to get more info about the visitor.
</script>

<template>
  <GeneralOutput v-if="valid" text="visitor" />
  <GerneralUsage v-else cmd="whoami" />
</template>
