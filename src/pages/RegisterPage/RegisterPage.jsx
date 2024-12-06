import RegisterForm from "@/components/RegisterForm/RegisterForm";
import AuthLayout from "../AuthLayout/AuthLayout";
import { Link, useNavigate } from "react-router";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

const RegisterPage = () => {
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
        <RegisterForm />
        <span className="text-gray-400 text-center">
          sudah punya akun? login{" "}
          <Link to="/" className="text-primary">
            di sini
          </Link>
        </span>
        <Toaster />
      </AuthLayout>
    </>
  );
};

export default RegisterPage;
