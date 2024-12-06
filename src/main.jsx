import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DefaultRouter from "./routes/DefaultRouter";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <DefaultRouter />
  </StrictMode>
);
