/* due to limitation of v-bind, we cannot use it in global scope style.
so we have to use watch and css variable to update the style.
issue: https://github.com/vuejs/core/issues/5007
*/
import { setToLS } from '@/utils/storage'
import themes, { type Theme } from './config'

export const supportedTheme = Object.keys(themes)

function setGlobalCssVar(name: string, value: string) {
  document.documentElement.style.setProperty(name, value)
}

function getDefaultTheme(): string {
  // from local storage
  const theme = localStorage.getItem('theme')
  if (theme && supportedTheme.includes(theme)) {
    return theme
  }

  // from system preference
  const systemPrefDark = window.matchMedia('(prefers-color-scheme: dark)')
  if (systemPrefDark.matches) {
    return 'dark'
  }

  const systemPrefLight = window.matchMedia('(prefers-color-scheme: light)')
  if (systemPrefLight.matches) {
    return 'light'
  }

  // default theme
  return 'dark'
}

export function setTheme(themeName: string) {
  // invalid theme, use default theme
  if (!supportedTheme.includes(themeName)) {
    themeName = getDefaultTheme()
  } else {
    setToLS('theme', themeName)
  }

  const theme: Theme = themes[themeName]

  const v: {
    [key: string]: string
  } = {
    '--primary-color': theme.colors.primary,
    '--secondary-color': theme.colors.secondary,
    '--body-color': theme.colors.body,
    '--text-color-100': theme.colors.text[100],
    '--text-color-200': theme.colors.text[200],
    '--text-color-300': theme.colors.text[300],
    '--scrollHandle-color': theme.colors.scrollHandle,
    '--scrollHandleHover-color': theme.colors.scrollHandleHover,
  }

  for (const key in v) {
    setGlobalCssVar(key, v[key])
  }
}

export default {
  install() {
    setTheme('')
  },
}
