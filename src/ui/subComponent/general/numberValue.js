import React, { useEffect, useRef } from "react";

const NumberValue = (props) => {
  return (
    <div
      className={`${
        props.width ? props.width : "w-[20rem]"
      } inline-flex items-center bg-gray-100 border border-gray-300 text-gray-700 text-lg font-medium px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow`}
    >
      <span>{props.label} NO:</span>
      <span className="ml-2 font-bold text-blue-600">#{props.num}</span>
    </div>
  );
};

export default NumberValue;
