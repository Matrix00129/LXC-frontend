import { Link } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginRequest } from "../Services/AuthRequest/auth.request";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email(" Invalid Email format"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "password must be at least 6 characters")
    .max(20, "password must not exceed 15 characters"),
});

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setAuth } = useAuth();

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
      password: data.password,
    };
    try {
      const response = await LoginRequest(body);
      const role = response?.data?.user?.role;
      const accessToken = response?.data?.token?.access_token;
      const email = response?.data?.user?.email;
      const firstName = response?.data?.user?.firstName;

      // console.log(firstName, "this is firstName ====");
      // console.log(role, "this is the role needed======");
      // console.log(email, "this is email needed ====");

      setAuth({ role, accessToken, email, firstName });

      toast.success("Login Successful");
      if (role === "superadmin") {
        navigate("/admin");
      } else if (role === "registrar") {
        navigate("/court-registrar");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.message);
      toast.error(error?.response?.data?.message);
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
          {/* ============= MainContent goes here ..... =========== */}
          <section className="py-10 m-2  px-6 md:m-6 md:px-12 bg-white rounded-[30px] flex justify-center">
            <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full">
              <h3 className="mb-6 text-[36px] text-black">Login</h3>
              {/* ===============EMAIL ========= */}
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
              {/* ===============PASSWORD ========= */}
              <div>
                <div className="w-full pt-1 bg-white rounded-2xl border-[1.3px] border-[#A1A1A1] relative">
                  <label htmlFor="" className="text-[#8A8A8A] p-3">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full outline-none focus:out-none  p-1 md:p-2 pl-3 text-[#8A8A8A] bg-none rounded-b-2xl"
                    {...register("password")}
                  />
                  {showPassword ? (
                    <BsEyeSlashFill
                      className="absolute right-2 top-8 cursor-pointer"
                      size={20}
                      onClick={() => {
                        setShowPassword((prev) => !prev);
                      }}
                      color="#8A8A8A"
                    />
                  ) : (
                    <BsEyeFill
                      className="absolute right-2 top-8 cursor-pointer"
                      size={20}
                      onClick={() => {
                        setShowPassword((prev) => !prev);
                      }}
                      color="#8A8A8A"
                    />
                  )}
                </div>
                <p className="text-red-500 text-[0.75rem]">
                  {errors.password?.message}
                </p>
              </div>

              {/* =============== FORGET PASSWORD ========= */}
              <Link
                to="/forgot-password"
                className="text-[#818181] max-w-[520px] text-[14px] flex justify-end"
              >
                Forgot password?
              </Link>

              {/* ===============LOGIN BUTTON ========= */}
              <button className="w-full my-4 p-5 text-center bg-[#000000]  rounded-2xl text-white border-1 border-[#A1A1A1] cursor-pointer transition duration-700 ease-in-out hover:bg-white hover:text-[#000000] hover:border-[#000000] border-[1.3px]">
                Login
              </button>
              <p className="text-center text-[14px]">
                Don’t have an account ?
                <Link
                  to="/signup"
                  className="text-[#000000] cursor-pointer ml-3"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </section>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignIn;
