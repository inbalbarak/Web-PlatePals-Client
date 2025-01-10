import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={process.env.CLIENT_ID ?? ""}>
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>
);
