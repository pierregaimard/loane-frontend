import User from '@/services/api/entities/User'

export interface ApiAuthResponseInterface {
  user: User
  token: string
}
