import { twMerge } from "tailwind-merge";
import SuperAdminSideBar from "src/components/super-admin/SuperAdminSideBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";

const SuperAdminLayout = () => {
  const [dropNav, setDropNav] = useState(false);

  return (
    <>
      <div className="w-full relative flex bg-gray-50">
        {/* =====SIDEBAR ======= */}
        <section
          className={`${!dropNav ? "absolute" : ""} z-30 absolute xl:fixed`}
        >
          <SuperAdminSideBar dropNav={dropNav} setDropNav={setDropNav} />
        </section>
        {/* ===== Main content ====== */}
        <section
          className={twMerge(
            "w-full bg-[#E5E5E5]/10  lg:mt-10 rounded-lg p-2  max-w-[1150px] px-4 lg:pl-20 lg:pr-16 mx-auto xl:max-w-full xl:overflow-x-auto 2xl:mx-0"
          )}
        >
          <div className="xl:hidden flex items-center justify-between py-3 pb-6">
            <a href="/admin/dashboard" className="font-bold text-[24px]">
              <img src="../../lis-pendens-logo.svg" alt="LisPendens brand logo" />
            </a>
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

export default SuperAdminLayout;
