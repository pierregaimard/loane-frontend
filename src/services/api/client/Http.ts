import { AxiosClientAdapter } from '@/services/api/client/Axios/AxiosClientAdapter'
import { AxiosInstance } from '@/services/api/client/Axios/AxiosInstance'
import { Client } from '@/services/api/client/Client'

const adapter = new AxiosClientAdapter(AxiosInstance)

export const Http = new Client(adapter)
