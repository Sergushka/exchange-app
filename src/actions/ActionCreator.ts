import {
  IGetExchangeRatesFailure,
  IGetExchangeRatesRequest,
  IGetExchangeRatesSuccess
} from "./IGetExchangeRates.interface";
import ExchangeActionTypes from "./ExchangeActionTypes.enum";
import {ThunkAction} from "redux-thunk";
import {ActionCreator, Dispatch} from "redux";
import ExchangeActions from "./ExchangeActions.type";
import {RestService} from "../restService/RestService";
import IStoreState from "../store/IStore.interface";
import {IExchangeRatesServerResponse} from "../restService/IRestService.interface";

export const getExchangeRatesRequest = (): IGetExchangeRatesRequest => {
  return {
    type: ExchangeActionTypes.GET_EXCHANGE_RATES_REQUEST,
    isFetching: true
  };
};

export const getExchangeRatesSuccess = (
  data: IExchangeRatesServerResponse
): IGetExchangeRatesSuccess => {
  return {
    type: ExchangeActionTypes.GET_EXCHANGE_RATES_SUCCESS,
    currencies: data,
    isFetching: false
  };
};

export const getExchangeRatesFailure = (): IGetExchangeRatesFailure => {
  return {
    type: ExchangeActionTypes.GET_EXCHANGE_RATES_FAILURE,
    isFetching: false
  };
};

export const getExchangeRates: ActionCreator<ThunkAction<
  Promise<any>,
  IStoreState,
  null,
  ExchangeActions
>> = () => {
  return (dispatch: Dispatch) => {
    dispatch(getExchangeRatesRequest());
    const dataSource: RestService = new RestService();

    return dataSource
      .getExchangeRates()
      .then(response => {
        dispatch(getExchangeRatesSuccess(response.data));
      })
      .catch(error => {
        dispatch(getExchangeRatesFailure());
      });
  };
};
