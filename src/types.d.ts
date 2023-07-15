type TMode = "noise" | "off"

export interface IOptions {
  version: string
  userAgent: string
  screen: string
  hardwareConcurrency: number
  deviceMemory: number
  doNotTrack: boolean
  dns: string
  webrtc: {
    mode: "alerted" | "disabled" | "real"
    fillBasedOnIP: boolean
  }
  timezone: {
    fillBasedOnIP: boolean
    id: string
  }
  location: {
    mode: "prompt" | "allow" | "block"
  }
  language: {
    autoLang: boolean
    value: string
  }
  canvas: {
    mode: TMode
  }
  clientRects: {
    mode: TMode
  }
  audioContext: {
    mode: TMode
  }
  mediaDevices: {
    mode: TMode
  }
  webGL: {
    mode: TMode
  }
  webGLMetadata: {
    mode: "mask" | "off"
    vendor: string
    renderer: string
  }
  fonts: {
    mode: TMode
  }
}

export interface IProxy {
  mode: "http" | "socks" | null
  host: string
  port: number
  username: string
  password: string
}

export interface IProfile {
  name?: string
  proxy: IProxy
  timezone: string
  latitude: string
  longitude: string
  accuracy: number
}

export interface ISpawnArgs {
  userDataDir: string
}
