import DialogDefault from "@/components/DialogDefault/DialogDefault";
import UserAndBalance from "@/components/UserAndBalance/UserAndBalance";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { topUpBalanceFormSchema } from "@/lib/form-schema";
import { fetchBalance } from "@/redux/userSlice";
import { topUpBalance } from "@/services/topup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

//icons
import { MdMoney } from "react-icons/md";
import { rupiahFormat } from "@/lib/utils";

const TopUp = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("confirm");

  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(topUpBalanceFormSchema),
    defaultValues: {
      balance: "",
    },
    mode: "onChange",
  });

  const continuePayment = async (val) => {
    try {
      const response = await topUpBalance(val.balance);
      dispatch(fetchBalance());
      setDialogMode("success");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (val) => {
    console.log(val);
    setIsDialogOpen(!isDialogOpen);
  };

  const handleBackHome = () => {
    setIsDialogOpen(false);
    setDialogMode("confirm");
  };

  const handleDialogFail = () => {
    setDialogMode("error");
  };

  console.log(form.getValues().balance);
  return (
    <div className="flex flex-col">
      <UserAndBalance />
      <div className="flex flex-col gap-2">
        <span>Silahkan masukkan</span>
        <span className="text-2xl font-bold">Nominal Top Up</span>

        <div className="flex flex-row gap-2">
          <div className="w-[70%] ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-7"
              >
                <FormField
                  control={form.control}
                  name="balance"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <MdMoney className="absolute left-3 top-1/2  -translate-y-1.5 text-gray-400" />
                          <Input
                            type="number"
                            className="pl-8 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            placeholder="masukkan nominal top up"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full"
                  type="submit"
                  disabled={!form.formState.isValid}
                >
                  Top up
                </Button>
                <DialogDefault
                  open={isDialogOpen}
                  openChange={() => setIsDialogOpen(!isDialogOpen)}
                  payment={form.handleSubmit(continuePayment)}
                  dialogMode={dialogMode}
                  onBackHome={handleBackHome}
                  onCancel={handleDialogFail}
                  balance={rupiahFormat(form.getValues().balance)}
                />
              </form>
            </Form>
          </div>
          <div className="w-[30%]  flex flex-wrap gap-5 justify-center">
            {[
              "10.000",
              "20.000",
              "50.000",
              "100.000",
              "250.000",
              "500.000",
            ].map((value, index) => (
              <button
                key={index}
                className="flex items-center justify-center w-28 h-12 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onClick={() =>
                  form.setValue("balance", value.replace(".", ""), {
                    shouldValidate: true,
                  })
                }
              >
                Rp. {value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUp;
