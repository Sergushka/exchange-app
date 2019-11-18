import {
  IGetExchangeRatesFailure,
  IGetExchangeRatesRequest,
  IGetExchangeRatesSuccess
} from "./IGetExchangeRates.interface";

type ExchangeActions =
  | IGetExchangeRatesRequest
  | IGetExchangeRatesSuccess
  | IGetExchangeRatesFailure;

export default ExchangeActions;
