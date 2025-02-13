<script setup lang="ts">
import GerneralUsage from '@/components/GerneralUsage.vue';
import type { TermContext } from '@/components/TermContextProvider.vue';
import { computed, inject } from 'vue';
import socials from '../social';
import AlignList from '@/components/AlignList.vue';
import { redirect } from '@/utils/funcs';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const ctx = inject<TermContext>('termContext');

const valid = (() => {
  if (!ctx) return false;
  const { cmd, arg } = ctx;

  if (cmd !== 'social') return false;
  if (arg.length !== 2) return false;

  switch (arg[0]) {
    case 'go':
      break
    default:
      return false;
  }

  const index = parseInt(arg[1]);
  if (isNaN(index)) return false;

  if (index < 1 || index > socials.length) return false;

  return true;
})()

if (valid) {
  // we have checked in valid, so we can safely cast it
  const index = parseInt(ctx?.arg[1] as string) - 1;
  redirect(socials[index].url);
}

const sl = computed(() => socials.map((social, index) => {
  return {
    key: (index + 1) + '. ' + t(social.title),
    value: social.url,
  }
}))

const cmdUsage = {
  cmd: 'social',
  action: 'go',
  arg: {
    placeholder: 'no.',
    example: '1',
  },
}
</script>

<template>
  <template v-if="!valid">
    <GerneralUsage :cmd="cmdUsage.cmd" :action="cmdUsage.action" :arg="cmdUsage.arg">
      <div class="social-info">{{ t('social.intro') }}</div>
      <AlignList :list="sl" />
    </GerneralUsage>
  </template>
  <div v-else />
</template>


<style lang="css" scoped>
.social-info {
  margin-bottom: 1rem;
  line-height: 1.5rem;
}
</style>
