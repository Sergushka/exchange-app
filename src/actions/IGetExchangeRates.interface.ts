import ExchangeActionTypes from "./ExchangeActionTypes.enum";
import {IExchangeRatesServerResponse} from "../restService/IRestService.interface";

export interface IGetExchangeRatesRequest {
  type: ExchangeActionTypes.GET_EXCHANGE_RATES_REQUEST;
  isFetching: boolean;
}

export interface IGetExchangeRatesSuccess {
  type: ExchangeActionTypes.GET_EXCHANGE_RATES_SUCCESS;
  currencies: IExchangeRatesServerResponse;
  isFetching: boolean;
}

export interface IGetExchangeRatesFailure {
  type: ExchangeActionTypes.GET_EXCHANGE_RATES_FAILURE;
  isFetching: boolean;
}
