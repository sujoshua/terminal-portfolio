// DJB2 hash function
export function hashString(str: string): string {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i)
  }
  return (hash >>> 0).toString(16)
}

export function redirect(url: string): void {
  window.open(url, '_blank')
}

export function isEnglishCharacter(char: string): boolean {
  return /^[A-Za-z0-9.,'!/+ ]$/.test(char)
}

// calculate the byte length of a string, which means if the string contains a Chinese character, it will be counted as 2 bytes
export function byteLength(str: string): number {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    if (isEnglishCharacter(str[i])) {
      len++
    } else {
      len += 2
    }
  }
  return len
}
