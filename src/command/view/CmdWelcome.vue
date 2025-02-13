<script setup lang="ts">
import GerneralUsage from '@/components/GerneralUsage.vue';
import type { TermContext } from '@/components/TermContextProvider.vue';
import { inject } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const ctx = inject<TermContext>('termContext');

const valid = ctx?.cmd === 'welcome' && ctx?.arg.length === 0;


const avatar = `
              ################
          #####              ######
        ###                     ####
       ##                           ###
     ##                   ###         ##
    ##                 ####            ###
   ##    ######      ####               ##
  ##         ###        ####             ##
  ##       ###                            ##
 ##       ##                              ##
 ##              ###########              ##
 ##           ###          ###            ##
  ##        ##              ##           ###
  ##        ##               ##         ###
   ##     #######  #####     ##        ###
    ##   ###    ####   ########       ###
     ##  ###     ##     #####         ##
       ## ##     ##      ##         ###
        ####      #       ##           ##
          ###      #       ##
          ####     #        ##
`


</script>
<template>
  <div v-if="valid" class="welcome-container">
    <div class="info-section">
      <div class="pre-name-mobile-wrapper">
        <pre class="pre-name pre-name-mobile">
   ___           _
  |_  |         | |
    | | ___  ___| |__  _   _  __ _
    | |/ _ \/ __| '_ \| | | |/ _` |
/\__/ / (_) \__ \ | | | |_| | (_| |
\____/ \___/|___/_| |_|\__,_|\__,_|
             _____
            /  ___|
            \ `--. _   _
             `--. \ | | |
            /\__/ / |_| |
            \____/ \__,_|
      </pre>
      </div>
      <pre class="pre-name pre-name-desktop">
   ___           _                   _____
  |_  |         | |                 /  ___|
    | | ___  ___| |__  _   _  __ _  \ `--. _   _
    | |/ _ \/ __| '_ \| | | |/ _` |  `--. \ | | |
/\__/ / (_) \__ \ | | | |_| | (_| | /\__/ / |_| |
\____/ \___/|___/_| |_|\__,_|\__,_| \____/ \__,_|
      </pre>
      <p>{{ t('welcome.intro') }}</p>
      <div class="seperator">----</div>
      <i18n-t keypath="welcome.githubLink" tag="p">
        <a class="link" href="https://github.com/sujoshua/terminal-portfolio">
          GitHub repo
        </a>.
      </i18n-t>
      <div class="seperator">----</div>
      <i18n-t keypath="welcome.helpTip" tag="p">
        <span class="cmd">help</span>
      </i18n-t>
    </div>
    <div class="illu-section">
      <pre class="pre-img">{{ avatar }}</pre>
    </div>
  </div>
  <GerneralUsage v-else cmd="welcome" />
</template>

<style scoped>
.welcome-container {
  display: flex;
  flex-wrap: wrap-reverse;

  @media (max-width: 932px) {
    margin-bottom: 1.5rem;
  }

  div {
    @media (min-width: 1024px) {
      flex-basis: 50%;
    }
  }
}

.pre-name {
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
}

.pre-name-desktop {
  font-size: 1rem;

  @media (max-width: 650px) {
    display: none;
  }
}

.pre-name-mobile-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pre-name-mobile {
  font-size: 0.75rem;

  @media (min-width: 650px) {
    display: none;
  }
}

.pre-img {
  font-size: 0.75rem;

  @media (max-width: 550px) {
    display: none;
  }
}

.seperator {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

.cmd {
  color: var(--primary-color);
}

.link {
  color: var(--secondary-color);
  text-decoration: none;
  border-bottom: 2px dashed var(--secondary-color);
  inline-size: 1.5rem;
  white-space: nowrap;

  &:hover {
    border-bottom-style: solid;
  }
}
</style>
