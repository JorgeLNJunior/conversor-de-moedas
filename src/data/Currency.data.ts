import { Currency } from '../types/Currency.interface'

export const currencyData: CurrencyData = {
  from: [
    { code: 'BRL', name: 'Real Brasileiro' },
    { code: 'EUR', name: 'Euro' },
    { code: 'USD', name: 'Dólar Americano' }
  ],
  to: [
    { code: 'ARS', name: 'Peso Argentino' },
    { code: 'AUD', name: 'Dólar Australiano' },
    { code: 'BOB', name: 'Boliviano' },
    { code: 'BRL', name: 'Real Brasileiro' },
    { code: 'CAD', name: 'Dólar Canadense' },
    { code: 'CLP', name: 'Peso Chileno' },
    { code: 'CNY', name: 'Yuan Chinês' },
    { code: 'COP', name: 'Peso Colombiano' },
    { code: 'EUR', name: 'Euro' },
    { code: 'JPY', name: 'Iene Japonês' },
    { code: 'KRW', name: 'Won Sul-Coreano' },
    { code: 'USD', name: 'Dólar Americano' },
    { code: 'UYU', name: 'Peso Uruguaio' }
  ]
}

interface CurrencyData {
  from: Currency[]
  to: Currency[]
}
