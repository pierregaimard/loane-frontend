import { session, SESSION_USER, SESSION_TOKEN } from '@/services/session/Session'
import { UserSessionInterface } from '@/services/security/UserSessionInterface'

export const UserSession = {
  set(userId: number, token: string): void {
    session.set(SESSION_USER, String(userId))
    session.set(SESSION_TOKEN, token)
  },

  has(): boolean {
    return session.has(SESSION_TOKEN) && session.has(SESSION_USER)
  },

  get(): UserSessionInterface | false {
    const userId = Number(session.get(SESSION_USER))
    const token = session.get(SESSION_TOKEN)

    if (token === null || userId === null) return false

    return {
      userId: userId,
      token: token,
    }
  },
}
