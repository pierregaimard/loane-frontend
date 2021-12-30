import { AxiosInstance } from 'axios'

export interface HttpUtilsInterface {
  getClient(): AxiosInstance

  setJwt(token: string): void
}
