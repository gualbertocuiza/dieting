export const isRequired = (value: string | undefined) => {
  if (!value) {
    return `This field is required`
  }
  return true
}

export const isValidEmail = (value: string) => {
  const res = value.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  if (!res) {
    return 'Must be a valid email'
  }
  return true
}

export const isLength = (value: string, min: number, max?: number) => {
  const length = value.length
  if (max && max < length) {
    return `This field must have less than ${max} characters`
  }
  if (min > length) {
    return `This field must have at least ${min} characters`
  }
  return true
}

export function isMatching(password: string, confirmation: string) {
  if (!password || !confirmation || password != confirmation) {
    return 'The passwords do not match'
  }
  return true
}

export function calcComplexity(val: string) {
  if (!val) {
    return 0
  }
  if (val.length >= 10) {
    return 3
  }
  if (val.length >= 7) {
    return 2
  }
  if (val.length >= 5) {
    return 1
  }
  return 0
}
