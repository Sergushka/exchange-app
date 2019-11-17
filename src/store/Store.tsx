import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import IStore from "./IStore.interface";
import ExchangeReducer from "../reducers/ExchangeReducer";

const rootReducer = combineReducers<IStore>({
  exchangeState: ExchangeReducer
});

export default function configureStore(): Store<IStore, any> {
  const store = createStore(
    rootReducer,
    undefined,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
}
