import { useState } from "react"; // React import for useState
import logo_agile from "../img/logo_agile.png"; // Import logo
import "./login.css"; // Import your CSS
import "../CSS/general.css";
import "../index.css";

import { useTranslation } from "react-i18next";

import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom"; // React Router for navigation

import {
  HeaderRegister,
  Input,
  DropDown,
  NumberValue,
  Table,
  LangSelect,
} from "../ui/subComponent/general/index.js";
import Logo_agile from "../img/logo_agile.png";
import Agile from "../img/agile.png";

const Header = () => {
  return (
    <header className=" bg-[#f5f5f5] h-24 flex-center-v-space-between px-10">
      <img src={Agile} alt="logo" className="h-24  " />
      <ul className="center-v gap-10 [&>li>a]:text-2xl [&>li>a]:font-medium [&>li>a:hover]:text-blue-700 [&>li>a]:transition-colors [&>li>a]:text-black">
        <li>
          <a className="" href="#">
            Home
          </a>
        </li>
        <li>
          <a href="#">Invoices</a>
        </li>
        <li>
          <a href="#">Customers</a>
        </li>
        <li>
          <a href="#">Items</a>
        </li>
        <li>
          <a href="#">Receipt voucher</a>
        </li>
        <li>
          <a href="#">Return invoices</a>
        </li>
        <li>
          <a href="#">Tax copy</a>
        </li>
        <li>
          <a href="#">Reports</a>
        </li>
        <li>
          <a href="#">Support</a>
        </li>

        <li className="ml-[4.8rem]">
          <LangSelect />
        </li>
      </ul>
    </header>
  );
};

export default Header;
