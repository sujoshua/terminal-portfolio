export const setToLS = (key: string, value: string) => {
  // window.localStorage.setItem(key, JSON.stringify(value));
  window.localStorage.setItem(key, value)
}

export const getFromLS = (key: string): string => {
  const value = window.localStorage.getItem(key)

  if (value) {
    return value
  }

  return ''
}
