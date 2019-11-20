import React from 'react'
import { shallow } from 'enzyme'
import { ExchangeRates } from './ExchangeRates'
import { MockRestService } from '../mock/MockRestService'

describe('ExchangeRates renders correctly', () => {
    const rest: MockRestService = new MockRestService()
    const wrapper = shallow(<ExchangeRates isFetching={false} getExchangeRate={rest.getExchangeRates}/>)

    it('has two forms', () => {
        expect(wrapper.find('form')).toHaveLength(2)
    })

    it('has button swapper', () => {
        expect(wrapper.find('button')).toHaveLength(1)
    })

    it('state is correct', () => {
        expect(wrapper.state('baseCurrency')).toEqual('EUR')
    })

    it('span is correct', () => {
        expect(wrapper.find('.ConvertRate')).toHaveLength(1)
    })
})