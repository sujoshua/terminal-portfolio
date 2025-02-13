<script setup lang="ts">
import GeneralOutput from '@/components/GeneralOutput.vue';
import GerneralUsage from '@/components/GerneralUsage.vue';
import type { TermContext } from '@/components/TermContextProvider.vue';
import { inject } from 'vue';

const ctx = inject<TermContext>('termContext');

const valid = ctx?.cmd === 'pwd' && ctx?.arg.length === 0;

</script>

<template>
  <GeneralOutput v-if="valid" text="/home/joshua" />
  <GerneralUsage v-else cmd="pwd" />
</template>
