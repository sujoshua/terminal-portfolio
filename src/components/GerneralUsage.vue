<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  cmd: string;
  action?: string;
  arg?: {
    placeholder: string;
    example: string;
  };
}>();

const usage = computed(() => {
  // like commnd pwd no action: Usage: pwd
  if (!props.action || !props.arg) {
    return `Usage: ${props.cmd}`;
  }

  // like command projects has action: Usage: projects go <project-no>
  return `${t('usage.usage')}: ${props.cmd} ${props.action} <${props.arg.placeholder}>`;
});

const eg = computed(() => {
  // like command pwd no eg
  if (!props.action || !props.arg) {
    return '';
  }

  // like command projects has action: eg: projects go 1
  return `${t('usage.eg')}: ${props.cmd} ${props.action} ${props.arg.example}`;
});

</script>

<template>
  <div class="usage-wrapper">
    <span>{{ usage }}</span>
    <template v-if="eg">
      <br />
      <span>{{ eg }}</span>
    </template>

    <div class="child-wrapper" v-if="$slots.default">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.usage-wrapper {
  line-height: 1.5rem;

  span {
    margin-bottom: 0.5rem;
  }
}

.child-wrapper {
  margin-top: 1.5rem;
}
</style>
