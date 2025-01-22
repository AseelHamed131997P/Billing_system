import React, { useEffect, useRef } from "react";

const Signature = (props) => {
  const canvasRef = useRef(null);

  let isMouseDownOrTouchStart = false;
  let previousX = 0;
  let previousY = 0;

  // Initialize drawing context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";

    // Add event listeners for mouse and touch
    const handleMouseDown = (e) => {
      isMouseDownOrTouchStart = true;
      const { x, y } = getPosition(canvas, e);
      previousX = x;
      previousY = y;
    };

    const handleMouseMove = (e) => {
      if (isMouseDownOrTouchStart) {
        const { x, y } = getPosition(canvas, e);
        draw(ctx, previousX, previousY, x, y);
        previousX = x;
        previousY = y;
        updateSignatureData(); // Update signature data on change
      }
    };

    const handleMouseUpOrOut = () => {
      isMouseDownOrTouchStart = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUpOrOut);
    canvas.addEventListener("mouseout", handleMouseUpOrOut);

    canvas.addEventListener("touchstart", handleMouseDown, { passive: true });
    canvas.addEventListener("touchmove", handleMouseMove, { passive: true });
    canvas.addEventListener("touchend", handleMouseUpOrOut, { passive: true });

    return () => {
      // Clean up event listeners
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUpOrOut);
      canvas.removeEventListener("mouseout", handleMouseUpOrOut);

      canvas.removeEventListener("touchstart", handleMouseDown);
      canvas.removeEventListener("touchmove", handleMouseMove);
      canvas.removeEventListener("touchend", handleMouseUpOrOut);
    };
  }, []);

  // Get the position of the mouse or touch
  const getPosition = (canvas, evt) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = evt.clientX || (evt.touches && evt.touches[0].clientX);
    const clientY = evt.clientY || (evt.touches && evt.touches[0].clientY);

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  // Draw on the canvas
  const draw = (ctx, prevX, prevY, currX, currY) => {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.stroke();
    ctx.closePath();
  };

  // Update signature data in state
  const updateSignatureData = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png"); // Get the canvas data as a URL
    props.setSignature((prevState) => ({
      ...prevState, // Preserve all existing state properties
      urlSign: dataUrl, // Update only urlSign
    }));
  };

  // Handle save button click
  const handleSave = () => {
    if (!canvasRef.current) {
      console.error("Canvas reference is not set or null");
      return;
    }

    try {
      const url = canvasRef.current.toDataURL("image/png");
      console.log("Canvas URL:", url);
      props.setSignature({ ...props.signature, urlSign: url }); // Pass the data to the parent component

      // Download the image
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "signature.png");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error while saving the image:", error);
    }
  };

  // Handle clear button click
  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    props.setSignature((prevState) => ({
      ...prevState, // Preserve all existing state properties
      urlSign: null, // Clear only urlSign
    }));
  };

  return (
    <>
      <canvas
        className="w-full h-[10rem] mb-4 border border-gray-400 "
        ref={canvasRef}
        width={480}
        height={160}
      />

      <div className="flex gap-4 justify-center">
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Save as image
        </button>

        <button
          type="button"
          onClick={handleClear}
          className={`px-4 py-2 rounded transition duration-200 ${
            props.signature.urlSign
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!props.signature.urlSign}
        >
          Clear
        </button>
      </div>
    </>
  );
};

export default Signature;
