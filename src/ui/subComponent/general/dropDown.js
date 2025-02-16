import React, { useState, useEffect } from "react";

const DropDown = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    setHasValue(Boolean(props.option) && props.option !== ""); // Ensure it only triggers when there's a real value
  }, [props.option]);

  console.log("Has Value:", hasValue, "Selected Option:", props.option); // Debugging log

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="relative">
      <select
        value={props.option}
        onChange={(e) => {
          setHasValue(Boolean(e.target.value) && e.target.value !== "");
          props.handleChangeOption(e);
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`block ${
          props.width ? props.width : "w-80"
        } px-3 py-3 text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white`}
      >
        {props.options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <label
        className={`absolute left-3 transition-all duration-200 ease-in-out bg-white px-1 ${
          isFocused || hasValue
            ? "text-sm -top-3 text-blue-500"
            : "top-3 text-gray-400"
        } pointer-events-none`}
      >
        {props.label}
      </label>
      {/* Dropdown arrow icon */}
      <div
        className={
          "absolute inset-y-0 right-3 flex items-center pointer-events-none"
        }
      >
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
