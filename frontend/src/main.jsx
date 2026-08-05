import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./index.css";
import "./App.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <GoogleOAuthProvider
      clientId="444456936065-012sfpvgn6vjj4fh6kk4sh8pp4hmna79.apps.googleusercontent.com"
    >

      <App />

    </GoogleOAuthProvider>

  </React.StrictMode>
);