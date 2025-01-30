import React, { useState } from "react";

const CreatableDropDown = (props) => {
  return (
    <div className="relative">
      <select
        value={props.option[props.valueKey]}
        onChange={props.handleChangeOption}
        className="block w-80 px-3 py-3 text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white peer"
      >
        {props.options.map((option, index) => (
          <option key={index} value={option[props.valueKey]}>
            {option[props.valueKey]}
          </option>
        ))}
        <option value="create_new" className="text-blue-500 font-semibold">
          + Create New
        </option>
      </select>

      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
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

export default CreatableDropDown;
