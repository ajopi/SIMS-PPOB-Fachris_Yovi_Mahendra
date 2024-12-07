// import AuthLayout from "@/pages/AuthLayout/AuthLayout";
import Homepage from "@/pages/Homepage/Homepage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import RegisterPage from "@/pages/RegisterPage/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import TopUp from "@/pages/TopUp/TopUp";
import Dashboard from "@/components/Dashboard/Dashboard";
import Transaction from "@/pages/Transaction/Transaction";
import Account from "@/pages/Account/Account";
import Payment from "@/pages/Payment/Payment";

const DefaultRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="homepage" element={<Homepage />}>
            <Route index element={<Dashboard />} />
            <Route path="payment">
              <Route path=":id" element={<Payment />} />
            </Route>
            <Route path="top-up" element={<TopUp />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="akun" element={<Account />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default DefaultRouter;
