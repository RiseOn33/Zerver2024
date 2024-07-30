import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import jsQR from "jsqr";

// StudentHome component handles QR code scanning and navigation
function StudentHome() {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [scanResults, setScanResults] = useState([]);
  const [error, setError] = useState("");
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    checkPermissions();
    const interval = setInterval(() => {
      capture();
    }, 1000); // Capture image every second

    return () => {
      clearInterval(interval); // Clear interval on unmount
      stopWebcam();
    };
  }, []);

  // Check for camera permissions
  const checkPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setError("");
    } catch (err) {
      console.error("Error accessing the camera: ", err);
      setError(
        "Camera access was denied. Please allow camera permissions in your browser settings."
      );
    }
  };

  // Stop the webcam stream
  const stopWebcam = () => {
    if (webcamRef.current && webcamRef.current.video.srcObject) {
      const tracks = webcamRef.current.video.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  // Capture a screenshot from the webcam -- Not necessary, included for testing
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      decodeQRFromImage(imageSrc);
    }
  };

  // Decode QR code from the captured image
  const decodeQRFromImage = (imageSrc) => {
    // Create a canvas element to draw the image on
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Create a new image object
    const image = new Image();
    image.src = imageSrc; // Set the source of the image to the captured screenshot

    // When the image is loaded, draw it on the canvas
    image.onload = () => {
      canvas.width = image.width; // Set canvas width to image width
      canvas.height = image.height; // Set canvas height to image height
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // Draw the image on the canvas

      // Get image data from the canvas
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Use jsQR to decode the QR code from the image data
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      // If a QR code is detected, add the result to the scan results
      if (code) {
        setScanResults((prevResults) => [
          ...prevResults,
          `QR Code Detected: ${code.data}`,
        ]);
      }
    };
  };

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      {error ? (
        <div className="error">{error}</div> // Display error message if there is an error
      ) : (
        <div
          style={{
            position: "relative",
            display: "inline-block",
            overflow: "hidden",
            width: "100%",
            height: "auto",
          }}
        >
          <Webcam
            className="webcam" // Webcam component for capturing video
            audio={false} // Disable audio capture
            ref={webcamRef} // Reference to access the webcam instance
            screenshotFormat="image/jpeg" // Set the format for captured images
            videoConstraints={{
              facingMode:
                window.innerWidth < 768 ? { exact: "environment" } : "user",
            }} // Set video constraints based on screen width
            style={{
              transform: `scale(${zoom})`, // Apply zoom
              transformOrigin: "center center", // Set transform origin to the center
              width: "100%",
              height: "auto",
              objectFit: "cover", // Cover the entire area of the component
            }}
          />
          <input
            type="range" // Range input for zoom control
            min="1"
            max="5"
            step="0.1"
            value={zoom} // Bind zoom state to input value
            onChange={(e) => setZoom(parseFloat(e.target.value))} // Update zoom state on change
            style={{
              width: "80%",
              position: "absolute",
              bottom: "10px",
              left: "10%",
            }} // Style the input
          />
        </div>
      )}
      <div>
        {scanResults.map((result, index) => (
          <p key={index}>{result}</p> // Display each detected QR code result
        ))}
      </div>
      <div className="button-container">
        <button
          className="StudentHome_Finish" // Button to navigate to the StudentDone page
          onClick={() => navigate("/StudentDone")}
        >
          Finish
        </button>
      </div>
    </div>
  );
}

export default StudentHome;
