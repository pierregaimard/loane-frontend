export interface ClientResponseInterface {
  readonly data: any
  readonly status: number
  readonly statusText: string
  readonly headers: Record<string, string>
}
