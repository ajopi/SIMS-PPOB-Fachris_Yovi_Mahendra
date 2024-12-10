import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import UserAndBalance from "@/components/UserAndBalance/UserAndBalance";
import { useToast } from "@/hooks/use-toast";
import { fetchBalance, fetchServices } from "@/redux/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { MdMoney } from "react-icons/md";

const Payment = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { services, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("state isLoading: ", isLoading);
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

  const handlePayment = async (serviceCode) => {
    const token = localStorage.getItem("token");
    try {
      let data = JSON.stringify({
        service_code: serviceCode,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_BASE_URL}/transaction`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      const response = await axios.request(config);
      if (response.status === 200) {
        toast({
          title: "Payment Succeed",
          className: "bg-green-500 text-white",
        });
      }
      dispatch(fetchBalance());
      return response.data;
    } catch (error) {
      console.error(error);
      toast({
        title: "Payment error",
        description: "Insufficient amount of balance",
        className: "bg-red-500 text-white",
      });
    }
  };
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

        <span className="flex items-center gap-1 p-2 text-gray-500 border border-gray-500 rounded-md">
          <MdMoney />
          {selectedService.service_tariff}
        </span>
        <Button onClick={() => handlePayment(selectedService?.service_code)}>
          Bayar
        </Button>
      </div>
      <Toaster />
    </div>
  );
};

export default Payment;
