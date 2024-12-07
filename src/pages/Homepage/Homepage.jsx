import { Outlet } from "react-router";

import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";

const Homepage = () => {
  return (
    <div className="flex flex-col ">
      <Navbar />

      <div className="px-8 pt-4">
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
};

export default Homepage;
