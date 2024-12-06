import LoginForm from "@/components/LoginForm/LoginForm";
import AuthLayout from "../AuthLayout/AuthLayout";
import { Link, useNavigate } from "react-router";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("homepage");
    }
  }, [navigate]);

  return (
    <>
      <AuthLayout>
        <LoginForm />
        <span className="text-gray-400 text-center">
          belum punya akun? registrasi{" "}
          <Link to="/register" className="text-primary">
            di sini
          </Link>
        </span>
        <Toaster />
      </AuthLayout>
    </>
  );
};

export default LoginPage;
