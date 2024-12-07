import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DefaultRouter from "./routes/DefaultRouter";
import { Provider } from "react-redux";
import store from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <Provider store={store}>
      <DefaultRouter />
    </Provider>
  </StrictMode>
);
