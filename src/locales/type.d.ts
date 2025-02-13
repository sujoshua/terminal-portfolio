import type { Message } from './langs'
import 'vue-i18n'

declare module 'vue-i18n' {
  // do not replace with 'export type DefineLocaleMessage = Message',
  // you will lose type completion in .vue files
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefineLocaleMessage extends Message {}
}
