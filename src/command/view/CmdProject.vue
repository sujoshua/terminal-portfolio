<script setup lang="ts">
import GerneralUsage from '@/components/GerneralUsage.vue';
import type { TermContext } from '@/components/TermContextProvider.vue';
import { inject } from 'vue';
import { redirect } from '@/utils/funcs';
import projects from '../project';
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

  if (index < 1 || index > projects.length) return false;

  return true;
})()

if (valid) {
  // we have checked in valid, so we can safely cast it
  const index = parseInt(ctx?.arg[1] as string) - 1;
  redirect(projects[index].url);
}

const cmdUsage = {
  cmd: 'project',
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
      <div class="project-info">
        <p>
          "Talk is cheap, <del>so we sleep</del>. show me the code."
        </p>
        <p>
          {{ t('project.intro') }}
        </p>
      </div>
      <div class="project-wrapper">
        <div v-for="(project, index) in projects" v-bind:key="project.title">
          <p class="project-title">{{ index + 1 }}. {{ t(project.title) }}</p>
          <p class="project-desc">{{ t(project.desc) }}</p>
        </div>
      </div>
    </GerneralUsage>
  </template>
  <div v-else />
</template>


<style lang="css" scoped>
.project-info {
  margin-bottom: 1.5rem;
}

.project-wrapper {
  margin-top: 0.5rem;
}

.project-title {
  font-weight: 700;
  margin-bottom: 0.25rem;
  margin-top: 1rem;
}

.project-desc {
  color: var(--text-color-200);
  text-align: justify;
  max-width: 500px;
}
</style>
