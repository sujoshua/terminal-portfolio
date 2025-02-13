import { langCompletion } from './lang'
import { projectCompletion } from './project'
import { socialCompletion } from './social'
import { themeCompletion } from './theme'

export type Command = {
  cmd: string
  desc: string
}

const commands: Command[] = [
  { cmd: 'about', desc: 'command.desc.about' },
  { cmd: 'clear', desc: 'command.desc.clear' },
  { cmd: 'echo', desc: 'command.desc.echo' },
  { cmd: 'education', desc: 'command.desc.education' },
  { cmd: 'email', desc: 'command.desc.email' },
  { cmd: 'help', desc: 'command.desc.help' },
  { cmd: 'history', desc: 'command.desc.history' },
  { cmd: 'project', desc: 'command.desc.project' },
  { cmd: 'pwd', desc: 'command.desc.pwd' },
  { cmd: 'social', desc: 'command.desc.social' },
  { cmd: 'theme', desc: 'command.desc.theme' },
  { cmd: 'welcome', desc: 'command.desc.welcome' },
  { cmd: 'whoami', desc: 'command.desc.whoami' },
  { cmd: 'lang', desc: 'command.desc.lang' },
]
export default commands

function prefixCompletion(input: string): Completion {
  const hints: string[] = []

  commands.forEach((cmd) => {
    if (cmd.cmd.startsWith(input)) {
      hints.push(cmd.cmd)
    }
  })

  return {
    text: input,
    hints,
    continue: hints.length === 0,
  }
}

export function isValidCommand(intput: string): boolean {
  return commands.some((command) => command.cmd === intput)
}

export function parseCommand(input: string): { cmd: string; args: string[] } {
  const cmdArray = input.trim().split(' ')
  return {
    cmd: cmdArray[0],
    args: cmdArray.slice(1),
  }
}

export type Completion = {
  text: string
  hints: string[]
  continue: boolean
}

// return text meant to display in the terminal
export function argTab(input: string): { text: string; hints: string[] } {
  let text = input.trimStart()
  const hints: string[] = []

  const completionFuncs: ((input: string) => Completion)[] = [
    prefixCompletion, // do simple completion first
    projectCompletion,
    socialCompletion,
    langCompletion,
    themeCompletion,
  ]

  for (const op of completionFuncs) {
    const result = op(text)
    hints.push(...result.hints)
    // to be used in next round
    text = result.text
    if (!result.continue) {
      break
    }
  }

  return {
    text,
    hints,
  }
}
