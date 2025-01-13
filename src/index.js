import { ConnectedRouter } from "connected-react-router";
// import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client"; // Use the new `react-dom/client` package in React 18
import { PersistGate } from "redux-persist/integration/react";
import { Provider as StoreProvider } from "react-redux";
import createStore, { history } from "../src/store/index";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const { store, persistor } = createStore();
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StoreProvider store={store}>
    {/* <UIProvider> */}
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
    {/* </UIProvider> */}
  </StoreProvider>
);

reportWebVitals();
