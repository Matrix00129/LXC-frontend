import NavBar from "../components/navbar/NavBar";
import Button from "../components/Common/Button";
import { Link } from "react-router-dom";
import { LearnMoreIcon } from "src/assets/LearnMoreIcon";
import { CircledTickIcon } from "src/assets/CircledTickIcon";
// import { useTypewriter } from "react-simple-typewriter";
// import { FaLocationDot } from "react-icons/fa6";
// import { FaPhone } from "react-icons/fa6";
// import { MdMail } from "react-icons/md";
import SearchButton from "src/components/landing-page/SearchButton";
import { Footer } from "../components/footer/Footer";
import { motion } from "framer-motion";
import { useState } from 'react'
import Joyride from 'react-joyride'

const LandingPage = () => {
  const [runTour] = useState(true)
  return (
    // ====== animated background image ======
    <div>
    <Joyride 
        steps={[
            {
            target: '.tour-0',
            content: 'This is the first tour step!',
            disableBeacon: false,
            },
            {
            target: '.tour-1',
            content: 'This is the second tour step!',
            disableBeacon: false,
            },
            {   
            target: '.tour-2',
            content: 'This is the third tour step!',
            disableBeacon: false,
            },
            {
            target: '.tour-3',
            content: 'This is the fourth tour step!',
            disableBeacon: false,
            },
            {
            target: '.tour-4',
            content: 'This is the fifth tour step!',
            disableBeacon: false,
            },
            {
            target: '.tour-5',
            content: 'This is the sixth tour step!',
            disableBeacon: false,
            },
            {
            target: '.tour-6',
            content: 'This is the seventh tour step!',
            disableBeacon: false,
            },
            {
            target: '.tour-7',
            content: 'This is the eighth tour step!',
            disableBeacon: false,
            },
        ]}
        continuous={true}
        run={runTour}
        showProgress={true}
        showSkipButton={true}
        styles={{
            options: {
            zIndex: 10000,
            },
        }}
    />

      <div
        id="home-page-container"
        // className="h-screen overflow-y-hidden bg-[url(/animation-bg-6.png)] bg-no-repeat bg-contain bg-right "
        // style={{ backgroundPosition: "right  -30% top" }}
      >
        <div className="max-w-[1100px] bg-red-80 mx-auto h-full flex flex-col">
          {/* ======Navbar component========= */}
          <section>
            <NavBar bgColor="none" backdropBlur="blur(10px)" />
          </section>

          {/* ====== MainContent goes here ..... =========== */}
          <section className="pt-20 sm:pt-32 flex flex-col items-center h-full px-[10px] md:px-[20px] font-Avenir">
            {/* <div className="flex flex-col items-center">
              <div className="mx-auto max-w-[280px] sm:max-w-[580px] md:max-w-[758px]">
                <h1 className="text-center font-bold text-[1.2rem] sm:text-lg md:text-xl lg:text-2xl xl:text-[52px] whitespace-pre-line md:leading-10">
                  Simplify your knowledge{"\n\n"}on your next property.
                </h1>
              </div>

              <p className="font-medium text-center mt-[1.15rem] mb-[1.4rem] sm:mt-[2.13rem] sm:mb-[2.44rem] text-[#000000] text-[0.55rem] sm:text-[0.8575rem] md:text-[1.0625rem]">
                Find out if a property is subject to litigation
              </p>
              <Link to="/search-page">
                <Button>Search property</Button>
              </Link>
            </div>
            <div className="mt-10 sm:mt-16 md:mt-36 p-4">
              <p className="text-center font-medium text-[0.9rem] text-[#000000] leading-[0.9rem] sm:text-[1.4rem] sm:leading-[1.4rem] md:text-[1.75rem] md:leading-[1.75rem]">
                Your guts can’t stop telling the truth
              </p>
              <p className="font-medium text-center sm:mt-2 md:mt-4 leading-[1.75rem] sm:mb-4 text-[#000000] text-[0.55rem] sm:text-[0.8575rem] md:text-[1.0625rem]">
                <span className="bg-[#D6D6D691] rounded-l-[0.2rem] md:rounded-l-[0.3rem] p-[0.1rem]">
                  So why does your{" "}
                </span>
                <span className="relative left-[-0.1rem] bg-[#F1D2C2] rounded-[0.2rem] md:rounded-[0.3rem] p-[0.1rem]">
                  decision not add up
                </span>{" "}
                ?
              </p>
            </div> */}

            {/* ====== Updated langing page ====== */}
            {/* ====== section 1 ====== */}
            <div className="w-full relative">
              {/* ====== Search card ====== */}

              <motion.div
                initial={{ x: "-100vw" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", duration: 5, delay: 0 }}
                className="tour-0 bg-white/[0.6] w-[100%] sm:w-[75%] max-w-[45.375rem] mx-auto sm:mx-0 p-[1rem] rounded-lg sm:rounded-[1.125rem] sm:absolute z-10 sm:top-[1.938rem]"
              >
                <h1 className="whitespace-pre-line font-extrabold text-[1rem] sm:text-[1.75rem] md:text-[2.375rem]">
                  Ensure your property{"\n"}is litigation-free.
                </h1>
                <p className="border-l-2 border-[#000] pl-[0.4rem] sm:pl-[0.625rem] py-[0.4rem] sm:py-[0.625rem] font-normal text-[0.65rem] sm:text-[1.25rem] mt-[0.75rem] sm:mt-[1.125rem] mb-[2rem] sm:mb-[3.9rem]">
                  Get an official Search Report.
                </p>
                <Link to="/search-page">
                  {/* <Button>Search property</Button> */}
                  <SearchButton />
                </Link>
              </motion.div>
              {/* </motion.div> */}

              {/* ====== Hero image ====== */}
              <motion.div
                initial={{ x: "100vw" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", duration: 5, delay: 0 }}
                className="my-6 sm:my-0 flex justify-center sm:justify-end"
              >
                {/* <img
                                    src="../../home-hero-img.png"
                                    alt="Home hero image"
                                    className="h-[11.5rem] sm:h-[26rem] md:h-[32.625rem] w-[10rem] sm:w-[19rem] md:w-[31.25rem] rounded-lg sm:rounded-2xl object-cover"
                                /> */}
                <video
                  autoPlay
                  playsInline
                  loop
                  muted
                  className="h-[11.5rem] sm:h-[26rem] md:h-[32.625rem] w-[10rem] sm:w-[19rem] md:w-[31.25rem] rounded-lg sm:rounded-2xl object-cover"
                >
                  <source src="..\..\home-hero-video.mp4" type="video/mp4" />
                </video>
              </motion.div>

              <motion.div
                initial={{ x: "-100vw" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", duration: 5, delay: 0 }}
                className="sm:absolute sm:bottom-[-4%] md:bottom-[-6.5%]"
              >
                <div className="flex">
                  <motion.div
                    initial={{ y: "100vw" }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", duration: 5, delay: 0 }}
                    className="h-[3rem] sm:h-[3.5rem] w-[3rem] sm:w-[3.5rem] mr-[0.55rem]"
                  >
                    <img
                      className="h-[2rem] sm:h-[2.3rem] md:h-[2.5rem] w-[2rem] sm:w-[2.3rem] md:w-[2.5rem] rounded-full object-cover"
                      src="../../home-avatar-img-3.jpg"
                      alt="user review avatar"
                    />
                  </motion.div>
                  <div className="tour-1 sm:max-w-[66%]">
                    <p className="whitespace-pre-line sm:w-full font-light text-[0.8rem] sm:text-[0.9rem] md:text-[1.25rem] max-w-[65%]">
                      &quot;The best part about using Lis Pendens is that it is
                      an unbiased platform focused on providing the right,
                      up-to-date information on a property&lsquo;s legal
                      status.&quot;
                    </p>
                    <p className="font-extrabold text-[0.8rem] sm:text-[0.9rem] md:text-[1.25rem]">
                      Hon. Justice Yusuf Anka
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ====== section 2 ====== */}
            <div className="w-full flex flex-col justify-center mt-[5rem] sm:mt-[10rem] md:mt-[13.688rem] mb-[4rem] sm:mb-[7rem] md:mb-[9.563rem]">
              <motion.p
                initial={{ x: "100vw" }}
                animate={{ x: 0 }}
                whileInView="reveal"
                transition={{ type: "spring", duration: 5, delay: 0 }}
                className="tour-2 sm:whitespace-pre-line text-center font-extrabold text-[1rem] sm:text-[1.23rem] md:text-[2rem]"
              >
                e-Lis Pendens is a simple and convenient way to access{"\n"}
                the information of any lawsuit-encumbered property.
              </motion.p>

              <Link to="/about-us">
                <button className="tour-3 flex items-center justify-center w-full mt-[0.7rem] sm:mt-[1rem] md:mt-[1.375rem] font-medium text-[0.95rem] sm:text-[1.2rem] md:text-[1.75rem] gap-[0.7rem] sm:gap-[0.85rem] md:gap-[1.063rem]">
                  Learn more about us
                  <LearnMoreIcon size={14} />
                </button>
              </Link>

              <div>
                <img
                  src="../../home-img-12.jpg"
                  alt="Home page image-2"
                  className="w-full h-[6rem] sm:h-[10rem] md:h-[18.375rem] rounded-[0.5rem] sm:rounded-[0.75rem] md:rounded-[1rem] mt-[2.5rem] sm:mt-[3.75rem] md:mt-[5.938rem] object-cover"
                />
              </div>

              <div className="flex w-full justify-around mt-[1.7rem] sm:mt-[2.3rem] md:mt-[3.125rem]">
                <div className="flex items-center">
                  <CircledTickIcon size={8} />
                  <p className="tour-4 font-medium text-[0.75rem] sm:text-[1rem] md:text-[1.25rem] ml-1 sm:ml-[0.938rem]">
                    Safe & Secured
                  </p>
                </div>

                <div className="tour-5 flex items-center">
                  <CircledTickIcon size={8} />
                  <p className="tour-5 font-medium text-[0.75rem] sm:text-[1rem] md:text-[1.25rem] ml-1 sm:ml-[0.938rem]">
                    Timely & Efficient
                  </p>
                </div>

                <div className="flex items-center">
                  <CircledTickIcon size={8} />
                  <p className="tour-6 font-medium text-[0.75rem] sm:text-[1rem] md:text-[1.25rem] ml-1 sm:ml-[0.938rem]">
                    Accurate & Reliable
                  </p>
                </div>
              </div>
            </div>

            {/* ====== section 3 ====== */}
            {/* <div className="mb-4">
              {typeEffect}
            </div> */}
            <div className="relative w-full mb-[4rem] sm:mb-[6rem] md:mb-[10.313rem]">
              {/* Contact card */}
              <div>
                <motion.div
                  initial={{ x: "-100vw" }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", duration: 5, delay: 0 }}
                  className="bg-white/[0.6] w-[100%] sm:w-[60%] max-w-[33.688rem] mx-auto sm:mx-0 p-[1rem] sm:p-[1.5rem] md:p-[1.875rem] mb-[2rem] sm:mb-0 rounded-[0.7rem] sm:rounded-[1.125rem] sm:absolute z-[90]  sm:top-[1.75rem]"
                >
                  <p className="font-extrabold text-[0.9rem] sm:text-[1.2rem] md:text-[1.5rem] mb-[1.5rem] sm:mb-[2.2rem] md:mb-[2.875rem] sm:max-w-[85%] md:max-w-[90%]">
                    e-Lis Pendens is powered by a reliable and updated database
                    that collects and verifies information from various sources.
                  </p>
                  <Link to="/contact-us">
                    <Button>Contact us</Button>
                  </Link>
                </motion.div>
              </div>

              <div className="sm:flex sm:justify-end">
                <motion.img
                  initial={{ x: "100vw" }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", duration: 5, delay: 0 }}
                  src="../../home-img-3.png"
                  alt="Home page image-3"
                  className="rounded-[0.7rem] sm:rounded-[1.125rem] w-[100%] sm:w-[30rem] md:w-[45.063rem] sm:h-[20rem] md:h-[24.438rem] sm:justify-self-end object-cover"
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-[0.6rem] sm:gap-[1.8rem] md:gap-[2.625rem] py-[1rem] sm:py-[1.75rem] md:py-[2.75rem]">
        <p className="text-center font-medium text-[0.8rem] sm:text-[1.15rem] md:text-[1.625rem]">
          For further enquires and more informations
        </p>
        <Link to="/faq">
          <button className="bg-[#000] text-[#FFF] font-medium text-[0.8rem] sm:text-[0.9rem] md:text-[1.063rem] w-[5rem] sm:w-[6rem] md:w-[7.875rem] h-[1.75rem] sm:h-[2.35rem] md:h-[2.5rem] border-none rounded-[0.7rem] sm:rounded-[0.9rem] md:rounded-[1rem]">
            FAQ
          </button>
        </Link>
      </div>

      {/* ====== Footer ====== */}

      <Footer />
      {/* <footer className="bg-[#000] flex justify-center items-center flex-col sm:items-start gap-[1rem] sm:gap-[1.5rem] md:gap-[2.625rem] sm:justify-start sm:pl-[4rem] md:pl-[5.938rem] sm:py-[2.5rem] md:py-[3.438rem] p-[1rem]"> */}
      {/* <div className="flex justify-center items-center sm:items-start gap-[2rem] sm:gap-[3rem] md:gap-[5.625rem] sm:justify-start">
          <Link to="/">
            <div>
              <img
                src="../../lis-pendens-logo-white.svg"
                alt=""
                className="w-[6rem] sm:w-[8rem] md:w-[10rem]"
              />
            </div>
          </Link>
          <div className="flex flex-col gap-[0.3rem] sm:gap-[0.65rem] md:gap-[0.875rem]">
            <Link to="/about-us">
              <button className="text-[#FFF] font-medium text-[0.8rem] sm:text-[1rem] md:text-[1.25rem]">
                About us
              </button>
            </Link>
            <Link to="/faq">
              <button className="text-[#FFF] font-medium text-[0.8rem] sm:text-[1rem] md:text-[1.25rem]">
                FAQs
              </button>
            </Link>
            <Link to="/contact-us">
              <button className="text-[#FFF] font-medium text-[0.8rem] sm:text-[1rem] md:text-[1.25rem]">
                Contact us
              </button>
            </Link>
          </div>
        </div> */}

      {/* ====== Contact details ====== */}
      {/* <div className="block flex flex-col text-white gap-[0.3rem] sm:gap-[0.65rem] font-medium text-[0.8rem] sm:text-[1rem] md:text-[1.25rem]">
          <div className="flex gap-2 sm:gap-4 items-center">
            <FaLocationDot size={20} />
            <p>Alausa, Ikeja, Lagos state.</p>
          </div>
          <div className="flex gap-2 sm:gap-4 items-center">
            <FaPhone size={20} />
            <p>+234 80 1234 5678</p>
          </div>
          <div className="flex gap-2 sm:gap-4 items-center">
            <MdMail size={20} />
            <p>info@elispendens.com</p>
          </div>
        </div> */}
      {/* </footer> */}
    </div>
  );
};

export default LandingPage;
