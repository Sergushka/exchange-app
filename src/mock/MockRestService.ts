import IRestServiceInterface from '../restService/IRestService.interface'
import GetMockExchange from './GetExchangeRatesMock'

export class MockRestService {
    getExchangeRates(): Promise<IRestServiceInterface> {
        try {
            return Promise.resolve({ data: GetMockExchange })
        } catch (error) {
            return Promise.reject(error)
        }
    }
}