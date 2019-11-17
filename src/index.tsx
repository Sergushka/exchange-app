import * as React from "react";
import * as ReactDOM from "react-dom";

import configureStore from "./store/Store";
import Root from "./root/Root";

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById("root") as HTMLElement
);
