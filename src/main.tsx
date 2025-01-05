import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="268717679980-ur99nqggari7c82r2r9qd1ghdrjsdm81.apps.googleusercontent.com">
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>
);
