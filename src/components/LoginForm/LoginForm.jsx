import { loginFormSchema } from "@/lib/form-schema";
import { useForm } from "react-hook-form";
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

//axios
import axios from "axios";

// icons
import { CiAt, CiLock } from "react-icons/ci";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (val) => {
    console.log(val);
    try {
      let data = JSON.stringify({
        email: val.email,
        password: val.password,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_BASE_URL}/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(response.data);

      window.alert("Login Succeed");
      localStorage.setItem("token", response.data.data.token);
      await navigate("homepage");
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
        <img
          className="w-[30px] h-[30px] mr-1"
          alt="logo"
          src="/src/assets/WebsiteAssets/Logo.png"
        />
        SIMS PPOB
      </div>
      <div className="text-3xl font-bold text-center">
        Masuk Atau buat akun untuk memulai
      </div>
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <CiLock className="absolute left-3 top-1/2  -translate-y-1.5 text-gray-400" />
                    <Input
                      className="pl-8"
                      type="password"
                      placeholder="masukkan password anda"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Masuk
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
