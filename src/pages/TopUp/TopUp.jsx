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
import { useToast } from "@/hooks/use-toast";
import { topUpBalanceFormSchema } from "@/lib/form-schema";
import { fetchBalance } from "@/redux/userSlice";
import { topUpBalance } from "@/services/topup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

//icons
import { MdMoney } from "react-icons/md";
import { useDispatch } from "react-redux";

const TopUp = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(topUpBalanceFormSchema),
    defaultValues: {
      balance: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (val) => {
    try {
      const response = await topUpBalance(val.balance);
      toast({
        title: "Top Up Balance Success",
        className: "bg-[#4ade80] text-white",
      });
      dispatch(fetchBalance());
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(form.getValues());
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
