import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { worker } from './mocks/browser'

if (process.env.NODE_ENV === 'development') {
  //  const { worker } = require('./mocks/browser')
  //import { worker } from ('./mocks/browser')
  worker.start()
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

