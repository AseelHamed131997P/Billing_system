import React, { useState } from "react";
import "../../../CSS/general.css";
import Invoice from "../../../svgs/invoice.svg";

const CheckBox = (props) => {
  return (
    <div className={`center-v ${props.style ? "hidden" : "block"}`}>
      <input
        id="checkbox"
        type="checkbox"
        checked={props.isChecked}
        onChange={props.handleChange}
        className="h-6 w-6 text-blue-600 border-gray-300 rounded "
      />
      <label
        htmlFor="checkbox"
        className=" ml-4 text-xl font-medium text-gray-700 cursor-pointer leading-none"
      >
        {props.label}
      </label>
    </div>
  );
};

export default CheckBox;
