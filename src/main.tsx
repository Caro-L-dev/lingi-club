import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./globals.css";
import { AuthContextProvider } from "@/contexts/AuthUserContext"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ToastContainer position="top-center" autoClose={2000} />
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
