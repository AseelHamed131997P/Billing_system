import React, { useState } from "react";

const Input = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e) => setValue(e.target.value);

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="block w-80 px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"
      />
      <label
        className={`absolute left-3 transition-all duration-200 ease-in-out ${
          isFocused || value
            ? "text-sm -top-3 bg-white px-1 text-blue-500"
            : "top-4 text-gray-400"
        } pointer-events-none`}
      >
        Your Label
      </label>
    </div>
  );
};

export default Input;
