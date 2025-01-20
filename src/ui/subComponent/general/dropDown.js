import React, { useState } from "react";

const DropDown = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("Option 1");

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e) => setValue(e.target.value);

  return (
    <div className="relative">
      <select
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="block w-80 px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white peer"
      >
        {/* <option value="" disabled hidden></option> */}
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <label
        className={`absolute left-3 transition-all duration-200 ease-in-out ${
          isFocused || value
            ? "text-sm -top-3 bg-white px-1 text-blue-500"
            : "top-2 text-gray-400"
        } pointer-events-none`}
      >
        Select an Option
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
