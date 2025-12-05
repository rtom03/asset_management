import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store, persistor } from "./reducers/store";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";

document.documentElement.classList.add("dark");

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />,
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
