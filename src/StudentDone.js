import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// StudentDone component handles copying tokens and navigation
function StudentDone() {
  const navigate = useNavigate();
  const [text, setText] = useState("tokens from ZKP"); // Placeholder for tokens from ZKP
  const [copyStatus, setCopyStatus] = useState(""); // State to store copy status message

  // Function to handle copying text to clipboard
  const handleCopy = async () => {
    try {
      // Attempt to write text to clipboard
      await navigator.clipboard.writeText(text);
      setCopyStatus("Text copied!"); // Update status message on success
    } catch (err) {
      setCopyStatus("Failed to copy text."); // Update status message on failure
    }
  };

  return (
    <div className="StudentDone">
      {/* Button to copy tokens to clipboard */}
      <button className="StudentDone_Copy" onClick={handleCopy}>
        Copy Tokens to Clipboard
      </button>
      {/* Displays the copy status message */}
      <p>{copyStatus}</p>
      {/* Button to navigate back to the main page */}
      <button className="StudentDone_Back" onClick={() => navigate("/")}>
        Done
      </button>
    </div>
  );
}

export default StudentDone;
