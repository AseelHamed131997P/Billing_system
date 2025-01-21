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
    <div className="p-4">
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
        {selectedFile && (
          <span className="text-gray-700">{selectedFile.name}</span>
        )}

        {/* Clear Button */}
        {selectedFile && (
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default FileInput;
