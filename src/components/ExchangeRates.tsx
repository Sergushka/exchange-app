import React, { ChangeEvent, Component } from 'react'
import * as _ from 'lodash'
import IStoreState, { IExchangeRates } from '../store/IStore.interface'
import { getExchangeRates } from '../actions/ActionCreator'
import { connect } from 'react-redux'
import IRestServiceInterface from '../restService/IRestService.interface'
import { Button, Container } from '@material-ui/core'

interface IProps {
    getExchangeRate: () => Promise<IRestServiceInterface>,
    currencies?: IExchangeRates
    isFetching: boolean
}

interface IState {
    baseCurrency: string
    actualCurrency: string
    baseValue?: number
    actualValue?: number
}

export class ExchangeRates extends Component<IProps, IState> {
    private readonly first: React.RefObject<HTMLInputElement>
    private readonly second: React.RefObject<HTMLInputElement>
    private readonly INITIAL_SYMBOL: string = 'EUR'

    constructor(props: IProps) {
        super(props)
        this.props.getExchangeRate()
        this.first = React.createRef()
        this.second = React.createRef()
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.state = {
            baseCurrency: this.INITIAL_SYMBOL,
            actualCurrency: this.INITIAL_SYMBOL,
            baseValue: undefined,
            actualValue: undefined,
        }
    }

    componentDidMount(): void {
        setInterval(() =>
            this.props.getExchangeRate(), 10000)
    }

    renderCurrencyOptions(currencies?: IExchangeRates) {
        return (currencies && _.map(currencies.rates, (_, key) => {
            return (<option key={key} value={key}>{key}</option>)
        }))
    }

    handleBaseCurrencySelectChange(event: ChangeEvent<HTMLSelectElement>): void {
        let baseVal = undefined
        let baseCurrency = event.target.value
        if (this.second.current) {
            baseVal = this.calculateValue(this.second.current.valueAsNumber, this.state.actualCurrency, baseCurrency)
        }
        this.setState({ baseCurrency, baseValue: baseVal })
    }

    handleActualCurrencySelectChange(event: ChangeEvent<HTMLSelectElement>): void {
        let val = undefined
        let actualCurrency = event.target.value
        if (this.first.current) {
            val = this.calculateValue(this.first.current.valueAsNumber, this.state.baseCurrency, actualCurrency)
        }
        this.setState({ actualCurrency, actualValue: val })
    }

    handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
        const { baseCurrency, actualCurrency } = this.state
        const inputValue: number = Number(parseFloat(event.target.value).toFixed(2))
        if (isNaN(inputValue) || event.target.value === undefined) {
            if (this.first.current && this.second.current) {
                this.first.current.value = ''
                this.second.current.value = ''
            }
            this.setState({ baseValue: undefined, actualValue: undefined })
            return
        }

        if (event.target.name === 'from') {
            const result = this.calculateValue(inputValue, baseCurrency, actualCurrency)
            this.setState({ baseValue: Number(inputValue.toFixed(2)), actualValue: Number(result.toFixed(2)) })
        } else {
            const result = this.calculateValue(inputValue, actualCurrency, baseCurrency)
            this.setState({ baseValue: Number(result.toFixed(2)), actualValue: Number(inputValue.toFixed(2)) })
        }
    }

    handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
        // Allow only numbers with dot
        let isValid: boolean = this.checkValidity(event.keyCode)
        if (!isValid && this.first.current && this.second.current) {
            event.preventDefault()
            this.first.current.value = ''
            this.second.current.value = ''
            this.setState({ baseValue: undefined, actualValue: undefined })
        }
    }

    checkValidity(keyCode: number): boolean {
        const allowedCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 190]
        return allowedCodes.some((v: number) => v === keyCode)
    }

    calculateValue(inputVal: number, fromCurrency: string, toCurrency: string): number {
        const { currencies } = this.props
        if (fromCurrency === toCurrency) {
            return inputVal
        }
        if (currencies) {
            const rates = currencies.rates
            const usdVal = inputVal / rates[fromCurrency]
            return Number((usdVal * rates[toCurrency]).toFixed(2))
        }
        return 0
    }

    calculateExchangeRate(fromCurrency: string, toCurrency: string): number {
        const { currencies } = this.props
        const val = 1
        if (fromCurrency === toCurrency) {
            return val
        }
        let usdVal = 0
        if (currencies) {
            const rates = currencies.rates
            usdVal = val / rates[fromCurrency]
            return Number((usdVal * rates[toCurrency]).toFixed(5))
        }
        return usdVal
    }

    render() {
        const { currencies } = this.props
        const { baseCurrency, actualCurrency, baseValue, actualValue } = this.state
        return (
            <Container className={'Container'}>
                <form className={'Form'}>
                    <select value={baseCurrency} onChange={(e) => this.handleBaseCurrencySelectChange(e)}>
                        {this.renderCurrencyOptions(currencies)}
                    </select>
                    <input name={'from'} onFocus={(e) => e.target.placeholder = ''}
                           onBlur={(e) => e.target.placeholder = 'Enter your value'} placeholder={'Enter your value'}
                           onKeyDown={this.handleKeyDown} value={baseValue}
                           ref={this.first} min={0}
                           onChange={this.handleInputChange}
                           type="number"/>
                </form>
                <Button className={'Swapper'} onClick={() => {
                    this.setState({
                        baseCurrency: actualCurrency,
                        actualCurrency: baseCurrency,
                        baseValue: actualValue,
                        actualValue: baseValue,
                    })
                }}>Swap
                </Button>
                <span
                    className={'ConvertRate'}>1 {baseCurrency} ~ {this.calculateExchangeRate(baseCurrency, actualCurrency)} {actualCurrency}</span>
                <form className={'Form'}>
                    <select value={actualCurrency} onChange={(e) => this.handleActualCurrencySelectChange(e)}>
                        {this.renderCurrencyOptions(currencies)}
                    </select>
                    <input name={'to'} onBlur={(e) => e.target.placeholder = 'Enter your value'}
                           onFocus={(e) => e.target.placeholder = ''} placeholder={'Enter your value'}
                           onKeyDown={this.handleKeyDown} value={actualValue} ref={this.second}
                           onChange={this.handleInputChange}
                           min={0}
                           type="number"/>
                </form>
            </Container>
        )
    }
}

const mapStateToProps = (store: IStoreState) => {
    return {
        currencies: store.state.currencies,
        isFetching: store.state.isFetching,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getExchangeRate: () => dispatch(getExchangeRates()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRates)