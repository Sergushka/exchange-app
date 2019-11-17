import { Action, Reducer } from "redux";

const initialExchangeState = {
  exchangeRates: [],
  isFetching: false
};

const ExchangeReducer: Reducer<{}, Action<any>> = (
  state = initialExchangeState,
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default ExchangeReducer;
