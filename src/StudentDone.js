import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDone() {
  const navigate = useNavigate();
  const [text, setText] = useState("tokens from ZKP"); // replace with the actual tokens
  const [copyStatus, setCopyStatus] = useState("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("Text copied!");
    } catch (err) {
      setCopyStatus("Failed to copy text.");
    }
  };

  return (
    <div className="StudentDone">
      <button className="StudentDone_Copy" onClick={handleCopy}>
        Copy Tokens to Clipboard
      </button>
      <p>{copyStatus}</p> {/* displays copy status message */}
      <button className="StudentDone_Back" onClick={() => navigate("/")}>
        Done
      </button>
    </div>
  );
}

export default StudentDone;
