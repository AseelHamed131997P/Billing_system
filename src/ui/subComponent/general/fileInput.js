import React, { useState, useEffect } from "react";

const FileInput = ({
  setFile,
  file,
  name,
  label,
  index,
  clearButt,
  setClearButt,
  type,
  setClearFile,
  clearFile,
  setClearCanvas,
  clearCanvas,
  selectedFile,
  setSelectedFile,
}) => {
  // ✅ Accept index as a prop
  // const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // If type is `true`, restrict to PNG files only
      if (type && file.type !== "image/png") {
        alert("Please select a PNG file.");
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);

      // Convert the image to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof index !== "undefined") {
          setFile(reader.result, index);
        } else {
          setFile(reader.result);
          // setClearCanvas(!clearCanvas);
          // setFile((prevState) => ({
          //   ...prevState,
          //   urlFile: reader.result, // Update only urlFile
          // }));
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // Handle clear button click
  const handleClear = () => {
    setSelectedFile(null);
    if (typeof index !== "undefined") {
      // ✅ If index is provided, pass it
      setFile(null, index);
    } else {
      // ✅ If index is NOT provided, update only urlFile (global state)
      setFile(null);

      // setFile((prevState) => ({
      //   ...prevState, // Preserve existing state properties
      //   urlFile: null, // Update only urlFile
      // }));
    }

    // Reset the file input value
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = ""; // Reset the file input
    }
  };

  // useEffect(() => {
  //   if (clearFile) {
  //     handleClear();
  //     setClearFile(false);
  //   }
  // }, [clearFile]);

  return (
    <div>
      <div className="flex items-center gap-4">
        {/* File Input */}
        <label className="cursor-pointer ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="blue"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>

          {/* {name} */}
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/png" // Restrict to PNG files
          />
        </label>

        {/* Display selected file name */}

        <span
          className="text-gray-700 w-32 truncate inline-block overflow-hidden text-ellipsis whitespace-nowrap cursor-default"
          title={selectedFile?.name || label || "No file chosen"}
        >
          {selectedFile?.name || label || "No file chosen"}
        </span>

        {/* Clear Button */}

        <button
          type="button"
          onClick={handleClear}
          className={`px-4 py-2 rounded transition duration-200 ${
            selectedFile
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!selectedFile}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default FileInput;
