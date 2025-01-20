import React, { useState } from "react";
import "../../../CSS/general.css";
import Invoice from "../../../svgs/invoice.svg";

const HeaderRegister = (props) => {
  return (
    <header className="box-header center-v">
      <img
        src={Invoice}
        alt="Invoice Icon"
        class="w-9 h-9 inline-block mr-4 "
      />

      <span className="header-title">Invoice System</span>
    </header>
  );
};

export default HeaderRegister;
