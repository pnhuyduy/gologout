export interface IOptions {
  userDataDir: string
}

export interface IProxy {
  mode: "http" | "socks5"
  host: string
  port: number
  username: string
  password: string
}

export interface IProfile {
  proxy: IProxy
  timezone: string
}
