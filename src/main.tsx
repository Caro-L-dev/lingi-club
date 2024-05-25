import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./css/globals.css";
import "./css/styles.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
