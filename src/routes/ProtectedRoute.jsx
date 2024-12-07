import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const user = localStorage.getItem("token");
  try {
    const payload = JSON.parse(atob(user.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to={"/"} />;
    }
    return <Outlet />;
  } catch (error) {
    console.log(error);
    localStorage.removeItem("token");
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
