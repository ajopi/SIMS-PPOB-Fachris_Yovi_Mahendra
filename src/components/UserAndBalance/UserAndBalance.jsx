import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { GoEye } from "react-icons/go";

// icon
import { GoDotFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalance, fetchUser } from "@/redux/userSlice";
import { rupiahFormat } from "@/lib/utils";

const UserAndBalance = () => {
  const [isOpen, setisOpen] = useState(false);
  const dotCount = 7;

  const dispatch = useDispatch();
  const { isLoading, profile, balance } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchBalance());
  }, [dispatch]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 py-6">
      <div className="flex flex-col gap-1">
        <img
          className="w-[70px] h-[70px] rounded-full"
          src={
            profile?.data?.profile_image ||
            "/src/assets/WebsiteAssets/Profile Photo.png"
          }
          alt="pict profile"
        />
        <span className="text-xl">Selamat Datang,</span>
        <span className="text-3xl font-bold">
          {profile?.data?.first_name || "User"}{" "}
          {profile?.data?.last_name || "lastname"}
        </span>
      </div>
      <div className="flex p-2">
        <div className="flex flex-col gap-2 p-3 w-full text-white rounded-md bg-red-600">
          <span>Saldo Anda</span>
          <div className="flex flex-row items-center text-2xl font-bold">
            <span className="mr-3">Rp</span>
            {isOpen
              ? rupiahFormat(balance?.data?.balance)
              : Array.from({ length: dotCount }).map((_, index) => {
                  return <GoDotFill key={index} />;
                })}
          </div>
          <Button
            variant="transparent"
            className="w-[100px] p-0"
            onClick={() => setisOpen(!isOpen)}
          >
            Lihat Saldo <GoEye />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserAndBalance;
