import { ClientInterface } from '@/services/api/client/ClientInterface'
import { ClientRequestOptionsInterface } from '@/services/api/request/ClientRequestOptionsInterface'
import { ClientResponseInterface } from '@/services/api/response/ClientResponseInterface'
import { ClientErrorResponse } from '@/services/api/response/ClientErrorResponse'
import { ClientUnauthorizedResponse } from '@/services/api/response/ClientUnauthorizedResponse'
import { ClientErrorInterface } from '@/services/api/error/ClientErrorInterface'
import { ClientNetworkError } from '@/services/api/error/ClientNetworkError'

export class Client {
  private readonly adapter: ClientInterface

  constructor(adapter: ClientInterface) {
    this.adapter = adapter
  }

  public async get(
    url: string,
    options?: ClientRequestOptionsInterface,
  ): Promise<ClientResponseInterface> {
    try {
      return await this.adapter.get(url, options)
    } catch (error) {
      if (error instanceof ClientErrorResponse) {
        return Promise.reject(Client.getResponseError(error))
      }

      return Promise.reject(Client.getError(error))
    }
  }

  public async post(
    url: string,
    data?: any,
    options?: ClientRequestOptionsInterface,
  ): Promise<ClientResponseInterface> {
    try {
      return await this.adapter.post(url, data, options)
    } catch (error) {
      if (error instanceof ClientErrorResponse) {
        return Promise.reject(Client.getResponseError(error))
      }

      return Promise.reject(Client.getError(error))
    }
  }

  public async put(
    url: string,
    data?: any,
    options?: ClientRequestOptionsInterface,
  ): Promise<ClientResponseInterface> {
    try {
      return await this.adapter.put(url, data, options)
    } catch (error) {
      if (error instanceof ClientErrorResponse) {
        return Promise.reject(Client.getResponseError(error))
      }

      return Promise.reject(Client.getError(error))
    }
  }

  public async patch(
    url: string,
    data?: any,
    options?: ClientRequestOptionsInterface,
  ): Promise<ClientResponseInterface> {
    try {
      return await this.adapter.patch(url, data, options)
    } catch (error) {
      if (error instanceof ClientErrorResponse) {
        return Promise.reject(Client.getResponseError(error))
      }

      return Promise.reject(Client.getError(error))
    }
  }

  public async delete(
    url: string,
    options?: ClientRequestOptionsInterface,
  ): Promise<ClientResponseInterface> {
    try {
      return await this.adapter.delete(url, options)
    } catch (error) {
      if (error instanceof ClientErrorResponse) {
        return Promise.reject(Client.getResponseError(error))
      }

      return Promise.reject(Client.getError(error))
    }
  }

  public setJwt(token: string): void {
    this.adapter.setJwt(token)
  }

  private static getError(error: ClientErrorInterface): ClientErrorInterface {
    if (error.message === 'Network Error') {
      return new ClientNetworkError(error.message)
    }

    return error
  }

  private static getResponseError(error: ClientResponseInterface): ClientResponseInterface {
    if (error.status === 401) {
      return new ClientUnauthorizedResponse(error)
    }

    return error
  }
}
