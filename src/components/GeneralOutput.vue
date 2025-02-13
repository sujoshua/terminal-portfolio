<script setup lang="ts">


const props = defineProps<{
  text: string | undefined;
}>();

</script>

<template>
  <p>{{ props?.text }}</p>
</template>
