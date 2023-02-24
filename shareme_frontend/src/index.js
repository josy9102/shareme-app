import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import "./index.css";

const domContainer = document.getElementById("root");
const root = createRoot(domContainer);
root.render(
  <GoogleOAuthProvider clientId="820152016788-sdtal4dhmjat9mrpm3k9lep0sel6dq6a.apps.googleusercontent.com">
    <Router>
      <App />
    </Router>
  </GoogleOAuthProvider>
);
