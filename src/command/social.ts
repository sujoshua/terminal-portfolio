import i18n from '@/locales'

export type Social = {
  title: string
  url: string
}

// like social.github is to support i18n, it will be used like t(socials[0].title)
const socials: Social[] = [
  {
    title: 'social.github',
    url: 'https://github.com/sujoshua',
  },
  {
    title: 'social.bilibili',
    url: 'https://space.bilibili.com/315262778',
  },
]

export default socials

export function socialCompletion(input: string): {
  text: string
  hints: string[]
  continue: boolean
} {
  // 1) if input is 'social ' or 'social g'
  if (input === 'social ' || input === 'social g') {
    return {
      text: `social go`,
      hints: [],
      continue: false,
    }
  }

  // 2) if input is 'socials go '
  else if (input.startsWith('social go ')) {
    const hints: string[] = []
    socials.forEach((s, i) => {
      hints.push(i + 1 + '.' + i18n.global.t(s.title))
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
