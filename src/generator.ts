import { defaultPreferences, gologinConfig } from "./template"
import rfdc from "rfdc"
import { randomFloat, randomInt, randomUID, randomWebGL } from "./utils"
import { IOptions, IProfile } from "./types"
import { platform, arch } from "os"
const clone = rfdc()

export const getNewFingerprint = (payload: IProfile, options: IOptions) => {
  const newGologinConfig = clone(gologinConfig)

  // name
  newGologinConfig.name = payload.name || randomUID(5)

  // Proxy
  if (payload.proxy.mode) {
    const { username, password } = payload.proxy
    newGologinConfig.proxy.username = username
    newGologinConfig.proxy.password = password
    // Timezone
    newGologinConfig.timezone.id = payload.timezone
  }

  // audio
  const audioNoiseValue = parseFloat(
    (randomFloat(1, 9) / 100000000).toExponential(12),
  )
  newGologinConfig.audioContext.noiseValue = audioNoiseValue
  newGologinConfig.audioContext.enable = options.audioContext === "noise"

  // canvas
  const canvasNoise = parseFloat(Math.random().toFixed(8))
  newGologinConfig.canvasMode = options.canvas
  newGologinConfig.canvasNoise = canvasNoise

  // clientRects
  const clientRectsNoise = parseFloat(randomFloat(1, 9).toFixed(4))
  newGologinConfig.getClientRectsNoice =
    newGologinConfig.get_client_rects_noise = clientRectsNoise
  newGologinConfig.client_rects_noise_enable = options.clientRects === "noise"

  // webGL
  const maskWebGLMetadata = options.webGLMetadata === "mask"
  if (platform() === "darwin") {
    if (arch() === "arm64") {
      newGologinConfig.is_m1 = true
      newGologinConfig.webGl = {
        mode: maskWebGLMetadata,
        renderer: "Apple M1",
        vendor: "Apple",
      }
      newGologinConfig.webgl.metadata = {
        mode: maskWebGLMetadata,
        vendor: "Google Inc. (Apple)",
        renderer: "ANGLE (Apple, Apple M1 Pro, OpenGL 4.1)",
      }
    } else {
      newGologinConfig.is_m1 = false
      newGologinConfig.webGl = {
        mode: false,
        vendor: "Google Inc. (Intel Inc.)",
        renderer:
          "ANGLE (Intel Inc., Intel Iris Pro OpenGL Engine, OpenGL 4.1)",
      }
      newGologinConfig.webgl.metadata = {
        mode: false,
        vendor: "Google Inc. (Intel Inc.)",
        renderer:
          "ANGLE (Intel Inc., Intel Iris Pro OpenGL Engine, OpenGL 4.1)",
      }
    }
  } else {
    const webGl = randomWebGL()
    newGologinConfig.webGl = webGl
    newGologinConfig.webGl.mode = maskWebGLMetadata

    // webglmetadata
    newGologinConfig.webgl.metadata = webGl
    newGologinConfig.webgl.metadata.mode = maskWebGLMetadata
  }
  const webGlNoise = parseFloat(randomFloat(1, 99).toFixed(3))
  newGologinConfig.webglNoiseValue = newGologinConfig.webgl_noise_value =
    webGlNoise
  const webGLNoiseImage = options.webGL === "noise"
  newGologinConfig.webgl_noice_enable =
    newGologinConfig.webglNoiceEnable =
    newGologinConfig.webgl_noise_enable =
      webGLNoiseImage

  // deviceMemory
  const deviceMemoryList = [4096, 8192, 16384, 32768]
  const randomDeviceMemory =
    deviceMemoryList[randomInt(0, deviceMemoryList.length)]
  newGologinConfig.deviceMemory = randomDeviceMemory

  // hardwareConcurrency
  const hardwareConcurrencyList = [4, 6, 12, 24]
  const randomHardwareConcurrency =
    hardwareConcurrencyList[randomInt(0, hardwareConcurrencyList.length)]
  newGologinConfig.hardwareConcurrency = randomHardwareConcurrency

  // mediaDevices
  newGologinConfig.mediaDevices.uid = randomUID()
  newGologinConfig.mediaDevices.audioInputs = randomInt(0, 3)
  newGologinConfig.mediaDevices.audioOutputs = randomInt(0, 3)
  newGologinConfig.mediaDevices.videoInputs = randomInt(0, 3)

  // Navigator
  if (platform() === "darwin") {
    newGologinConfig.userAgent =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.92 Safari/537.36"
    newGologinConfig.navigator.platform = "MacIntel"
  } else {
    newGologinConfig.userAgent =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.92 Safari/537.36"
    newGologinConfig.navigator.platform = "Win32"
  }

  const prefs = {
    ...clone(defaultPreferences),
    gologin: newGologinConfig,
  }

  return prefs
}

export const spawnArgs = (
  options: Pick<IOptions, "userDataDir">,
  payload: IProfile,
) => {
  const { userDataDir } = options
  const { proxy, timezone } = payload
  let proxyStr = `${proxy.mode}://${proxy.host}:${proxy.port}`

  let params = [
    `--user-data-dir=${userDataDir}`,
    "--lang=en",
    "--font-masking-mode=2",
    "--password-store=basic",
  ]

  if (proxy.mode) {
    const hr_rules = `"MAP * 0.0.0.0 , EXCLUDE ${proxy.host}"`
    params.push(`--tz=${timezone}`)
    params.push(`--proxy-server=${proxyStr}`)
    params.push(`--host-resolver-rules=${hr_rules}`)
  }

  return params
}
