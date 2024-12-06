// import AuthLayout from "@/pages/AuthLayout/AuthLayout";
import Homepage from "@/pages/Homepage/Homepage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import RegisterPage from "@/pages/RegisterPage/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";

const DefaultRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="homepage" element={<Homepage />}>
            
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default DefaultRouter;
