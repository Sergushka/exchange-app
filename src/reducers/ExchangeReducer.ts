import { Reducer } from 'redux'
import { IExchangeState } from '../store/IStore.interface'
import ExchangeActions from '../actions/ExchangeActions.type'
import ExchangeActionTypes from '../actions/ExchangeActionTypes.enum'

const initialExchangeState: IExchangeState = {
    currencies: undefined,
    isFetching: false,
}

const ExchangeReducer: Reducer<IExchangeState, ExchangeActions> = (
    state = initialExchangeState,
    action,
) => {
    switch (action.type) {
        case ExchangeActionTypes.GET_EXCHANGE_RATES_REQUEST: {
            return {
                ...state,
                isFetching: action.isFetching,
            }
        }
        case ExchangeActionTypes.GET_EXCHANGE_RATES_SUCCESS: {
            return {
                ...state,
                currencies: action.currencies,
                isFetching: action.isFetching,
            }
        }
        case ExchangeActionTypes.GET_EXCHANGE_RATES_FAILURE: {
            return {
                ...state,
                isFetching: action.isFetching,
            }
        }
        default:
            return state
    }
}

export default ExchangeReducer
