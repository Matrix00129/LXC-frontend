import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";

const SignUp = () => {
  return (
    <div className="h-screen bg-[url(/src/assets/auth-bg.png)] bg-no-repeat bg-cover">
      <Link to="/" className="flex items-center pt-6 pl-4">
        <img
          src="../lis-pendens-logo-white.png"
          alt="LisPendens brand logo"
          className="text-white object-cover"
        />
      </Link>
      <div className="max-w-[540px] w-full mx-auto mt-10 lg:mt-32">
        <section className="flex flex-col items-center justify-center py-4 m-2 px-4 md:m-6 md:px-12 bg-white rounded-[30px]">
          <div className="flex items-center mt-4">
            <BiUser className="text-4xl text-black mr-2" />
          </div>

          <div className="mb-4 flex items-center">
            <p className="text-2xl font-bold text-black">Sign Up</p>
          </div>

          <p className="mt-4 mb-2 text-lg text-black">
            Create an account as a/an
          </p>

          <Link
            to="/signup-individual"
            className="w-full mt-4 p-3 text-center bg-[#524A4C] rounded-2xl text-white border-1 border-[#A1A1A1] cursor-pointer transition duration-700 ease-in-out hover:bg-white hover:text-[#E37C42] hover:border-[#E37C42] border-[1.3px]"
          >
            <p>Individual</p>
          </Link>

          <Link
            to="/signup-company"
            className="w-full mt-4 mb-4 p-3 text-center bg-[#D9D9D9] rounded-2xl text-black border-1 border-[#A1A1A1] cursor-pointer transition duration-700 ease-in-out hover:bg-white hover:text-[#E37C42] hover:border-[#E37C42] border-[1.3px]"
          >
            <p>Company</p>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default SignUp;
