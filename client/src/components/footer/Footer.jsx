import { RiFacebookCircleFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";

export const Footer = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  return (
    <>
      <div className="bg-[#000000]">
        <div className="bg-[#000000] px-6 md:px-2  text-white py-10  lg:px-10  max-w-[1400px] mx-auto">
          <section className="mb-2 md:flex justify-between pb-10 md:mb-20">
            <div className="">
              <div className="h-[100px]  md:mx-10">
                <Link
                  to="/"
                  className="my-auto cursor-pointer text-[20px] font-bold"
                >
                  <img
                    src="../../../lis-pendens-logo-white.png"
                    alt="LisPendens brand logo"
                    width="200"
                    height="200"
                    className="w-[120px] h-[36px] md:w-[150px] md:h-[40px]"
                  />
                </Link>
              </div>
            </div>
            <div className="text-[20px]  md:flex md:justify-between  md:w-2/3 lg:w-1/2">
              <div>
                <p className="font-bold mb-4"> Quick Links</p>
                <ul className="cursor-pointer font-light text-md">
                  <li>Home </li>
                  <li> About us </li>
                  <li> FAQs </li>
                </ul>
              </div>
              <div className="my-10 md:my-0">
                <p className="font-bold mb-4">Customer Care</p>
                <ul className="cursor-pointer font-light text-md">
                  <li>Newsletter </li>
                  <li>Support</li>
                  <li>Resources</li>
                </ul>
              </div>
              <div>
                <p className="font-bold mb-4 text-[20px]"> Address</p>
                <ul className="cursor-pointer font-light text-md">
                  <li>Alausa, Ikeja, Lagos state. </li>
                  <li>+234 80 1234 5678 </li>
                  <li>info@elispendens.com</li>
                </ul>
              </div>
            </div>
          </section>
          <section>
            <div className="cursor-pointer lg:flex justify-between items-center border-t-[.23px] border-white pt-8 ">
              <div className="flex px-6">
                <span className="w-[40px] h-[40px]  rounded-full border-2 border-white flex items-center justify-center mx-2">
                  <FaTwitter size={20} />
                </span>
                <span className="w-[40px] h-[40px]  rounded-full border-2 border-white flex items-center justify-center">
                  <FaLinkedinIn size={20} />
                </span>
                <span className="w-[40px] h-[40px]  rounded-full border-2 border-white flex items-center justify-center mx-2">
                  <RiFacebookCircleFill size={20} />
                </span>
                <span className="w-[40px] h-[40px]  rounded-full border-2 border-white flex items-center justify-center ">
                  <BsInstagram size={20} />
                </span>
                <span className="w-[40px] h-[40px]  rounded-full border-2 border-white flex items-center justify-center mx-2">
                  <BsYoutube size={20} />
                </span>
              </div>
              <div className="mt-6 lg:flex gap-2 md:px-10 ">
                <div className="flex gap-4">
                  <p>Privacy</p>
                  <p>Terms</p>
                  <p>Cookies</p>
                </div>
                <p className="font-bold mt-4 lg:ml-8 lg:mt-0">
                  Copyright © {currentYear}, lis-pendens Inc.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
