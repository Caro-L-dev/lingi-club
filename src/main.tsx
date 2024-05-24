import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.js";
import "./globals.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
