<script setup lang="ts">
import GerneralUsage from '@/components/GerneralUsage.vue';
import type { TermContext } from '@/components/TermContextProvider.vue';
import { inject } from 'vue';
import langs from '../lang';
import { useI18n } from 'vue-i18n';
import { setToLS } from '@/utils/storage';

const { t, locale } = useI18n();

const ctx = inject<TermContext>('termContext');

const valid = (() => {
  if (!ctx) return false;
  const { cmd, arg } = ctx;

  if (cmd !== 'lang') return false;
  if (arg.length !== 2) return false;

  switch (arg[0]) {
    case 'set':
      break
    default:
      return false;
  }

  return langs.includes(arg[1]);
})()

if (valid) {
  const { arg } = ctx!;
  setToLS('lang', arg[1]);
  locale.value = arg[1];
}

const cmdUsage = {
  cmd: 'lang',
  action: 'set',
  arg: {
    placeholder: 'lang',
    example: 'zh',
  },
}
</script>

<template>
  <template v-if="!valid">
    <GerneralUsage :cmd="cmdUsage.cmd" :action="cmdUsage.action" :arg="cmdUsage.arg">
      <div class="theme-wrapper">
        <span v-for="(lang) in langs" v-bind:key="lang" class="theme-span">
          {{ lang }}
        </span>
      </div>
    </GerneralUsage>
  </template>
  <template v-else>
    <div>
      {{ t('lang.success') }}
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
