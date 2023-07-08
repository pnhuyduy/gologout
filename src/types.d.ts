type TMode = "noise" | "mask" | "block" | "off"

export interface IOptions {
  userDataDir: string
  audioContext: TMode
  canvas: TMode
  clientRects: TMode
  webGL: TMode
  webGLMetadata: TMode
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
}
