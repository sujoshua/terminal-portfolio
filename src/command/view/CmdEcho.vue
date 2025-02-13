<script setup lang="ts">
import GeneralOutput from '@/components/GeneralOutput.vue';
import type { TermContext } from '@/components/TermContextProvider.vue';
import { inject } from 'vue';


const ctx = inject<TermContext>('termContext');

const echoText = ctx?.arg.join(' ');
</script>

<template>
  <GeneralOutput :text="echoText" />
</template>
