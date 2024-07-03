import React from "react";
import ReactDOM from "react-dom/client";

import { AuthContextProvider } from "@/contexts/AuthUserContext";
import App from "./App.tsx";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ToastContainer position="top-center" autoClose={1000} />
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
