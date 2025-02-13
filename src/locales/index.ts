import { createI18n } from 'vue-i18n'
import messages, { supportedLang } from './langs'
import { getFromLS } from '@/utils/storage'

function defaultLocale(): string {
  // get user preferred language from local storage
  let locale = getFromLS('lang')
  // check locale validity
  if (locale && supportedLang.includes(locale)) {
    return locale
  }

  // get from browser
  locale = navigator.language.split('-')[0]
  // check locale validity
  if (supportedLang.includes(locale)) {
    return locale
  }
  // default to en
  return 'en'
}

const options = {
  legacy: false, // disable to use Composition API
  locale: defaultLocale(),
  fallbackLocale: 'zh',
  globalInjection: true,
  allowComposition: true,
  messages,
}

const i18n = createI18n(options)

export default i18n
