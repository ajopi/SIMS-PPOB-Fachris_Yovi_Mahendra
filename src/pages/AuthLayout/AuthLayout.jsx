const AuthLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-2 h-screen ">
      <div className="flex flex-col gap-5 p-16 px-36 justify-center">
        {children}
      </div>

      <div className=" bg-no-repeat bg-cover bg-center bg-[url('/src/assets/WebsiteAssets/IllustrasiLogin.png')]"></div>
    </div>
  );
};

export default AuthLayout;
