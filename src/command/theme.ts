import { supportedTheme } from '@/theme'
import { parseCommand, type Completion } from './command'

export function themeCompletion(input: string): Completion {
  const { cmd, args } = parseCommand(input)

  // 1) if input is 'theme '
  if (input === 'theme ') {
    return {
      text: `theme set`,
      hints: [],
      continue: false,
    }
  }

  // 2) if input is 'theme s'
  else if ('theme'.startsWith(cmd) && args[0] !== 'set' && 'set'.startsWith(args[0])) {
    return {
      text: `theme set`,
      hints: [],
      continue: false,
    }
  }

  // 3) if input is 'themes set '
  else if (input === 'theme set ') {
    return {
      text: input,
      hints: supportedTheme,
      continue: false,
    }
  }

  // 4) if input starts with 'theme set ' + theme
  else if (input.startsWith('theme set ')) {
    const hints: string[] = []
    supportedTheme.forEach((t) => {
      if (t.startsWith(args[1])) {
        hints.push(t)
      }
    })
    return {
      text: input,
      hints,
      continue: false,
    }
  }

  return {
    text: input,
    hints: [],
    continue: true,
  }
}
