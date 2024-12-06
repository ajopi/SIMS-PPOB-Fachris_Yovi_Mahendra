import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const user = localStorage.getItem("token");
  try {
    const isValid = JSON.parse(atob(user.split(".")[1]));
    console.log(isValid);
    return isValid ? <Outlet /> : <Navigate to="/" />;
  } catch (error) {
    console.log(error);
    localStorage.removeItem("token");
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
