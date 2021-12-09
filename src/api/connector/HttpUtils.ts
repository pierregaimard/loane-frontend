import { HttpUtilsInterface } from '@/api/connector/HttpUtilsInterface'
import { AxiosInstance } from 'axios'

export default class HttpUtils implements HttpUtilsInterface {
  private readonly client: AxiosInstance

  constructor(client: AxiosInstance) {
    this.client = client
  }

  getClient(): AxiosInstance {
    return this.client
  }

  setJwt(token: string): void {
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`
  }
}
