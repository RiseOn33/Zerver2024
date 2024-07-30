// Importing necessary modules and components
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainHome from "./MainHome";
import StudentHome from "./StudentHome";
import StudentDone from "./StudentDone";
import InstructorHome from "./InstructorHome";
import InstructorAttendance from "./InstructorAttendance";
import InstructorDone from "./InstructorDone";

// Defining the main App component that sets up the routing for the application
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/InstructorHome" element={<InstructorHome />} />
        <Route path="/StudentHome" element={<StudentHome />} />
        <Route
          path="/InstructorAttendance"
          element={<InstructorAttendance />}
        />
        <Route path="/InstructorDone" element={<InstructorDone />} />
        <Route path="/StudentDone" element={<StudentDone />} />
      </Routes>
    </Router>
  );
}

export default App;

// Functions for interacting with a REST API
const apiUrl = "http://10.100.178.140:5000/items";

// Fetch and display all items from the API
async function getItems() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayOutput(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Fetch and display a single item by ID from the API
async function getItem(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    const data = await response.json();
    displayOutput(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Create a new item in the API
async function createItem() {
  const newItem = { name: "item3", price: 15.99 };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
    const data = await response.json();
    displayOutput(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Update an existing item by ID in the API
async function updateItem(id) {
  const updatedItem = { name: "updated_item1", price: 9.99 };

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    });
    const data = await response.json();
    displayOutput(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Delete an item by ID from the API
async function deleteItem(id) {
  try {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    displayOutput({ message: `Item ${id} deleted` });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Display the output data in the HTML element with the ID "output"
function displayOutput(data) {
  document.getElementById("output").textContent = JSON.stringify(data, null, 2);
}
