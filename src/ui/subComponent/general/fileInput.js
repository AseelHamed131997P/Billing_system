import React, { useState } from "react";

const FileInput = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "image/png") {
        setSelectedFile(file);

        // Convert the image to Base64
        const reader = new FileReader();
        reader.onloadend = () => {
          props.setFile((prevState) => ({
            ...prevState, // Preserve all existing state properties
            urlFile: reader.result, // Update only urlFile
          }));
        };
        reader.readAsDataURL(file); // Read the file as a data URL
      } else {
        alert("Please select a PNG file.");
        setSelectedFile(null); // Clear the selected file
      }
    }
  };

  // Handle clear button click
  const handleClear = () => {
    setSelectedFile(null); // Clear the selected file
    props.setFile((prevState) => ({
      ...prevState, // Preserve all existing state properties
      urlFile: null, // Clear only urlFile
    }));

    // Reset the file input value
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = ""; // Reset the file input
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        {/* File Input */}
        <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
          {props.name}
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/png" // Restrict to PNG files
          />
        </label>

        {/* Display selected file name */}

        <span
          className="text-gray-700 w-32 truncate block"
          style={{
            display: "inline-block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            cursor: "default", // Ensures the mouse pointer is an arrow
          }}
          title={selectedFile ? selectedFile.name : "No file chosen"}
        >
          {selectedFile ? selectedFile.name : "No file chosen"}
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
