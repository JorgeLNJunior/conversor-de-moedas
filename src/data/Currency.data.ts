import { Currency } from '../types/Currency.interface'

export const currencyData = {
  from: [
    { name: 'Dólar Americano', code: 'USD' },
    { name: 'Euro', code: 'EUR' },
    { name: 'Real Brasileiro', code: 'BRL' }
  ] as Currency[],
  to: [
    { name: 'Boliviano', code: 'BOB' },
    { name: 'Dólar Americano', code: 'USD' },
    { name: 'Dólar Australiano', code: 'AUD' },
    { name: 'Dólar Canadense', code: 'CAD' },
    { name: 'Iene Japonês', code: 'JPY' },
    { name: 'Euro', code: 'EUR' },
    { name: 'Peso Argentino', code: 'ARS' },
    { name: 'Peso Chileno', code: 'CLP' },
    { name: 'Peso Colombiano', code: 'COP' },
    { name: 'Peso Uruguaio', code: 'UYU' },
    { name: 'Real Brasileiro', code: 'BRL' },
    { name: 'Yuan Chinês', code: 'CNY' },
    { name: 'Won Sul-Coreano', code: 'KRW' }
  ] as Currency[]
}
