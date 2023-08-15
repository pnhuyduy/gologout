import { generator, utils } from "../src"
import { IOptions, IProfile } from "../src/types"
import { execFile } from "child_process"
import fs from "fs-extra"
import path from "node:path"

const executePath = "C:/Users/Admin/Desktop/hdp/orbita-browser/chrome.exe"
const remotePort = "1113"

const payload: IProfile = {
  proxy: {
    mode: "http",
    host: "173.208.193.35",
    port: 31337,
    username: "Po2mMz",
    password: "cGKmLG",
  },
  timezone: "America/New_York",
}

const options: IOptions = {
  version: "113",
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.92 Safari/537.36",
  screen: "1366x768",
  hardwareConcurrency: 8,
  deviceMemory: 8,
  doNotTrack: false,
  dns: "",
  webrtc: {
    mode: "alerted",
    fillBasedOnIP: true,
  },
  timezone: {
    fillBasedOnIP: true,
    id: "",
  },
  location: {
    mode: "prompt",
  },
  language: {
    autoLang: true,
    value: "en-GB,en-US,en",
  },
  canvas: {
    mode: "noise",
  },
  clientRects: {
    mode: "noise",
  },
  audioContext: {
    mode: "noise",
  },
  mediaDevices: {
    mode: "noise",
  },
  webGL: {
    mode: "noise",
  },
  webGLMetadata: {
    mode: "mask",
    vendor: "Google Inc. (Intel)",
    renderer:
      "ANGLE (Intel, Intel(R) HD Graphics 620 Direct3D11 vs_5_0 ps_5_0, D3D11)",
  },
  fonts: {
    mode: "noise",
  },
}

const startChrome = async (dir: string) => {
  try {
    const filePref = path.join(dir, "Default", "Preferences")
    const prefs = generator.getNewFingerprint(payload, options)
    fs.ensureFileSync(filePref)
    fs.writeJSON(filePref, prefs)
    const chromeParams = generator.spawnArgs({ userDataDir: dir }, payload)
    let params = [
      `--remote-debugging-port=${remotePort}`,
      ...chromeParams,
      `"https://iphey.com"`,
    ]
    const child = execFile(executePath, params)
    console.log("🚀 ~ child:", child.pid)
  } catch (error) {
    console.log(error)
  }
}

  ; (async () => {
    const userDataDirA = path.join(path.resolve(), "profiles", "abc")
    await startChrome(userDataDirA)
  })()

// ;(async () => {
//   const proxyData = await utils.checkTimezone(payload.proxy)
//   console.log("🚀 ~ ; ~ proxyData:", proxyData)
// })()
