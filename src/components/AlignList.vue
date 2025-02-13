<script setup lang="ts">
import { byteLength } from '@/utils/funcs';
import { computed } from 'vue';


const prop = defineProps<{
  list: {
    key: string;
    value: string;
  }[]
  delimiter?: string;  // default is -
  keyColor?: boolean // enable key color, default is false
  valueColor?: boolean // enable value color, default is false
  baseTab?: number; // default is 2
}>();

// calculate the number of tab to fill
const tab = computed(() => {
  const longestKeyLength = prop.list.reduce((acc, cur) => {
    return Math.max(acc, byteLength(cur.key));
  }, 0);
  return prop.list.map((item): string => {
    console.log(item.key, byteLength(item.key), longestKeyLength);
    // we will add base tabs even for the longest key
    return '\xA0'.repeat(longestKeyLength - byteLength(item.key) + (prop.baseTab ?? 2));
  })
})

const keyClass = computed(() => prop.keyColor ? 'item-key-color' : '');
const valueClass = computed(() => prop.valueColor ? 'item-value-color' : '');
</script>

<template>
  <div class="alignlist">
    <p v-for="(item, index) in prop.list" v-bind:key="item.key" class="item">
      <span :class="keyClass">{{ item.key + tab[index] }}</span>
      <span class="item-value" :class="valueClass">{{ prop.delimiter ?? '-' }} {{ item.value }}</span>
    </p>
  </div>
</template>

<style lang="css" scoped>
.item-key-color {
  color: var(--primary-color);
}

.item-value-color {
  color: var(--text-color-100);
}

.item-value {
  margin-bottom: 0.75rem;

  @media (max-width: 550px) {
    display: block;
  }
}
</style>
