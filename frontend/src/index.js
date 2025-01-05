import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css"; // Import global styles

// Get the root element from the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



