import { AxiosInstance, AxiosResponse } from 'axios'
import { ClientInterface } from '@/services/api/client/ClientInterface'
import { ClientRequestOptionsInterface } from '@/services/api/request/ClientRequestOptionsInterface'
import { ClientResponseInterface } from '@/services/api/response/ClientResponseInterface'
import { ClientRequestError } from '@/services/api/error/ClientRequestError'
import { ClientErrorResponse } from '@/services/api/response/ClientErrorResponse'
import { ClientResponse } from '@/services/api/response/ClientResponse'
import { ClientFatalError } from '@/services/api/error/ClientFatalError'

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

export class AxiosClientAdapter implements ClientInterface {
  private readonly axios: AxiosInstance

  constructor(axios: AxiosInstance) {
    this.axios = axios
  }

  public async get(
    url: string,
    options?: ClientRequestOptionsInterface,
  ): Promise<ClientResponseInterface> {
    return await this._request('get', url, options)
  }

  public async post(
    url: string,
    data?: Record<string, unknown>,
    options?: ClientRequestOptionsInterface,
  ): Promise<ClientResponseInterface> {
    return await this._request('post', url, options, data)
  }

  public async put(
    url: string,
    data?: Record<string, unknown>,
    options?: ClientRequestOptionsInterface,
  ): Promise<ClientResponseInterface> {
    return await this._request('put', url, options, data)
  }

  public async patch(
    url: string,
    data?: Record<string, unknown>,
    options?: ClientRequestOptionsInterface,
  ): Promise<ClientResponseInterface> {
    return await this._request('patch', url, options, data)
  }

  public async delete(
    url: string,
    options?: ClientRequestOptionsInterface,
  ): Promise<ClientResponseInterface> {
    return await this._request('delete', url, options)
  }

  public setJwt(token: string): void {
    this.axios.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  private async _request(
    method: Method,
    url: string,
    options?: ClientRequestOptionsInterface,
    data?: Record<string, unknown>,
  ) {
    try {
      const axiosResponse = await this.axios.request({
        method: method,
        url: url,
        headers: options?.headers,
        params: options?.params,
        data: data,
      })

      return Promise.resolve(
        new ClientResponse(AxiosClientAdapter._getResponseData(axiosResponse)),
      )
    } catch (error) {
      if (error.response) {
        return Promise.reject(
          new ClientErrorResponse(AxiosClientAdapter._getResponseData(error.response)),
        )
      }

      if (error._request) {
        return Promise.reject(new ClientRequestError(error.message))
      }

      return Promise.reject(new ClientFatalError(error.message))
    }
  }

  private static _getResponseData(axiosResponse: AxiosResponse): ClientResponseInterface {
    return {
      data: axiosResponse.data,
      headers: axiosResponse.headers,
      status: axiosResponse.status,
      statusText: axiosResponse.statusText,
    }
  }
}
