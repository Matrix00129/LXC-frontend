import { useState } from "react";
import { TbLogout } from "react-icons/tb";
import { LogOutRequest } from "../../Services/AuthRequest/auth.request";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { SearchIcon } from "../../assets/SearchIcon";
import { GetSettingsRequest } from "../../Services/SuperAdminRequest/settings.request";
import { useQuery } from "@tanstack/react-query";

const DashboardNavBar = ({
  headings,
  subHeadings,
  subHeadingsTwo,
  setSearchFilter,
}) => {
  const [showActions, setShowActions] = useState(false);
  const navigate = useNavigate();

  const { auth } = useAuth();
  let email = auth?.email?.charAt(0)?.toUpperCase();
  // let photoUrl = auth?.photoUrl;
  // console.log(photoUrl, "this is photoUrl");

  // get token from useAuth
  const token = auth?.accessToken;

  // React Tanstack Query for data fetching logic
  const { data: settingsData } = useQuery({
    queryKey: ["getSettingsApi"],
    queryFn: () => GetSettingsRequest(token),
  });

  let photoUrl = settingsData?.data?.photoUrl;

  const handleLogout = async () => {
    await LogOutRequest();
    navigate("/login");
  };

  return (
    <>
      <div>
        <section>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[18px] md:text-[36px] font-medium">
                {" "}
                {headings}
              </h3>
              <p className="text-[8px] md:text-[12px]">{subHeadings}</p>
            </div>
            <div className="">
              <div className="flex items-center gap-2 md:gap-4">
                <div className="hidden md:block md:relative p-2  bg-white rounded-3xl cursor-pointer border-[1.5px] border-slate-300 w-1/2 lg:w-[300px]">
                  <input
                    type="text"
                    name="search"
                    placeholder="search"
                    className="outline-none focus:out-none ml-4 pl-4 w-[90%]"
                    onChange={(event) => setSearchFilter(event.target.value)}
                  />
                  <span className="absolute left-4 bottom-3 cursor-pointer">
                    <SearchIcon />
                  </span>
                </div>
                {/* <div>
                <img
                  src="../../notification-icon.svg"
                  alt="user avatar pics"
                  width={42}
                  height={42}
                />
              </div> */}
                <div className="flex justify-start">
                  <div
                    onClick={() => {
                      setShowActions(!showActions);
                    }}
                    className="relative cursor-pointer"
                  >
                    {auth?.role === "superadmin" ||
                    (auth?.role === "user" && !photoUrl) ||
                    auth?.role === "registrar" ? (
                      <div className="w-[50px] h-[50px] border-[1.3px] border-slate-200 items-center justify-center flex rounded-full text-[20px] bg-[#524A4C] text-white font-bold">
                        {email}
                      </div>
                    ) : (
                      <img
                        src={settingsData?.data?.photoUrl}
                        alt="user avatar pics"
                        width={42}
                        height={42}
                        className="w-[42px] h-[42px] border-[1.3px] border-slate-200 items-center justify-center flex rounded-full"
                      />
                    )}

                    {showActions && (
                      <div className="bg-white p-3 shadow-md rounded-lg text-sm border border-[#213f7d0f]  space-y-2 absolute right-[-1px] lg:right-[-18px] z-[1] top-[50px] hover:bg-gray-100">
                        <div
                          className="flex items-center gap-x-2 cursor-pointer"
                          onClick={() => {
                            setShowActions(false);
                            handleLogout();
                          }}
                        >
                          <TbLogout size={24} />
                          Logout
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-[8px] md:text-[12px]">{subHeadingsTwo}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DashboardNavBar;
