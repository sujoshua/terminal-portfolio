<script setup lang="ts">
import GerneralUsage from '@/components/GerneralUsage.vue';
import type { TermContext } from '@/components/TermContextProvider.vue';
import { inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { setTheme, supportedTheme } from '@/theme';

const { t } = useI18n();

const ctx = inject<TermContext>('termContext');

const valid = (() => {
  if (!ctx) return false;
  const { cmd, arg } = ctx;

  if (cmd !== 'theme') return false;
  if (arg.length !== 2) return false;

  switch (arg[0]) {
    case 'set':
      break
    default:
      return false;
  }

  return supportedTheme.includes(arg[1]);
})()

if (valid) {
  const { arg } = ctx!;
  setTheme(arg[1]);
}

const cmdUsage = {
  cmd: 'theme',
  action: 'set',
  arg: {
    placeholder: 'theme',
    example: 'dark',
  },
}
</script>

<template>
  <template v-if="!valid">
    <GerneralUsage :cmd="cmdUsage.cmd" :action="cmdUsage.action" :arg="cmdUsage.arg">
      <div class="theme-wrapper">
        <span v-for="(theme) in supportedTheme" v-bind:key="theme" class="theme-span">
          {{ theme }}
        </span>
      </div>
    </GerneralUsage>
  </template>
  <template v-else>
    <div>
      {{ t('theme.success') }}
    </div>
  </template>
</template>


<style lang="css" scoped>
.theme-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.theme-span {
  margin-right: 0.875rem;
  margin-bottom: 0.25rem;
  white-space: nowrap;
}
</style>
