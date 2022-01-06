import { ApiAuthResponseInterface } from '@/services/api/response/ApiAuthResponseInterface'
import User from '@/services/api/entities/User'
import { Http } from '@/services/api/client/Http'

export const UserManager = {
  login: async (username: string, password: string): Promise<ApiAuthResponseInterface> => {
    const { data } = await Http.post('auth/login', { username, password })
    return {
      token: data.token,
      user: data.user,
    }
  },

  signIn: async (userData: Record<any, any>): Promise<User> => {
    const { data } = await Http.post('auth/sign-in', userData)

    return data
  },

  /**
   * @param id
   * @return User
   */
  findOne: async (id: number): Promise<User> => {
    const { data } = await Http.get(`users/${id}`)
    return data
  },
}
