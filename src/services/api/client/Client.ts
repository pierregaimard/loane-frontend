import { AxiosClientAdapter } from '@/services/api/client/Axios/AxiosClientAdapter'
import { AxiosInstance } from '@/services/api/client/Axios/AxiosInstance'

export const Client = new AxiosClientAdapter(AxiosInstance)
