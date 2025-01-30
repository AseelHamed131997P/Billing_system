import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";

const MultiSelectInput = ({
  options,
  placeholder,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    const isAlreadySelected = selectedOptions.some(
      (selected) => selected.value === option.value
    );

    if (!isAlreadySelected) {
      setSelectedOptions([...selectedOptions, option]); // Add full object
    } else {
      setSelectedOptions(
        selectedOptions.filter((item) => item.value !== option.value)
      );
    }
  };

  const removeOption = (option) => {
    setSelectedOptions(
      selectedOptions.filter((item) => item.value !== option.value)
    );
  };

  return (
    <div className="relative w-full max-w-md">
      <div
        className="flex items-center justify-between border border-gray-400 rounded-lg p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={toggleDropdown}
      >
        <div className="flex flex-wrap gap-1">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option, index) => (
              <span
                key={index}
                className="flex items-center bg-blue-500 text-white rounded-full px-2 py-1 text-sm"
              >
                {option.label}
                <button
                  type="button"
                  className="ml-1 text-white hover:text-gray-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(option);
                  }}
                >
                  <X size={14} />
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-400">
              {placeholder || "Select options"}
            </span>
          )}
        </div>
        <ChevronDown className="ml-2 text-gray-600" />
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-400 rounded-lg shadow-lg z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className={`p-2 cursor-pointer hover:bg-blue-500 hover:text-white ${
                selectedOptions.some(
                  (selected) => selected.value === option.value
                )
                  ? "bg-blue-100"
                  : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectInput;
