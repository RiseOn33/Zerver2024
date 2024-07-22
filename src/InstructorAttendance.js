import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";

function InstructorAttendance() {
  const navigate = useNavigate();
  const qrRef = useRef();
  const [qrCodes, setQrCodes] = useState([]);
  const [currentQrIndex, setCurrentQrIndex] = useState(0);

  // function to generate a random 50 character string
  const SessionID = (length = 50) => {
    let result = "";
    while (result.length < length) {
      result += Math.random().toString(36).substring(2);
    }
    return "<" + result.substring(0, length) + ">" + "_zkp";
  };

  // generate 60 random QR codes
  useEffect(() => {
    const qrArray = [];
    for (let i = 0; i < 60; i++) {
      qrArray.push(SessionID());
    }
    setQrCodes(qrArray);
  }, []);

  console.log(qrCodes); // remove before testing to class because this reveals all the SessionID's in the console

  // update the QR code canvas
  useEffect(() => {
    if (qrRef.current && qrCodes.length > 0) {
      const canvas = qrRef.current;
      const size = Math.min(window.innerWidth, window.innerHeight);
      canvas.width = size;
      canvas.height = size;

      QRCode.toCanvas(
        canvas,
        qrCodes[currentQrIndex],
        {
          width: size,
          height: size,
          colorDark: "#000000",
          colorLight: "#ffffff",
          errorCorrectionLevel: "H",
        },
        (error) => {
          if (error) console.error(error);
        }
      );
    }
  }, [currentQrIndex, qrCodes]);

  // loop through the QR codes every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQrIndex((prevIndex) => (prevIndex + 1) % qrCodes.length);
    }, 2000); // time in ms
    return () => clearInterval(interval);
  }, [qrCodes]);

  return (
    <div className="InstructorAttendance">
      <canvas id="qrcode" ref={qrRef}></canvas>
      <div className="counter">{currentQrIndex + 1} / 60</div>
      <div className="button-container">
        <button
          className="InstructorAttendance_Done"
          onClick={() => navigate("/InstructorHome")}
        >
          Cancel
        </button>
        <button
          className="InstructorAttendance_Finish"
          onClick={() => navigate("/InstructorDone")}
        >
          Finish
        </button>
      </div>
    </div>
  );
}

export default InstructorAttendance;

// // URL of the API endpoint -- code for pulling from a qr code
// const apiUrl = "http://10.100.178.140:5000/items";

// useEffect(() => {
//   async function fetchData() {
//     try {
//       const response = await fetch(apiUrl);

//       // Check if the request was successful
//       if (!response.ok) {
//         throw new Error("Network response was not ok " + response.statusText);
//       }

//       // Parse the JSON from the response
//       const data = await response.json();

//       // Use the data to generate the QR code
//       setText(JSON.stringify(data)); // Assuming data is an object; you may need to adjust this based on your API response
//     } catch (error) {
//       // Handle any errors
//       console.error("There was a problem with the fetch operation:", error);
//     }
//   }

//   fetchData();
// }, [apiUrl]);
