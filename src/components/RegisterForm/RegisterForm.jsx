import { registerFormSchema } from "@/lib/form-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "@/assets/WebsiteAssets/Logo.png";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// icons
import { CiAt, CiLock } from "react-icons/ci";
import { MdOutlinePerson } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (val) => {
    try {
      let data = JSON.stringify({
        email: val.email,
        first_name: val.firstName,
        last_name: val.lastName,
        password: val.password,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://take-home-test-api.nutech-integrasi.com/registration",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(response.data);
      toast({
        title: "Account Created!",
        className: "bg-[#4ade80] text-white",
      });
      await navigate("/");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <div className="flex justify-center text-2xl font-semibold ">
        <img className="w-[30px] h-[30px] mr-1" alt="logo" src={logo} />
        SIMS PPOB
      </div>
      <div className="text-2xl font-bold text-center">
        Lengkapi data untuk membuat akun
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                      placeholder="masukkan email anda"
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
                      placeholder="nama depan"
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
                      placeholder="nama belakang"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <CiLock className="absolute left-3 top-1/2  -translate-y-1.5 text-gray-400" />
                    <Input
                      type="password"
                      className="pl-8"
                      placeholder="buat password"
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <CiLock className="absolute left-3 top-1/2  -translate-y-1.5 text-gray-400" />
                    <Input
                      className="pl-8"
                      type="password"
                      placeholder="konfirmasi password "
                      {...field}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Registrasi
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
