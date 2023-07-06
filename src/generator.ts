import { defaultPreferences, gologinConfig } from "./template"
import rfdc from "rfdc"
import { nanoid } from "nanoid/non-secure"
import { randomFloat, randomUID } from "./utils"
import { IOptions, IProfile } from "./types"
const clone = rfdc()

export const getNewFingerprint = (payload: IProfile) => {
  const newGologinConfig = clone(gologinConfig)

  // Proxy
  const { username, password } = payload.proxy
  newGologinConfig.proxy.username = username
  newGologinConfig.proxy.password = password

  // Timezone
  newGologinConfig.timezone.id = payload.timezone

  // name
  newGologinConfig.profile_id = nanoid(10)
  newGologinConfig.name = nanoid(5)

  // Audio context
  newGologinConfig.audioContext.noiseValue = parseFloat(
    (randomFloat(1, 9) / 100000000).toExponential(12),
  )

  // Media devices
  newGologinConfig.mediaDevices.uid = randomUID(58)

  // Canvas
  newGologinConfig.canvasNoise = parseFloat(Math.random().toFixed(8))

  // webGL
  newGologinConfig.webglNoiseValue = parseFloat(randomFloat(1, 99).toFixed(3))

  // client Rects
  newGologinConfig.get_client_rects_noise = parseFloat(
    randomFloat(1, 9).toFixed(4),
  )

  const prefs = {
    ...clone(defaultPreferences),
    gologin: newGologinConfig,
  }

  return prefs
}

export const spawnArgs = (options: IOptions, payload: IProfile) => {
  const { userDataDir } = options
  const { proxy, timezone } = payload
  let proxyStr = `${proxy.mode}://${proxy.host}:${proxy.port}`

  let params = [
    `--user-data-dir=${userDataDir}`,
    `--tz=${timezone}`,
    "--lang=en",
    "--font-masking-mode=2",
    "--password-store=basic",
  ]

  const hr_rules = `"MAP * 0.0.0.0 , EXCLUDE ${proxy.host}"`
  params.push(`--proxy-server=${proxyStr}`)
  params.push(`--host-resolver-rules=${hr_rules}`)

  return params
}
