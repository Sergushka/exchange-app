import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import moxios from 'moxios'
import {
    getExchangeRates,
    getExchangeRatesFailure,
    getExchangeRatesRequest,
    getExchangeRatesSuccess,
} from './ActionCreator'
import GetMockExchange from '../mock/GetExchangeRatesMock'

const mockStore = configureMockStore([thunk])

describe('getExchangeRates', () => {
    beforeEach(() => {
        moxios.install()
    })
    afterEach(() => {
        moxios.uninstall()
    })

    it('request Exchange Rates and get Success response', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: GetMockExchange,
            })
        })

        const expectedActions = [
            getExchangeRatesRequest(),
            getExchangeRatesSuccess(GetMockExchange),
        ]

        const initialState = {
            currencies: {},
            isFetching: false,
        }

        const store = mockStore(initialState)

        return store.dispatch<any>(getExchangeRates()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('request Exchange Rates and get Failure response', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 500,
                response: {},
            })
        })

        const expectedActions = [
            getExchangeRatesRequest(),
            getExchangeRatesFailure(),
        ]

        const initialState = { currencies: [] }
        const store = mockStore(initialState)

        return store.dispatch<any>(getExchangeRates()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
