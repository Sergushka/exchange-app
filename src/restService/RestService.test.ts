import axios from 'axios'
import { RestService } from './RestService'

describe('get currency rates', () => {
  const restService = new RestService()
  const baseUrl =
      'https://openexchangerates.org/api/latest.json?app_id=fd72932d27da49799dc4fb46285edfec&symbols=GBP,EUR,USD,RUB'

  beforeEach(() => {
    axios.get = jest.fn()
  })

  describe('getExchangeRates', () => {
    it('API is answering correctly', () => {
      restService.getExchangeRates()
      expect(axios.get).toHaveBeenCalledWith(baseUrl)
    })
  })
})
