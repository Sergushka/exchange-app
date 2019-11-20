import { IExchangeRatesServerResponse } from '../restService/IRestService.interface'

const GetMockExchange: IExchangeRatesServerResponse = {
    disclaimer: 'Usage subject to terms',
    license: 'https://openexchangerates.org/license',
    timestamp: 1574002823,
    base: 'USD',
    rates: {
        EUR: 0.904871,
        GBP: 0.774743,
        USD: 1,
    },
}

export default GetMockExchange
