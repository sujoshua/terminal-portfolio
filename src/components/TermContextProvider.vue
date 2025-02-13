<script setup lang="ts">
import { provide } from 'vue';

const contextKey = "termContext";

export type TermContext = {
  cmd: string;
  arg: string[];
  clearHistory: () => void;
  getHistory: () => string[];
};

const props = defineProps<{
  value: TermContext
}>()

provide(contextKey, props.value);
</script>


<template>
  <slot></slot>
</template>
