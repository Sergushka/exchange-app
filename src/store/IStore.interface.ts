export default interface IStoreState {
    currencies: IExchangeRates
}

export interface IExchangeRates {
    disclaimer: string,
    license: string,
    timestamp: Date
    base: string;
    rates: { [key: string]: number };
}