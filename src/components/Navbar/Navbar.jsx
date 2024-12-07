import { Link, useLocation, useNavigate } from "react-router";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.pathname);

  return (
    <div className="flex flex-row justify-between px-8 p-2 border-b border-gray-300">
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => navigate("/homepage")}
      >
        <img alt="logo" src="/src/assets/WebsiteAssets/Logo.png" />
        <span className="text-xl font-normal">SIMS PPOB</span>
      </div>

      <div className="flex items-center gap-6">
        <Link
          to="top-up"
          className={
            location.pathname === "/homepage/top-up"
              ? "text-red-600"
              : "hover:text-red-400"
          }
        >
          Top Up
        </Link>
        <Link
          to="transaction"
          className={
            location.pathname === "/homepage/transaction"
              ? "text-red-600"
              : "hover:text-red-400"
          }
        >
          Transaction
        </Link>
        <Link
          to="akun"
          className={
            location.pathname === "/homepage/akun"
              ? "text-red-600"
              : "hover:text-red-400"
          }
        >
          Account
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
