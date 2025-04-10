import { IoLocationSharp } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";

import Map from "../components/map/Map";
import Form from "../components/map/Form";
import NavBar from "../components/navbar/NavBar";
import { ToastContainer } from "react-toastify";
import { Footer } from "../components/footer/Footer";

const ContactUsTwo = () => {
  return (
    <>
      <div
        id="contact-page"
        className="bg-[url(/src/assets/auth-bg.png)]* bg-no-repeat* bg-cover*"
      >
        {/* ======Navbar component========= */}
        <section>
          <NavBar bgColor="none" backdropBlur="blur(10px)" />
        </section>
        <div className=" items-center justify-center md:h-[650px] md:px-8">
          <div className="">
            <div className="py-20 pb-0 md:pt-32 lg:pb-10">
              <h2 className="mt-3 text-3xl lg:text-5xl w-full text-center font-bold md:max-w-2x">
                Contact Us
              </h2>
            </div>

            <h5 className=" mx-4 text-xl lg:text-3xl font-bold  max-w-[1024px] md:flex md:mx-auto lg:max-w-[1200px] my-6 lg:my-8 lg:mb-12">
              Loremem dlso
            </h5>
            <div className="px-4 md:flex justify-between mx-auto lg:max-w-[1200px] md:px-0">
              <div className="w-full md:w-1/2">
                <div className="hover:bg-[#FBFBF5] border-2 border-[#FBFBF5] cursor-pointer text-center md:h-[200px] flex items-center justify-center shadow-md bg-white">
                  <div>
                    <div className="pt-4 flex items-center justify-center text-[#3C3E6A]">
                      <IoLocationSharp size={28} color="red" />
                    </div>
                    <div className="my-4">Our Location</div>
                    <p className="px-8 pb-8">Alausa, Ikeja, Lagos state.</p>
                  </div>
                </div>
              </div>
              <div className="mx-0 my-4 w-full md:w-1/2 md:mx-4 md:my-0">
                <div className="hover:bg-[#FBFBF5] border-2 border-[#FBFBF5] cursor-pointer text-center md:h-[200px] flex items-center justify-center shadow-md bg-white">
                  <div>
                    <div className="pt-4 flex items-center justify-center text-[#3C3E6A]">
                      <FiPhoneCall size={28} color="red"/>
                    </div>
                    <div className="my-4">Call Us</div>
                    <p className="px-8 pb-8">+234 80 1234 5678</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="hover:bg-[#FBFBF5] border-2 border-[#FBFBF5] cursor-pointer text-center md:h-[200px] flex items-center justify-center shadow-md bg-white">
                  <div>
                    <div className="pt-4 flex items-center justify-center text-[#3C3E6A]">
                      <HiOutlineMail size={28} color="red" />
                    </div>
                    <div className="my-4">Email Us</div>
                    <p className="px-8 pb-8">info@elispendens.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-24 mt-20 md:mt-0 md:px-8">
          <div className="max-w-[1024px] md:mx-auto lg:max-w-[1200px] ">
            <h5 className="text-center text-3xl font-bold pt-">Get in Touch</h5>
            <p className="text-center pb-4 md:pt-2 md:pb-16 text-gray-700 font-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </p>

            <div className="max-w-[1024px] space-y-10 md:space-y-0 md:flex mx-auto lg:max-w-[1200px]">
              <div className="w-full p-4  md:w-1/2 mr-4 bg-[#F7F8FA] md:px-8 rounded-md">
                <Form />
              </div>
              <div className="w-full h-[609.5px]  md:w-1/2 rounded-md">
                <Map />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
      <ToastContainer />
    </>
  );
};

export default ContactUsTwo;
