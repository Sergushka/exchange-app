import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";

import App from "../App/App";
import IStore from "../store/IStore.interface";

interface IProps {
  store: Store<IStore>;
}

const Root: React.FC<IProps> = props => {
  return (
    <Provider store={props.store}>
      <App />
    </Provider>
  );
};

export default Root;
