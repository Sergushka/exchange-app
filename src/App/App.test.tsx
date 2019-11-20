import React from 'react'
import App from './App'
import { shallow } from 'enzyme'
import ExchangeRates from '../components/ExchangeRates'

it('renders without crashing', () => {
    const wrapper = shallow(<App/>)
    const element = <ExchangeRates/>
    expect(wrapper.contains(element)).toEqual(true)
})
