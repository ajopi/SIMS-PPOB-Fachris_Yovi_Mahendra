import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

// icons
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const DialogDefault = ({
  open,
  openChange,
  payment,
  dialogMode,
  onBackHome,
  onCancel,
  balance,
}) => {
  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogContent className="w-[350px]">
        <DialogHeader className="justify-center items-center gap-3">
          {dialogMode === "confirm" && (
            <>
              <span className="flex justify-center">
                <MdAccountBalanceWallet className="flex items-center justify-center  p-3 rounded-full w-[65px] h-[65px] bg-red-600 text-white " />
              </span>

              <DialogTitle className="flex flex-col text-gray-600 font-semibold items-center">
                Anda yakin untuk Top Up sebesar
                <span className="text-2xl font-bold text-black">
                  {"Rp." + balance}
                </span>
              </DialogTitle>

              <DialogDescription className="flex flex-col">
                <Button
                  className="border-none bg-transparent text-red-500 hover:bg-transparent hover:text-red-800"
                  type="submit"
                  onClick={payment}
                >
                  Ya, lanjutkan Top Up
                </Button>
                <Button
                  className="border-none bg-transparent text-gray-400 hover:bg-transparent hover:text-gray-600"
                  onClick={onCancel}
                >
                  Batalkan
                </Button>
              </DialogDescription>
            </>
          )}

          {dialogMode === "success" && (
            <>
              <span className="flex justify-center">
                <FaCheck className="flex items-center justify-center  p-3 rounded-full w-[65px] h-[65px] bg-green-600 text-white " />
              </span>

              <DialogTitle className="flex flex-col text-gray-600 font-semibold items-center">
                Top Up sebesar
                <span className="text-2xl font-bold text-black my-1">
                  {"Rp." + balance}
                </span>
                Berhasil
              </DialogTitle>

              <DialogDescription className="flex flex-col">
                <Button
                  className="border-none bg-transparent text-red-500 hover:bg-transparent hover:text-red-800"
                  type="submit"
                  onClick={onBackHome}
                >
                  Kembali ke Beranda
                </Button>
              </DialogDescription>
            </>
          )}

          {dialogMode === "error" && (
            <>
              <span className="flex justify-center">
                <IoClose className="flex items-center justify-center  p-3 rounded-full w-[65px] h-[65px] bg-red-600 text-white " />
              </span>

              <DialogTitle className="flex flex-col text-gray-600 font-semibold items-center">
                Top Up sebesar
                <span className="text-2xl font-bold text-black my-1">
                  {"Rp." + balance}
                </span>
                Gagal
              </DialogTitle>

              <DialogDescription className="flex flex-col">
                <Button
                  className="border-none bg-transparent text-red-500 hover:bg-transparent hover:text-red-800"
                  type="submit"
                  onClick={onBackHome}
                >
                  Kembali ke Beranda
                </Button>
              </DialogDescription>
            </>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDefault;
