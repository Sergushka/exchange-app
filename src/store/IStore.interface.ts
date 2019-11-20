export default interface IStoreState {
    state: IExchangeState
}

export interface IExchangeState {
    currencies?: IExchangeRates,
    isFetching: boolean
}

export interface IExchangeRates {
    disclaimer: string
    license: string
    timestamp: number
    base: string
    rates: { [key: string]: number }
}