import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const routes = [
  {
    name: "About us",
    href: "/about-us",
  },
  {
    name: "FAQs",
    href: "/faq",
  },
  {
    name: "Contact us",
    href: "/contact-us",
  },
];

const mobileRoutes = [
  {
    name: "About us",
    href: "/about-us",
  },
  {
    name: "FAQs",
    href: "/faq",
  },
  {
    name: "Contact us",
    href: "/contact-us",
  },
  {
    name: "Log in",
    href: "/login",
  },
  {
    name: "Sign Up",
    href: "/signup",
  },
];

const NavBar = ({ bgColor, backdropBlur }) => {
  const [dropNav, setDropNav] = useState(false);
  const [showActions, setShowActions] = useState(false);

  // Refs
  const viewRef = useRef();
  const dropdownRef = useRef();

  // Handle click outside of dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !viewRef.current.contains(event.target)
      ) {
        setShowActions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav
        style={{ background: bgColor, backdropFilter: backdropBlur }}
        className="fixed w-full z-20 top-0 left-0 border-b bg-[#ebeef5]"
      >
        <div className="max-w-[1100px] xl:max-w-[1300px] mx-auto p-2 flex justify-between px-6">
          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img src="../../lis-pendens-logo.svg" alt="LisPendens brand logo" />
          </Link>

          {/* LINKS (about, FAQs, Contact-US) */}
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto"
            id="navbar-sticky"
          >
            <ul className="p-2 md:p-0 mt-2 font-medium rounded-lg md:space-x-4 md:mt-0 md:border-0 hidden md:flex flex-row">
              {routes.map((route, index) => (
                <li key={index} className="block py-1 pl-2 pr-3">
                  <Link to={route.href}>{route.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ======= User Avatar ======*/}
          <div className="">
            <div className="relative hidden md:block" ref={dropdownRef}>
              <span
                onClick={() => {
                  setShowActions(!showActions);
                }}
                className="cursor-pointer rounded-[6px] flex py-1 gap-x-1 items-center w-fit text-[#989898]"
                ref={viewRef}
              >
                <div className="cursor-pointer">
                  <img
                    src="../../user-avatar.svg"
                    alt="user avatar pics"
                    width={48}
                    height={48}
                  />
                </div>
              </span>
              {showActions && (
                <div className="bg-white w-[120px] shadow-md rounded-lg text-sm border border-[#213f7d0f]  space-y-2 absolute z-[1] top-[50px] left-[-40px]">
                  <div className="flex items-center cursor-pointer hover:bg-gray-100 p-1">
                    <ul className="py-1 w-full ">
                      <li className="block w-full py-1 pl-1 pr-2 cursor-pointer hover:bg-slate-200">
                        <Link to="/signup" className="w-full block">
                          Sign Up
                        </Link>
                      </li>
                      <li className="block w-full py-1 pl-1 pr-2 hover:bg-slate-200">
                        <Link to="/login" className="w-full block">
                          Login
                        </Link>
                      </li>
                      <hr />
                      <li className="block w-full py-1 pl-1 pr-2 hover:bg-slate-200">
                        <Link to="/faq" className="w-full block">
                          Help Center
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="md:hidden">
              {!dropNav && (
                <HiMenu
                  className="text-lg transition"
                  size={32}
                  onClick={() => {
                    setDropNav(true);
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/*====== Mobile view ======*/}
        <section className="md:hidden text-black">
          <AnimatePresence>
            {dropNav && (
              <motion.div
                initial={{ x: "90vw" }}
                animate={{ x: 0 }}
                exit={{ x: "90vw" }}
                transition={{ type: "spring", duration: 3 }}
                className="fixed top-0 right-0 w-[80%] min-h-screen bg-white z-30"
              >
                <div className="flex justify-between p-3 pr-6">
                  <a href="#" className="flex items-center">
                    <img
                      src="../../user-avatar.svg"
                      alt="user avatar pics"
                      width={60}
                      height={60}
                    />
                  </a>
                  <HiX
                    className="text-lg transition mt-2"
                    size={32}
                    onClick={() => {
                      setDropNav(false);
                    }}
                  />
                </div>
                <ul className="flex flex-col p-2 font-medium rounded-lg space-y-2">
                  {mobileRoutes.map((route, index) => (
                    <li key={index} className="block py-1 pl-2 pr-3">
                      <Link to={route.href}>{route.name}</Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </nav>
    </>
  );
};

export default NavBar;
