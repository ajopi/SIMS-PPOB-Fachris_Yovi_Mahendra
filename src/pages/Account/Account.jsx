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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser } from "@/redux/userSlice";
import { logout, updateImage, updateProfile } from "@/services/Account";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";

const Account = () => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { profile, isLoadingProfile } = useSelector((state) => state.user);
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(updateAccountFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
  });

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (profile?.data) {
      form.reset({
        email: profile.data.email,
        firstName: profile.data.first_name,
        lastName: profile.data.last_name,
      });
    }
  }, [profile, form]);

  if (isLoadingProfile) {
    return <div>Loading....</div>;
  }

  const user = profile?.data;
  console.log(user);

  const onSubmit = async (val) => {
    console.log(val);

    try {
      const response = await updateProfile(val.firstName, val.lastName);
      if (response.status === 200) {
        dispatch(fetchUser());
        toast({
          title: "Update Profile Succeed",
          className: "bg-green-500 text-white",
        });
        setEditMode(!editMode);
      }
    } catch (error) {
      console.error("error update profile", error);
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const maxSize = 100 * 1024;
    if (file) {
      if (file.size > maxSize) {
        toast({
          title: "Error",
          description: "Ukuran file tidak boleh lebih dari 100kb",
          className: "bg-red-500 text-white",
        });
        event.target.value = "";
        return;
      }
      try {
        const response = await updateImage(file);
        if (response.status === 200) {
          dispatch(fetchUser());
          toast({
            title: "Update Image Succeed",
            className: "bg-green-500 text-white",
          });
        }
      } catch (error) {
        console.error("Error update image:", error);
      }
    }
  };

  const handleLogout = () => {
    try {
      logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="flex flex-col gap-4 items-center mb-14">
        <div className="relative">
          <img
            src={
              user?.profile_image ||
              "/src/assets/WebsiteAssets/Profile Photo.png"
            }
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
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
          />
        </div>
        <span className="text-3xl font-bold">
          {user?.first_name + " " + user?.last_name}
        </span>
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
                        disabled
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
                        disabled={editMode === false ? true : false}
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
                        disabled={editMode === false ? true : false}
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
            {editMode ? (
              <Button className="w-full" type="submit">
                Simpan
              </Button>
            ) : (
              ""
            )}
          </form>
        </Form>
        {editMode ? (
          ""
        ) : (
          <Button
            onClick={() => setEditMode(!editMode)}
            className="w-full border border-red-500 bg-transparent text-red-500 hover:bg-transparent hover:text-red-400"
          >
            Edit Profile
          </Button>
        )}
        {editMode ? (
          <Button
            onClick={() => setEditMode(!editMode)}
            className="bg-white text-red-600 border border-red-600 hover:text-white w-full"
          >
            Batalkan
          </Button>
        ) : (
          <Button
            onClick={handleLogout}
            className="border border-red-600 hover:text-white w-full"
          >
            Logout
          </Button>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Account;
