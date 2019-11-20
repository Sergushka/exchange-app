import axios from 'axios'
import IRestServiceInterface from './IRestService.interface'

const baseUrl = 'https://openexchangerates.org/api/latest.json'
const API_KEY = 'fd72932d27da49799dc4fb46285edfec'
const allowedCurrencySymbols = 'GBP,EUR,USD,RUB'
const searchString = `${baseUrl}?app_id=${API_KEY}&symbols=${allowedCurrencySymbols}`

export class RestService {
  getExchangeRates(): Promise<IRestServiceInterface> {
    try {
      return axios.get(searchString)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}