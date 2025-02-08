import React, { useState } from "react";
import "../../../CSS/general.css";

const HeaderReceiptVoucher = ({
  name,
  title,
  invoiceNum,
  receiptVoucherNum,
}) => {
  return (
    <header className="  grid-auto-fr-auto-cols shadow-md px-10">
      <p className="  font-medium text-2xl">{name}</p>
      <div className="grid place-items-center gap-5">
        <h1 className="  font-medium text-3xl">{title}</h1>
        <p className="  font-medium text-3xl">#{receiptVoucherNum}</p>
      </div>

      <p className="  font-medium text-2xl">Invoice {invoiceNum}</p>
    </header>
  );
};

export default HeaderReceiptVoucher;
