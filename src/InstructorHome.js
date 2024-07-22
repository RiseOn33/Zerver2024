import React from "react";
import { useNavigate } from "react-router-dom";

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function InstructorHome() {
  const navigate = useNavigate();

  const handleTakeAttendance = () => {
    const K = generateRandomString(10); // Generate a random string of length 10
    console.log("Generated String K:", K); // Log the generated string
    navigate("/InstructorAttendance"); // Navigate to the attendance page
  };

  return (
    <div className="InstructorHome">
      <button
        className="InstructorHome_TakeAttendance"
        onClick={handleTakeAttendance}
      >
        Take Attendance
      </button>
      <button className="InstructorHome_Back" onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
}

export default InstructorHome;
