import { ClientRequestOptionsInterface } from '@/services/api/request/ClientRequestOptionsInterface'
import { ClientResponseInterface } from '@/services/api/response/ClientResponseInterface'

export interface ClientInterface {
  get(
    url: string,
    options?: ClientRequestOptionsInterface
  ): Promise<ClientResponseInterface>

  post(
    url: string,
    data?: Record<string, unknown>,
    options?: ClientRequestOptionsInterface
  ): Promise<ClientResponseInterface>

  put(
    url: string,
    data?: Record<string, unknown>,
    options?: ClientRequestOptionsInterface
  ): Promise<ClientResponseInterface>

  patch(
    url: string,
    data?: Record<string, unknown>,
    options?: ClientRequestOptionsInterface
  ): Promise<ClientResponseInterface>

  delete(
    url: string,
    options?: ClientRequestOptionsInterface
  ): Promise<ClientResponseInterface>

  setJwt(token: string): void
}
