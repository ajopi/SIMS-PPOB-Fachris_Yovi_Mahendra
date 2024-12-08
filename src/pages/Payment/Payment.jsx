import UserAndBalance from "@/components/UserAndBalance/UserAndBalance";
import { fetchServices } from "@/redux/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const Payment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { services, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    console.log('state isLoading: ', isLoading)
    if (!services && !isLoading) {
      console.log(services);
      dispatch(fetchServices());
    }
  }, [dispatch, services, isLoading]);

  const selectedService = services?.data?.find(
    (service) => service.service_code === id
  );

  if (isLoading === true) {
    return <p>Loading....</p>;
  }
  if (!selectedService) {
    return <p>Service Not Found!</p>;
  }
  console.log(selectedService);

  return (
    <div className="flex flex-col">
      <UserAndBalance />
      <div className="flex flex-col gap-2">
        <span className="text-xl text-gray-500">Pembayaran</span>
        <div className="flex flex-row items-center gap-1">
          <img
            src={
              selectedService?.service_icon ||
              "/src/assets/WebsiteAssets/PGN.png"
            }
            alt="logo"
            className="w-[35px] h-[35px]"
          />
          <span className="font-bold">{selectedService?.service_name}</span>
        </div>
      </div>
    </div>
  );
};

export default Payment;
