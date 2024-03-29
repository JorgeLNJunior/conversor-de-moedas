import axios, { AxiosInstance } from 'axios'

/**
 * @see https://docs.awesomeapi.com.br/api-de-moedas for more information
 */
export class CurrencyApi {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: 'https://economia.awesomeapi.com.br/json'
    })
  }

  async last(from: string, to: string) {
    const response = await this.api.get(`/last/${from}-${to}`)
    return Object.values(response.data)[0] as CurrencyApiResponse
  }
}

/**
 * @see https://docs.awesomeapi.com.br/api-de-moedas#legendas for more information
 */
export interface CurrencyApiResponse {
  code: string
  codein: string
  name: string
  high: string
  low: string
  varBid: string
  bid: string
  ask: string
  pctChange: string
  timestamp: string
  create_date: string
}
