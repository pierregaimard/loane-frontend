import { ClientResponseInterface } from '@/services/api/response/ClientResponseInterface'

export class ClientResponse implements ClientResponseInterface {
  public readonly data: any
  public readonly status: number
  public readonly statusText: string
  public readonly headers: Record<string, string>

  constructor(response: ClientResponseInterface) {
    this.data = response.data
    this.status = response.status
    this.statusText = response.statusText
    this.headers = response.headers
  }
}
