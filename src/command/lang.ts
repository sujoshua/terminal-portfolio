import { supportedLang } from '@/locales/langs'
import type { Completion } from './command'

const langs = supportedLang

export default langs

export function langCompletion(input: string): Completion {
  // 1) if input is 'lang ' or 'lang s' or 'lang se'
  if (input === 'lang ' || input === 'lang s' || input === 'lang se') {
    return {
      text: `lang set`,
      hints: [],
      continue: false,
    }
  }

  // 2) if input is 'lang set '
  if (input.startsWith('lang set ')) {
    return {
      text: input,
      hints: [...langs],
      continue: false,
    }
  }

  return {
    text: input,
    hints: [],
    continue: true,
  }
}
