import { ClientErrorInterface } from '@/services/api/error/ClientErrorInterface'

export abstract class AbstractClientError implements ClientErrorInterface {
  public readonly message: string

  constructor(message: string) {
    this.message = message
  }
}
