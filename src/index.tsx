import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { CreateContextMode } from "./useMode";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CreateContextMode>
        <App />
      </CreateContextMode>
    </Provider>
  </React.StrictMode>
);
