import { Link, useLocation } from "react-router-dom";
import { userNavigation } from "src/utils/LinkData";
import { HiX } from "react-icons/hi";
import { LogoutIcon } from "src/assets/LogoutIcon";
import { LogOutRequest } from "../../Services/AuthRequest/auth.request";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

const UserSideBar = ({ setDropNav, dropNav }) => {
  const location = useLocation();
  const pathnameUrl = location.pathname;
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await LogOutRequest();
      await logout();
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      {/* ====== Sidebar for larger screens ====== */}
      <div className="hidden xl:block bg-[#EBE8EB] shadow-lg w-60 min-h-screen h-full py-2 pt-8 overflow-hidden">
        <section className="fixed left-0 w-60 h-screen">
          {userNavigation?.map((item, index) => (
            <div
              key={index}
              className="mt-[20px] flex flex-col items-start text-[#4F4F4F] text-sm w-full"
            >
              <section className="flex group hover:bg-[#D5D5D5]/10 w-full">
                <Link
                  to={`${item.href}`}
                  className={`${
                    pathnameUrl === item.href
                      ? "border-[#221F1D] border-[1.5px] rounded-2xl bg-[#D5D5D5] text-[#221F1D]"
                      : ""
                  } flex items-center gap-4 group-hover:cursor-pointer w-[180px] rounded-2xl px-4 py-2 mx-auto`}
                >
                  <span>
                    <item.icon
                      size={20}
                      className="h-6 w-6 group-hover:cursor-pointer"
                    />
                  </span>
                  <p
                    className={`${
                      pathnameUrl === item.href ? "text-[#221F1D]" : ""
                    } text-[#707070] text-sm group-hover:cursor-pointer`}
                  >
                    {item.name}
                  </p>
                </Link>
              </section>
            </div>
          ))}
          <div>
            <button
              className="bg-[#524A4C] text-[#FFF] absolute bottom-[3.375rem] left-[15%] border border-[#DBA7FE] py-[0.813rem] px-[2rem] rounded-[1.3rem] font-bold text-[0.938rem] flex items-center"
              onClick={handleLogout}
            >
              <LogoutIcon />
              Log out
            </button>
          </div>
        </section>
      </div>
      {/* ===== Sidebar for Mobile screens ====== */}
      <AnimatePresence>
        {dropNav && (
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            exit={{ x: "-100vw" }}
            transition={{ type: "spring", duration: 3 }}
            className="fixed z-30 bg-[#EBE8EB] xl:hidden shadow-lg w-60 min-h-screen h-full py-2 pt-8 overflow-hidden"
          >
            <section className="fixed left-0 w-60 h-screen">
              <div className="flex items-center text-center ml-auto mr-6 w-8 h-8 border-2 border-white rounded-full">
                <HiX
                  className="text-2xl transition text-white mx-auto"
                  onClick={() => {
                    setDropNav(false);
                  }}
                />
              </div>
              {userNavigation?.map((item, index) => (
                <div
                  key={index}
                  className="mt-[20px] flex flex-col items-start text-[#4F4F4F] text-sm w-full"
                >
                  <section className="flex group hover:bg-[#D5D5D5]/10 w-full">
                    <Link
                      to={`${item.href}`}
                      onClick={() => {
                        setDropNav(false);
                      }}
                      className={`${
                        pathnameUrl === item.href
                          ? "border-[#221F1D] border-[1.5px] rounded-2xl bg-[#D5D5D5] text-[#221F1D]"
                          : ""
                      } flex items-center gap-4 group-hover:cursor-pointer w-[180px] rounded-2xl px-4 py-2 mx-auto`}
                    >
                      <span>
                        <item.icon
                          size={20}
                          className="h-6 w-6 group-hover:cursor-pointer"
                        />
                      </span>
                      <p
                        className={`${
                          pathnameUrl === item.href ? "text-[#221F1D]" : ""
                        } text-[#707070] text-sm group-hover:cursor-pointer`}
                      >
                        {item.name}
                      </p>
                    </Link>
                  </section>
                </div>
              ))}
              <div>
                <button
                  className="bg-[#524A4C] text-[#FFF] absolute bottom-[3.375rem] left-[15%] border border-[#DBA7FE] py-[0.813rem] px-[2rem] rounded-[1.3rem] font-bold text-[0.938rem] flex items-center"
                  onClick={handleLogout}
                >
                  <LogoutIcon />
                  Log out
                </button>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserSideBar;
