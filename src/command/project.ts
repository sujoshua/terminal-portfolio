import i18n from '@/locales'
import type { Completion } from './command'

export type Project = {
  id: number
  title: string
  desc: string
  url: string
}

// like project.blogTitle is to support i18n, it will be used like t(projects[0].title)
const projects = [
  {
    title: 'project.blogTitle',
    desc: 'project.blogDesc',
    url: 'https://blog.joshua.su',
  },
  {
    title: 'project.mirrorTitle',
    desc: 'project.mirrorDesc',
    url: 'https://mirrors.cqupt.edu.cn',
  },
  {
    title: 'To do 1',
    desc: 'To do.',
    url: 'https://joshua.su',
  },
  {
    title: 'To do 2',
    desc: 'To do.',
    url: 'https://joshua.su',
  },
]

export default projects

export function projectCompletion(input: string): Completion {
  // 1) if input is 'project ' or 'project g'
  if (input === 'project ' || input === 'project g') {
    return {
      text: `project go`,
      hints: [],
      continue: false,
    }
  }

  // 2) if input is 'project go '
  else if (input.startsWith('project go ')) {
    const hints: string[] = []
    projects.forEach((p, index) => {
      hints.push(index + 1 + '.' + i18n.global.t(p.title))
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
