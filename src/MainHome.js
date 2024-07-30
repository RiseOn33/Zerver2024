import React from "react";
import { useNavigate } from "react-router-dom";

// MainHome component with navigation buttons for Instructor and Student pages
function MainHome() {
  const navigate = useNavigate(); // Hook to programmatically navigate

  return (
    <div className="MainHome">
      {/* Button to navigate to the InstructorHome page */}
      <button
        className="HomeNavigationButton"
        onClick={() => navigate("/InstructorHome")}
      >
        Instructor
      </button>
      {/* Button to navigate to the StudentHome page */}
      <button
        className="HomeNavigationButton"
        onClick={() => navigate("/StudentHome")}
      >
        Student
      </button>
    </div>
  );
}

export default MainHome;
