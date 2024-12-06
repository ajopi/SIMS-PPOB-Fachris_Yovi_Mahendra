import { Link } from "react-router";

const Homepage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between px-8 p-2 border border-gray-300">
        <div className="flex items-center gap-1">
          <img alt="logo" src="/src/assets/WebsiteAssets/Logo.png" />
          <span className="text-xl font-normal">SIMS PPOB</span>
        </div>

        <div className="flex items-center gap-6">
          <Link>Top Up</Link>
          <Link>Transaction</Link>
          <Link>Account</Link>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="flex">section1</div>
        <div>section2 </div>
      </div>
      <div>homepage</div>
      <div>homepage</div>
    </div>
  );
};

export default Homepage;
