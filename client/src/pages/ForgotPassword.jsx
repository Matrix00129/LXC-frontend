import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import { ForgotPasswordRequest } from "../Services/AuthRequest/auth.request";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email(" Invalid Email format"),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // React Hook form logic
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Submit handler for the form
  const onSubmitHandler = async (data) => {
    const body = {
      email: data.email,
    };

    try {
      const res = await ForgotPasswordRequest(body);
      console.log(res);
      toast.success("Password reset link sent successfully. Check your inbox");
      const delayAutoNav = setTimeout(() => {
        navigate("/login");
      }, 6000);

      return () => clearTimeout(delayAutoNav);
    } catch (err) {
      toast.error("User does not exist! Please Sign Up");
      const delayAutoNav = setTimeout(() => {
        navigate("/signup");
      }, 6000);

      return () => clearTimeout(delayAutoNav);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <BounceLoader loading={loading} size={100} color="#36d7b7" />
      </div>
    );
  }

  return (
    <>
      <div className="h-screen bg-white border-[0.2px] border-gray-500 bg-[url(/src/assets/auth-bg.png)] bg-no-repeat bg-cover md:px-4">
        <Link to="/" className="flex items-center pt-6 pl-4">
          <img
            src="../lis-pendens-logo-white.png"
            alt="LisPendens brand logo"
            className="text-white object-cover"
          />
        </Link>
        <div className="max-w-[650px] mx-auto mt-12 lg:mt-24">
          {/* ====== Main content goes here ====== */}
          <section className="py-10 m-2  px-6 md:m-6 md:px-12 bg-white rounded-[30px] flex justify-center">
            <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full">
              <h3 className="mb-6 text-[36px] text-black">Reset your password</h3>
              {/* ====== Email ====== */}
              <div className="mb-4">
                <div className="w-full  pt-1 bg-white rounded-2xl border-[1.3px] border-[#A1A1A1]">
                  <label htmlFor="" className="text-[#8A8A8A] p-3">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full outline-none focus:out-none p-1 md:p-2 pl-3 text-[#8A8A8A] bg-none rounded-b-2xl"
                    {...register("email")}
                  />
                </div>
                <p className="text-red-500 text-[0.75rem]">
                  {errors.email?.message}
                </p>
              </div>
              
              {/* ====== Reset Password Button ====== */}
              <button className="w-full my-4 p-5 text-center bg-[#000000]  rounded-2xl text-white border-1 border-[#A1A1A1] cursor-pointer transition duration-700 ease-in-out hover:bg-white hover:text-[#000000] hover:border-[#000000] border-[1.3px]">
                Continue
              </button>
              <Link
                to="/"
                className="text-[#000000] cursor-pointer ml-3"
              >
                <p className="text-center hover:underline font-medium">
                  Back to Home
                </p>
              </Link>
            </form>
          </section>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;
