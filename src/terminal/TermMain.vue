<script setup lang="ts">
import { ref, useTemplateRef, computed, toRaw, onMounted } from 'vue';
import TermInfo from '@/terminal/TermInfo.vue';
import TermProvider, { type TermContext } from '@/components/TermContextProvider.vue';
import { argTab, isValidCommand, parseCommand } from '@/command/command';
import TermOutput from './TermOutput.vue';
import { hashString } from '@/utils/funcs';
import EmptyOutput from '@/components/EmptyOutput.vue';



const inputRef = useTemplateRef('input')
const inputVal = defineModel<string>();
const cmdHistory = ref(['welcome']);
const hints = ref<string[]>([]);
const pointer = ref(-1);

// Focus on the input forever
const focusInput = () => {
  setTimeout(() => {
    inputRef.value?.focus();
  }, 1);
};
onMounted(() => document.addEventListener('click', focusInput));



// Handle form submission
const handleSubmit = () => {
  cmdHistory.value = [inputVal.value || '', ...cmdHistory.value];
  inputVal.value = '';
  hints.value = [];
  pointer.value = -1;
};

// Clear history
const clearHistory = () => {
  cmdHistory.value = [];
  hints.value = [];
};

// Get history
const getHistory = () => {
  return [...toRaw(cmdHistory.value)];
};


// Handle keyboard press (Tab, Arrow keys, etc.)
const handleKeyDown = (e: KeyboardEvent) => {
  const ctrlI = e.ctrlKey && e.key.toLowerCase() === 'i';
  const ctrlL = e.ctrlKey && e.key.toLowerCase() === 'l';

  // if Tab or Ctrl + I
  if (e.key === 'Tab' || ctrlI) {
    e.preventDefault();
    if (!inputVal.value) return;

    const { text: input, hints: hintsCmds } = argTab(inputVal.value);
    if (hintsCmds.length === 1) {
      const currentCmd = inputVal.value.split(' ');
      inputVal.value = currentCmd.length !== 1 ? `${currentCmd[0]} ${currentCmd[1]} ${hintsCmds[0]}` : hintsCmds[0];
      hints.value = [];
    } else {
      inputVal.value = input;
      hints.value = hintsCmds;
    }
  }

  if (ctrlL) {
    clearHistory();
  }

  if (e.key === 'ArrowUp') {
    if (pointer.value >= cmdHistory.value.length) return;
    if (pointer.value + 1 === cmdHistory.value.length) return;
    inputVal.value = cmdHistory.value[pointer.value + 1];
    pointer.value += 1;
    inputRef.value?.blur();
  }

  if (e.key === 'ArrowDown') {
    if (pointer.value < 0) return;
    if (pointer.value === 0) {
      inputVal.value = '';
      pointer.value = -1;
      return;
    }
    inputVal.value = cmdHistory.value[pointer.value - 1];
    pointer.value -= 1;
    inputRef.value?.blur();
  }
};


type CmdHistoryComputed = {
  key: string;
  raw: string;
  cmd: string;
  args: string[];
  isCmdValid: boolean;
  ctx: TermContext;
};

const cmdHistoryComputed = computed(() =>
  cmdHistory.value.map((cmdH: string): CmdHistoryComputed => {
    const { cmd, args } = parseCommand(cmdH);

    return {
      key: hashString(cmdH),
      raw: cmdH,
      cmd: cmd,
      args: args,
      isCmdValid: isValidCommand(cmd),
      ctx: {
        cmd: cmd,
        arg: args,
        clearHistory,
        getHistory,
      }
    }
  })
)
</script>


<template>
  <div class="terminal-wrapper">
    <div v-if="hints.length > 1" class="hint-wrapper">
      <span v-for="(hint, index) in hints" :key="index">
        {{ hint }}
      </span>
    </div>

    <form class="form" @submit.prevent="handleSubmit">
      <label for="terminal-input">
        <TermInfo />
        <br class="mobile-br" />
        <span class="mobile-span">&#62;</span>
      </label>
      <input class="input" id="terminal-input" type="text" v-model="inputVal" ref="input" @blur="focusInput"
        @keydown="handleKeyDown" autocomplete="off" spellcheck="false" autofocus autocapitalize="off"
        :title="'terminal-input'" />
    </form>

    <div v-for="cmdH in cmdHistoryComputed" :key="cmdH.key">
      <div>
        <TermInfo />
        <br class="mobile-br" />
        <span class="mobile-span">&#62;</span>
        <span>{{ cmdH.raw }}</span>
      </div>
      <div v-if="cmdH.isCmdValid" class="cmd-wrapper">
        <TermProvider :value="cmdH.ctx">
          <TermOutput :cmd="cmdH.cmd" />
        </TermProvider>
      </div>
      <EmptyOutput v-else-if="cmdH.cmd === ''" />
      <div v-else class="cmd-wrapper">
        <span>
          command not found: {{ cmdH.raw }}
        </span>
      </div>
    </div>
  </div>
</template>


<style scoped>
.terminal-wrapper {
  padding: 1.25rem;
  padding-top: 0.75rem;

  display: flex;
  flex-direction: column-reverse;

  max-height: calc(100vh - 2rem);
  overflow-y: auto;
}

.cmd-wrapper {
  padding-top: 0.25rem;
  padding-bottom: 1rem;
}


.mobile-span {
  line-height: 1.5rem;
  margin-right: 0.75rem;

  @media (min-width: 550px) {
    display: none;
  }
}

.mobile-br {
  @media (min-width: 550px) {
    display: none;
  }
}

.form {
  @media (min-width: 550px) {
    display: flex;
  }
}

.input {
  flex-grow: 1;
  font-size: inherit;
  font-family: inherit;
  line-height: 1.15;
  margin: 0;
  padding-left: 0;

  @media (max-width: 550px) {
    min-width: 85%;
  }
}

.hint-wrapper {
  margin-top: 0.25rem;

  span {
    line-height: 1.15;
    margin-right: 0.875rem;
  }
}
</style>
