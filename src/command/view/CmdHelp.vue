<script setup lang="ts">
import AlignList from '@/components/AlignList.vue';
import commands from '../command';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t } = useI18n();

const cmds = computed(() => {
  return commands.map((item) => {
    return {
      key: item.cmd,
      value: t(item.desc),
    }
  });
});

const shortCuts = computed(() => {
  console.log(t('command.name.updownArrow'))
  return [
    {
      key: 'Tab or Ctrl + i',
      value: t('command.desc.tab'),
    },
    {
      key: t('command.name.updownArrow'),
      value: t('command.desc.updown'),
    },
    {
      key: 'Ctrl + l',
      value: t('command.desc.clear'),
    },
  ];
});

</script>

<template>
  <AlignList class="cmdList" :list="cmds" :base-tab="8" key-color value-color />
  <AlignList class="shortList" :list="shortCuts" :base-tab="4" delimiter="=>" />
</template>

<style lang="css" scoped>
.cmdList {
  margin-bottom: 1.5rem;
}

.shortList {
  font-size: 1rem;
}
</style>
