import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./App.css";
import App from "./App.tsx";
import GesamtseitenContextProvider from "./context/GesamtseitenContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GesamtseitenContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GesamtseitenContextProvider>
  </StrictMode>
);
