import { useDispatch, useSelector } from "react-redux";
import UserAndBalance from "../UserAndBalance/UserAndBalance";
import { useEffect } from "react";
import { fetchBanner, fetchServices } from "@/redux/userSlice";
import { Link, Outlet, useParams } from "react-router";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { services, banner } = useSelector((state) => state.user);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchBanner());
  }, [dispatch]);

  return (
    <>
      <UserAndBalance />
      {id ? (
        <Outlet />
      ) : (
        <>
          <div className="flex flex-row justify-between">
            {services?.data?.map((items) => {
              return (
                <div
                  key={items.service_code}
                  className="flex flex-col items-center  w-36 gap-2"
                >
                  <img
                    src={
                      items.service_icon || "/src/assets/WebsiteAssets/PBB.png"
                    }
                    alt="logo"
                  />
                  <Link
                    className="text-center cursor-pointer hover:text-red-500"
                    to={`/homepage/payment/${items.service_code}`}
                  >
                    {items.service_name}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col mt-5 gap-2">
            <span>Temukan promo menarik</span>
            <div className="flex flex-row overflow-x-auto gap-4">
              {banner?.data?.map((items) => {
                return (
                  <img
                    key={items.banner_name}
                    src={
                      items.banner_image ||
                      "/src/assets/WebsiteAssets/Banner 1.png"
                    }
                    alt="banner"
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
