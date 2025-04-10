import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import TanStackProvider from "./provider/TanStackProvider";
import { AuthProvider } from "./context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <TanStackProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </TanStackProvider>
    </React.StrictMode>
  </BrowserRouter>
);
