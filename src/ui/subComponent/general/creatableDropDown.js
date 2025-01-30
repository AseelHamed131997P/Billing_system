import React, { useState } from "react";

const DropDown = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="relative">
      <select
        value={props.option.value}
        onChange={props.handleChangeOption}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="block w-80 px-3 py-3 text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white peer"
      >
        {/* Optional placeholder */}
        <option value="" disabled hidden>
          Select an Option
        </option>
        {props.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        className={`absolute left-3 transition-all duration-200 ease-in-out ${
          isFocused || props.option.value
            ? "text-md -top-3 bg-white px-1 text-blue-500"
            : "top-2 text-gray-400"
        } pointer-events-none`}
      >
        {props.label}
      </label>
      {/* Dropdown arrow icon */}
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default DropDown;
