import { Link, useLocation } from "react-router-dom";
import { courtRegistrarNavigation } from "src/utils/LinkData";
import { TbLogout } from "react-icons/tb";
import { HiX } from "react-icons/hi";
import { LogOutRequest } from "../../Services/AuthRequest/auth.request";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

const CourtRegistrarSideBar = ({ setDropNav, dropNav }) => {
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
      <div className="hidden xl:block bg-[#EBE8EB] shadow-lg w-60 min-h-screen h-full py-2 pt-8">
        <section className="fixed left-0 w-60">
          {courtRegistrarNavigation?.map((item, index) => (
            <div
              key={index}
              className="mt-[20px] flex flex-col items-start text-[#4F4F4F] text-sm w-full"
            >
              <section className="flex group hover:bg-[#D5D5D5]/30 w-full">
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
                    } text-[#4F4F4F] text-sm group-hover:cursor-pointer`}
                  >
                    {item.name}
                  </p>
                </Link>
              </section>
            </div>
          ))}
          <section className="border-t-[1.3px] border-slate-300 pt-20 px-6 mt-10">
            <div
              className="bg-[#524A4C] text-white flex items-center justify-center gap-4 p-4 rounded-2xl cursor-pointer"
              onClick={handleLogout}
            >
              <TbLogout size={24} />
              <p>Log out</p>
            </div>
          </section>
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
            className="fixed z-30 bg-[#EBE8EB] xl:hidden shadow-lg w-60 min-h-screen h-full py-2 pt-8"
          >
            <section className="fixed left-0 w-60">
              <div className="flex items-center text-center ml-auto mr-6 w-8 h-8 border-2 border-slate-400 rounded-full">
                <HiX
                  className="text-2xl transition text-slate-400 mx-auto"
                  onClick={() => {
                    setDropNav(false);
                  }}
                />
              </div>
              {courtRegistrarNavigation?.map((item, index) => (
                <div
                  key={index}
                  className="mt-[20px] flex flex-col items-start text-[#4F4F4F] text-sm w-full"
                >
                  <section className="flex group hover:bg-[#D5D5D5]/30 w-full">
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
                        } text-[#4F4F4F] text-sm group-hover:cursor-pointer`}
                      >
                        {item.name}
                      </p>
                    </Link>
                  </section>
                </div>
              ))}
              <section className="border-t-[1.3px] border-slate-300 pt-20 px-6 mt-10">
                <div
                  className="bg-[#524A4C] text-white flex items-center justify-center gap-4 p-4 rounded-2xl cursor-pointer"
                  onClick={handleLogout}
                >
                  <TbLogout size={24} />
                  <p>Log out</p>
                </div>
              </section>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CourtRegistrarSideBar;
