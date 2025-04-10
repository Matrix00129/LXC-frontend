import { twMerge } from "tailwind-merge";
import { Outlet } from "react-router-dom";
import UserSideBar from "src/components/user/UserSideBar";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";

const UserLayout = () => {
  const [dropNav, setDropNav] = useState(false);
  return (
    <>
      <div className="w-full relative flex bg-gray-50">
        {/* =====UserSideBar ======= */}
        <section className={`${!dropNav ? "absolute" : ""} z-30 absolute xl:fixed`}>
          <UserSideBar dropNav={dropNav} setDropNav={setDropNav} />
        </section>
        {/* ===== Main content ====== */}
        <section
          className={twMerge(
            "w-full bg-[#E5E5E5]/10  rounded-lg p-2 lg:mt-10 max-w-[1150px] px-4 lg:pl-20 lg:pr-16 mx-auto xl:max-w-full xl:overflow-x-auto 2xl:mx-0 "
          )}
        >
          <div className="xl:hidden flex items-center justify-between py-3 pb-6">
            <Link to = "/">
              <img src="../../lis-pendens-logo.svg" alt="LisPendens brand logo" className="text-black object-cover" />
            </Link> 
            {!dropNav && (
              <HiMenu
                className="text-2xl transition"
                onClick={() => {
                  setDropNav(true);
                }}
              />
            )}
          </div>
          <div className="xl:ml-[200px] h-screen">
            <Outlet />
          </div>
        </section>
      </div>
    </>
  );
};

export default UserLayout;
