import "./App.css";
import { useTranslation } from "react-i18next";
import ReactFlagsSelect from "react-flags-select"; // Import flags select for language selection
import i18next from "i18next";
import Cookies from "js-cookie";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./componentsRoutes/index";
import {
  Home,
  Login,
  SignUpWithGoogle,
  SignUpWithSMS,
  OTP,
} from "./mainComponent/index";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  LangSelect,
  InvoiceLangSelect,
} from "./ui/subComponent/general/index.js";
import i18nInvoice from "./ui/utils/i18nInvoice.js";

function App() {
  const navigate = useNavigate();
  const { t: ti } = useTranslation("translation", { i18n: i18nInvoice });

  useEffect(() => {
    // Store navigate in a global window object for access outside React
    window.myNavigate = navigate;
  }, [navigate]);

  const { t } = useTranslation();

  return (
    <div>
      <LangSelect />
      <div className="mb-[130rem]">{t("Welcome_to_React")}</div>
      <div>sdfwefwe</div>
      <div>sdfwefwe</div>
      <InvoiceLangSelect />
      <div>{ti("Welcome_to_React")}</div>
    </div>
  );
}

export default App;
