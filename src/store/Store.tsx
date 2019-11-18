import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import IStoreState from './IStore.interface'
import ExchangeReducer from '../reducers/ExchangeReducer'

const rootReducer = combineReducers<IStoreState>({
    state: ExchangeReducer,
})

export default function configureStore(): Store<IStoreState, any> {
    const store = createStore(
        rootReducer,
        undefined,
        composeWithDevTools(applyMiddleware(thunk)),
    )

    return store
}
