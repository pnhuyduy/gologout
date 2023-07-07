import crypto from "crypto"
import listVendor from "./webgl"

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const randomFloat = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

export const randomUID = (length = 30) => {
  const uid = crypto.randomBytes(length).toString("hex")
  return uid
}

export const randomWebGL = () => {
  const vendor = listVendor[Math.floor(Math.random() * listVendor.length)]
  const renderer =
    vendor.renderer[Math.floor(Math.random() * vendor.renderer.length)]
  return {
    mode: true,
    renderer: renderer.value,
    vendor: vendor.value,
  }
}
