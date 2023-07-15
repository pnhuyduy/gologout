// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import crypto from "crypto"
import listVendor from "./webgl"
import { IProxy } from "./types"
import { HttpsProxyAgent } from "hpagent"
import ProxyAgent from "simple-proxy-agent"
import https from "https"

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

export const extractProxyInfo = (d: string) => {
  try {
    const data = JSON.parse(`${d.toString()}`.trim())
    let results = {
      ip: "",
      country: "",
      timezone: "",
      latitude: "",
      longitude: "",
      accuracy: null,
    }

    results = {
      ip: data.ip,
      country: data.country,
      timezone: data.timezone,
      latitude: data.ll[0],
      longitude: data.ll[1],
      accuracy: data.accuracy || null,
    }

    return results
  } catch (error) {
    return null
  }
}

export const checkTimezone = async (
  proxy: IProxy,
): Promise<null | {
  ip: string
  country: string
  timezone: string
  latitude: string
  longitude: string
  accuracy: null | number
}> => {
  let proxyAgent = `${proxy.mode}://${proxy.host}:${proxy.port}`
  let agent: any
  let data: any = null
  if (proxy.username && proxy.password) {
    proxyAgent = `${proxy.mode}://${encodeURIComponent(
      proxy.username,
    )}:${encodeURIComponent(proxy.password)}@${proxy.host}:${proxy.port}`
  }

  if (proxy.mode === "http") {
    agent = new HttpsProxyAgent({
      keepAlive: true,
      keepAliveMsecs: 1000,
      maxSockets: 256,
      maxFreeSockets: 256,
      proxy: proxyAgent,
    })
  } else {
    agent = new ProxyAgent(proxyAgent)
  }

  return new Promise((resolve, reject) => {
    https
      .get(
        "https://time.gologin.com/timezone",
        {
          agent,
          rejectUnauthorized: false,
          timeout: 10000,
        },
        (response) => {
          response.on("error", (err) => {
            resolve(null)
          })
          response.on("data", (d) => {
            data = extractProxyInfo(d)
          })

          response.on("end", () => {
            if (data) {
              resolve(data)
            } else {
              resolve(null)
            }
          })
        },
      )
      .on("error", () => resolve(null))
      .end()
  })
}
