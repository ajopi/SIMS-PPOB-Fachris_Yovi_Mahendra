import { updateAccountFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

//icons
import { CiAt } from "react-icons/ci";
import { MdOutlinePerson } from "react-icons/md";
import { FaPen } from "react-icons/fa";

const Account = () => {
  const form = useForm({
    resolver: zodResolver(updateAccountFormSchema),
    defaultValues: {
      email: "johnDoe@gmail.com",
      firstName: "John",
      lastName: "Doe",
    },
  });

  const onSubmit = async (val) => {
    console.log(val);
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="flex flex-col gap-4 items-center mb-14">
        <div className="relative">
          <img
            src="/src/assets/WebsiteAssets/Profile Photo.png"
            alt="profile"
            className="w-[100px] h-[100px] object-cover rounded-full"
          />
          <label
            htmlFor="upload-profile"
            className="absolute bottom-0 right-0 bg-white w-8 h-8 rounded-full flex items-center justify-center text-black cursor-pointer shadow-md border"
          >
            <FaPen />
          </label>
          <input
            id="upload-profile"
            type="file"
            className="hidden"
            // onChange={handleUpload}
          />
        </div>
        <span className="text-3xl font-bold">John Doe</span>
      </div>

      <div className=" w-[600px] space-y-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <CiAt className="absolute left-3 top-1/2  -translate-y-1.5 text-gray-400" />
                      <Input
                        className="pl-8"
                        placeholder="edit email anda"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <MdOutlinePerson className="absolute left-3 top-1/2  -translate-y-1.5 text-gray-400" />
                      <Input
                        className="pl-8"
                        placeholder="edit nama depan anda"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <MdOutlinePerson className="absolute left-3 top-1/2  -translate-y-1.5 text-gray-400" />
                      <Input
                        className="pl-8"
                        placeholder="edit nama depan anda"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Edit Profile
            </Button>
          </form>
        </Form>
        <Button className="bg-white text-red-600 border border-red-600 hover:text-white w-full">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Account;
