import React, { useState } from "react";

const Input = ({ name, value, handleChange, label, width = "w-96" }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const type =
    name === "Email"
      ? "email"
      : name === "Mobile_NO"
      ? "tel"
      : name === "VAT_NO"
      ? "text"
      : name === "ID_NO"
      ? "text"
      : name === "Password"
      ? "password"
      : name === "start"
      ? "text"
      : name === "end"
      ? "text"
      : name === "Price"
      ? "number"
      : "text"; // Default to text

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`block ${width} px-3 py-3 text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer`}
      />
      <label
        className={`absolute left-3 transition-all duration-200 ease-in-out ${
          isFocused || value
            ? "text-sm -top-3 bg-white px-1 text-blue-500"
            : "top-5 text-gray-400"
        } pointer-events-none`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
