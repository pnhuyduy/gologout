import { generator } from "../src"
import { IOptions, IProfile } from "../src/types"
import { execFile } from "child_process"
import fs from "fs-extra"
import path from "node:path"

const executePath =
  "/Users/duy/Documents/gologin/orbita-browser-latest/Orbita-Browser.app/Contents/MacOS/Orbita"
const remotePort = "1113"

const payload: IProfile = {
  proxy: {
    mode: "socks5",
    host: "173.208.193.35",
    port: 35337,
    username: "TXszt2",
    password: "Ez4V5c",
  },
  timezone: "America/New_York",
}

const options: IOptions = {
  userDataDir: "",
  audioContext: "noise",
  canvas: "off",
  clientRects: "off",
  webGL: "noise",
  webGLMetadata: "mask",
}

const startChrome = (dir: string) => {
  const filePref = path.join(dir, "Default", "Preferences")
  const prefs = generator.getNewFingerprint(payload, options)
  fs.ensureFileSync(filePref)
  fs.writeJSON(filePref, prefs)
  const chromeParams = generator.spawnArgs({ userDataDir: dir }, payload)
  let params = [
    `--remote-debugging-port=${remotePort}`,
    ...chromeParams,
    "https://iphey.com",
  ]
  const child = execFile(executePath, params)
  console.log("🚀 ~ child:", child.pid)
}

const userDataDirA = `./profiles/abc`
const userDataDirB = `./profiles/xyz`
startChrome(userDataDirA)
startChrome(userDataDirB)
