import NavBar from "src/components/navbar/NavBar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer } from "../components/footer/Footer";

const AboutUs = () => {
  return (
    <div id="about-us-page">
      <div className="max-w-[1100px] px-4 mx-auto">
        {/* ======Navbar component========= */}
        <section>
          <NavBar bgColor="none" backdropBlur="blur(10px)" />
        </section>
        {/* ====== MainContent goes here ..... =========== */}
        <section className="pt-20 md:pt-32 font-Avenir">
          {/* ====== hero image ====== */}
          <motion.div
            initial={{ x: "-50vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", duration: 5, delay: 0 }}
            className="h-[4rem] sm:h-[6.5rem] md:h-[9.125rem] w-full bg-[#C4C4C4] rounded-[0.4rem] sm:rounded-[0.75rem] md:rounded-[1.125rem] overflow-hidden"
          >
            <img
              src="../../about-us-hero-img.png"
              alt="About page hero image"
              className="w-full object-cover h-[100%]"
            />
          </motion.div>

          <motion.div
            initial={{ x: "50vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", duration: 5, delay: 0 }}
          >
            {/* ====== Tiltle ====== */}
            <h1 className="my-[1.7rem] sm:my-[2.2rem] md:my-[2.75rem] font-extrabold text-[1.3rem] sm:text-[1.5rem] md:text-[2.125rem] font-Avenir">
              About us
            </h1>

            {/* ====== Body ====== */}
            <section className="w-full">
              <p className="font-medium text-[0.7rem] sm:text-[0.85rem] md:text-[1.125rem]">
                e-Lis Pendens is a platform that helps you find out if a
                property you are interested in has any encumbrance or ongoing
                lawsuit on it. Encumbrance is any legal claim or restriction
                that affects the title or ownership of a property. A lawsuit is
                a legal action that involves a dispute between two or more
                parties over a property, such as foreclosure, partition, or
                boundary disputes.
              </p>

              {/* ====== The why ====== */}
              <p className="font-black text-[0.7rem] sm:text-[0.85rem] md:text-[1.125rem] my-3 sm:my-4 md:my-6">
                Why do you need e-Lis Pendens?
              </p>
              <p className="font-medium text-[0.7rem] sm:text-[0.85rem] md:text-[1.125rem]">
                Buying or selling a property is a major decision that involves a
                lot of money and risk. You want to make sure that the property
                you are dealing with has a clear and marketable title, meaning
                that there are no encumbrances or lawsuits that could affect
                your rights or interests. If you buy a property without knowing
                its legal status, you could end up losing your investment or
                facing legal troubles. If you sell a property without disclosing
                its legal status, you could face lawsuits or penalties from the
                buyer or the authorities.
              </p>

              {/* ====== The how ====== */}
              <p className="font-black text-[0.7rem] sm:text-[0.85rem] md:text-[1.125rem] my-3 sm:my-4 md:my-6">
                How does e-Lis Pendens work?
              </p>
              <p className="font-medium text-[0.7rem] sm:text-[0.85rem] md:text-[1.125rem]">
                e-Lis Pendens is a simple and convenient way to access the
                information of any lawsuit-encumbered property. All you need to
                do is enter the address or the survey number of the property you
                are interested in, and we will provide you with a comprehensive
                report that includes:
              </p>
              <ul className="font-black text-[0.7rem] sm:text-[0.85rem] md:text-[1.125rem] my-3 sm:my-4 md:my-6">
                <li>
                  The encumbrances and the lawsuits that affect the property,
                  along with their details and status
                </li>
              </ul>
              <p className="font-medium text-[0.7rem] sm:text-[0.85rem] md:text-[1.125rem]">
                e-Lis Pendens is powered by a reliable and updated database that
                collects and verifies information from various sources, such as
                the courts and the land registry.
              </p>

              {/* ====== Who we are ====== */}
              <p className="font-black text-[0.7rem] sm:text-[0.85rem] md:text-[1.125rem] my-3 sm:my-4 md:my-6">
                Who are we?
              </p>
              <p className="font-medium text-[0.7rem] sm:text-[0.85rem] md:text-[1.125rem] mb-2">
                e-Lis Pendens is supported by a team of professionals passionate
                about real estate and technology. We created e-Lis Pendens to
                provide a valuable service to the people across the nation, who
                deserve to have access to accurate and transparent information
                about the properties they are interested in. e-Lis Pendens can
                help you make informed and confident decisions about your
                property transactions.
              </p>
            </section>

            {/* ====== contact button ====== */}
            <Link to="/contact-us">
              <button className="bg-[#000000] hover:bg-[#000000]/90 text-[#FFF] w-[7rem] sm:w-[8.5rem] md:w-[10.938rem] h-[2rem] sm:h-[2.3rem] md:h-[2.813rem] border-none rounded-[0.7rem] sm:rounded-[0.85rem] md:rounded-2xl my-[2rem] sm:my-[3rem] md:my-[4.125rem] text-[0.8rem] sm:text-[0.85rem] md:text-[0.95rem]">
                Contact us
              </button>
            </Link>
          </motion.div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
