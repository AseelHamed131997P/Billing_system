import React, { useState } from "react";

const InputRegister = (props) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={props.id} className="text-[1.4rem] font-medium	mb-1">
        {props.id.replace(/_/g, " ")}

        <span className="text-red-500">*</span>
      </label>
      <input
        id={props.id}
        name={props.id} // Add the name attribute for proper handling
        type={
          props.id === "Username"
            ? "text"
            : props.id === "Email"
            ? "email"
            : props.id === "Password" || props.id === "Confirm_Password"
            ? "password"
            : props.id === "Phone"
            ? "tel"
            : "text" // Default type
        }
        placeholder={`Enter your ${props.id.replace(/_/g, " ")}`}
        className="w-[35rem] text-[1.2rem] px-4 py-3 border rounded-full shadow-sm focus:ring-1 focus:ring-blue-500 focus:outline-none border-gray-400"
        value={props.values[props.id]} // Bind the state value to the input
        onChange={props.handleChange} // Update state when input changes
      />
    </div>
  );
};

export default InputRegister;
