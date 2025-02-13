import zh from './langs/zh.json'
import en from './langs/en.json'

export type Message = typeof zh

export const supportedLang = ['zh', 'en']

export type Messages = {
  [key in (typeof supportedLang)[number]]: Message
}

const messages: Messages = {
  zh,
  en,
}

export default messages
