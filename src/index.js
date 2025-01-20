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
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ReactFlagsSelect from "react-flags-select"; // Import flags select for language selection
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import Cookies from "js-cookie";
import React, { Suspense } from "react";

import "./ui/utils/index";
const { store, persistor } = createStore();
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
// i18n
//   .use(initReactI18next) // passes i18n down to react-i18next
//   .use(LanguageDetector)
//   .use(HttpApi)
//   .init({
//     supportedLngs: ["en", "ar", "he"],
//     fallbackLng: "en", // if user select lang not supported the system will take en lang default
//     detection: {
//       order: ["cookie", "htmlTag", "localStorage"],
//       caches: ["cookie"], //store the first time in cookie and so on
//     },
//     backend: { loadPath: "/assets/locales/{{lng}}/translation.json" },
//   });

const loadingMarkup = <div>Loading...</div>;
root.render(
  <Suspense fallback={loadingMarkup}>
    <StoreProvider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </StoreProvider>
  </Suspense>
);

reportWebVitals();
