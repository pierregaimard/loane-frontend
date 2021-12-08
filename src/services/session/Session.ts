class Session {
  set(key: string, value: string): void {
    sessionStorage.setItem(key, value)
  }

  get(key: string): string | null {
    return sessionStorage.getItem(key)
  }

  has(key: string): boolean {
    return this.get(key) !== null
  }

  remove(key: string): void {
    sessionStorage.removeItem(key)
  }

  clear(): void {
    sessionStorage.clear()
  }
}

export const session = new Session()
export const SESSION_USER = 'USER'
export const SESSION_TOKEN = 'TOKEN'
