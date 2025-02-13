<script setup lang="ts">
import { onMounted } from 'vue';
import TermMain from './terminal/TermMain.vue';


onMounted(() => {
  // Disable browser's default behavior
  // to prevent the page go up when Up Arrow is pressed
  window.addEventListener("keydown", e => {
    if (["ArrowUp", "ArrowDown"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
  });
})


</script>

<template>
  <h1 className="sr-only" aria-label="Terminal Portfolio">
    Terminal Portfolio
  </h1>

  <TermMain />
</template>

<style scoped>
.sr-only {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style>
