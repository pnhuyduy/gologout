import crypto from "crypto"

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const randomFloat = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

export const randomUID = (length = 30) => {
  const uid = crypto.randomBytes(length).toString("hex")
  return uid
}
