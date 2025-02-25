import { useState } from "react";
import logo_agile from "../img/logo_agile.png";
import "./login.css";
import "../CSS/general.css";
import "../index.css";
import { useEffect } from "react";

import { useTranslation } from "react-i18next";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  HeaderRegister,
  Input,
  DropDown,
  NumberValue,
  Table,
  LangSelect,
} from "../ui/subComponent/general/index.js";
import { SettingIcon } from "../../src/svgs/index.js";

import Agile from "../img/agile.png";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../actions/types.js";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   // Redirect from "/create-invoice" to "/invoice"
  //   if (location.pathname === "/create-invoice") {
  //     navigate("/invoice", { replace: true });
  //   }
  // }, [location, navigate]);

  const handleChangePath = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const logoutSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <header className="bg-white h-24 flex-center-v-space-between px-10 drop-shadow-md">
      <img src={Agile} alt="logo" className="h-24" />
      <ul className="center-v gap-5">
        {[
          { name: "Home", path: "/home" },
          { name: "Invoices", path: "/invoice" },
          { name: "Customers", path: "/customer" },
          { name: "Items", path: "/item" },
          { name: "Receipt voucher", path: "/recieptVoucher" },
          { name: "Return invoices", path: "/returnInvoices" },
          { name: "Delivery invoices", path: "/deliveryInvoices" },
          { name: "Tax copy", path: "/taxCopy" },
          { name: "Reports", path: "/reports" },
          { name: "Support", path: "/support" },
        ].map((item, index) => (
          <li key={index}>
            <a
              href="#"
              onClick={(e) => handleChangePath(e, item.path)}
              className={`text-lg font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-blue-700"
                  : "text-black hover:text-blue-500"
              }`}
            >
              {item.name}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#"
            onClick={logoutSubmit}
            className="text-lg font-medium transition-colors text-black"
          >
            Logout
          </a>
        </li>
        <li className="ml-5">
          <a
            href="#"
            onClick={(e) => handleChangePath(e, "/settings")}
            className="text-gray-700 hover:text-blue-500 transition-colors"
          >
            <SettingIcon />
          </a>
        </li>
        <li className="ml-[4.8rem]">
          <LangSelect />
        </li>
      </ul>
    </header>
  );
};

export default Header;
