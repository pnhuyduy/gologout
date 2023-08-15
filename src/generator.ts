import { defaultPreferences, gologinConfig } from "./template"
import rfdc from "rfdc"
import { randomFloat, randomInt, randomUID, randomWebGL } from "./utils"
import { IOptions, IProfile, ISpawnArgs } from "./types"
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
  newGologinConfig.audioContext.enable = options.audioContext.mode === "noise"

  // canvas
  const canvasNoise = parseFloat(Math.random().toFixed(8))
  newGologinConfig.canvasMode = options.canvas.mode
  newGologinConfig.canvasNoise = canvasNoise

  // clientRects
  const clientRectsNoise = parseFloat(randomFloat(1, 9).toFixed(4))
  newGologinConfig.getClientRectsNoice =
    newGologinConfig.get_client_rects_noise = clientRectsNoise
  newGologinConfig.client_rects_noise_enable =
    options.clientRects.mode === "noise"

  // webGL
  const maskWebGLMetadata = options.webGLMetadata.mode === "mask"
  const { vendor, renderer } = options.webGLMetadata
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
        vendor,
        renderer,
      }
      newGologinConfig.webgl.metadata = {
        mode: false,
        vendor,
        renderer,
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
  const webGLNoiseImage = options.webGL.mode === "noise"
  newGologinConfig.webgl_noice_enable =
    newGologinConfig.webglNoiceEnable =
    newGologinConfig.webgl_noise_enable =
    webGLNoiseImage

  // deviceMemory
  newGologinConfig.deviceMemory = options.deviceMemory * 1024

  // hardwareConcurrency
  newGologinConfig.hardwareConcurrency = options.hardwareConcurrency

  // Do not track
  newGologinConfig.doNotTrack = options.doNotTrack

  // DNS
  newGologinConfig.dns = options.dns

  // screen
  const [width, height] = options.screen.split("x")
  newGologinConfig.screenWidth = parseInt(width, 10)
  newGologinConfig.screenHeight = parseInt(height, 10)

  // WebRTC
  newGologinConfig.webRtc.mode = options.webrtc.mode

  // Location
  newGologinConfig.geoLocation.mode = options.location.mode

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
    newGologinConfig.userAgent = options.userAgent
    newGologinConfig.navigator.platform = "Win32"
  }

  const prefs = {
    ...clone(defaultPreferences),
    gologin: newGologinConfig,
  }

  return prefs
}

export const spawnArgs = (
  options: Pick<ISpawnArgs, "userDataDir">,
  payload: IProfile,
  args: string[] = []
) => {
  const { userDataDir } = options
  const { proxy, timezone } = payload
  let proxyStr = `${proxy.mode}://${proxy.host}:${proxy.port}`

  let params = [
    `--user-data-dir=${userDataDir}`,
    "--lang=en",
    "--font-masking-mode=2",
    "--password-store=basic",
    ...args
  ]

  if (proxy.mode) {
    const hr_rules = `"MAP * 0.0.0.0 , EXCLUDE ${proxy.host}"`
    params.push(`--tz=${timezone}`)
    params.push(`--proxy-server=${proxyStr}`)
    params.push(`--host-resolver-rules=${hr_rules}`)
  }

  return params
}
