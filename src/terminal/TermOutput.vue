<script setup lang="ts">
import { computed, h } from "vue";
import CmdPwd from "@/command/view/CmdPwd.vue";
import CmdAbout from "@/command/view/CmdAbout.vue";
import CmdWhoAmI from "@/command/view/CmdWhoAmI.vue";
import CmdEcho from "@/command/view/CmdEcho.vue";
import CmdHistory from "@/command/view/CmdHistory.vue";
import CmdClear from "@/command/view/CmdClear.vue";
import CmdEducation from "@/command/view/CmdEducation.vue";
import CmdEmail from "@/command/view/CmdEmail.vue";
import CmdWelcome from "@/command/view/CmdWelcome.vue";
import CmdSocial from "@/command/view/CmdSocial.vue";
import CmdProject from "@/command/view/CmdProject.vue";
import CmdHelp from "@/command/view/CmdHelp.vue";
import CmdLang from "@/command/view/CmdLang.vue";
import CmdTheme from "@/command/view/CmdTheme.vue";


const props = defineProps<{
  cmd: string;
}>();


// cmd to render
const ComponentToRender = computed(() => {
  switch (props.cmd) {
    case "pwd":
      return CmdPwd
    case "whoami":
      return CmdWhoAmI
    case 'about':
      return CmdAbout
    case 'echo':
      return CmdEcho
    case 'history':
      return CmdHistory
    case 'clear':
      return CmdClear
    case 'education':
      return CmdEducation
    case 'email':
      return CmdEmail
    case 'welcome':
      return CmdWelcome
    case 'social':
      return CmdSocial
    case 'project':
      return CmdProject
    case 'lang':
      return CmdLang
    case 'help':
      return CmdHelp
    case 'theme':
      return CmdTheme
    default:
      // you should not reach here
      return h('div')
  }
});
</script>

<template>
  <div class="output-container">
    <component :is="ComponentToRender" />
  </div>
</template>

<style lang="css" scoped></style>
