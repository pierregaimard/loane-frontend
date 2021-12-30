import { Client } from '@/services/api/connector/Client'
import HttpUtils from './HttpUtils'

export const Http = new HttpUtils(Client)
