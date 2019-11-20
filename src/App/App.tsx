import React, { Component } from 'react'
import './App.css'
import ExchangeRates from '../components/ExchangeRates'

class App extends Component<{}, {}> {
    render() {
        return (
            <div>
                <ExchangeRates/>
            </div>
        )
    }
}

export default App
