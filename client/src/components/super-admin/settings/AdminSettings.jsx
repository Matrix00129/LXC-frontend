import DashboardNavBar from "src/components/navbar/DashboardNavBar";
import { EditIcon } from "../../../assets/EditIcon";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetSettingsRequest,
  UpdateSettingsRequest,
} from "../../../Services/SuperAdminRequest/settings.request";
import { useEffect, useState } from "react";
import { LuUser2 } from "react-icons/lu";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const AdminSettings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword] = useState(true);

  // get token from useAuth
  const { auth } = useAuth();
  const token = auth?.accessToken;

  // React Tanstack Query for data fetching logic
  const { data: settingsData } = useQuery({
    queryKey: ["getSettingsApi"],
    queryFn: () => GetSettingsRequest(token),
  });

  // refetch  using Query client
  const queryClient = useQueryClient();

  // React Hook form for form validation
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Set default values when settingsData is available
  useEffect(() => {
    if (settingsData) {
      setValue("firstName", settingsData.data.firstName);
      setValue("lastName", settingsData.data.lastName);
      setValue("email", settingsData.data.email);
    }
  }, [settingsData, setValue]);

  // Submit handler for the form
  const onSubmitHandler = async (data) => {
    setIsSaving(true);

    const formData = new FormData();
    formData.append("firstName", data?.firstName);
    formData.append("lastName", data?.lastName);
    formData.append("email", data?.email);
    formData.append("password", data?.password);

    const body = formData;
    try {
      await UpdateSettingsRequest(token, body);
      toast.success("Settings Updated Successful");
      queryClient.invalidateQueries("getSettingsApi");
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div>
        {/* ==============Navigation Bar ================ */}
        <section>
          <DashboardNavBar
            headings="Settings"
            subHeadings="Track your searches and manage overall activities"
          />
        </section>

        {/* ================== Main Content =============== */}
        <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full">
          <section className="mt-10 md:grid md:grid-cols-2  gap-4 space-y-4 md:space-y-0">
            {/* ======firstName ====== */}
            <div className="border-[0.5px] border-slate-300 px-4 pt-3 pb-3 md:px-10 md:pt-6 rounded-2xl bg-white">
              <div className="flex items-center justify-between">
                <p className="font-semibold">First Name</p>
                <div className="cursor-pointer">
                  <EditIcon />
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-6 bg-white rounded-2xl  border-[0.6px] border-slate-300 mt-4">
                <div className="rounded-full bg-gray-300 ml-3 p-2">
                  <LuUser2 size={24} />
                </div>
                <input
                  type="text"
                  name="firstName"
                  className="w-full outline-none focus:out-none rounded-lg p-3"
                  {...register("firstName")}
                />
              </div>
              <p className="text-red-500 text-[0.75rem]">
                {errors.firstName?.message}
              </p>
            </div>

            {/* ===Last Name ==== */}
            <div className="border-[0.5px] border-slate-300 px-4 pt-3 pb-6 md:px-10 md:pt-6 rounded-2xl bg-white">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Last Name</p>
                <div className="cursor-pointer">
                  <EditIcon />
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-6 bg-white rounded-2xl  border-[0.6px] border-slate-300 mt-4">
                <div className="rounded-full bg-gray-300 ml-3 p-2">
                  <LuUser2 size={24} />
                </div>
                <input
                  type="text"
                  name="lastName"
                  className="w-full outline-none focus:out-none rounded-lg p-3"
                  {...register("lastName")}
                />
              </div>
              <p className="text-red-500 text-[0.75rem]">
                {errors.lastName?.message}
              </p>
            </div>

            {/* =======Change Email ======= */}
            <div className="border-[0.5px] border-slate-300 px-4 pt-3 pb-6 md:px-10 md:pt-6 rounded-2xl bg-white">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Change Email</p>
                <div className="cursor-pointer">
                  <EditIcon />
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-6 bg-white rounded-2xl  border-[0.6px] border-slate-300 mt-4">
                <div className="rounded-full bg-gray-300 ml-3 p-2">
                  <MdOutlineMailOutline size={24} />
                </div>
                <input
                  type="text"
                  name="email"
                  className="w-full outline-none focus:out-none rounded-lg p-3"
                  {...register("email")}
                />
              </div>
              <p className="text-red-500 text-[0.75rem]">
                {errors.email?.message}
              </p>
            </div>

            {/* ======= Change Password ======= */}
            <div className="border-[0.5px] border-slate-300 px-4 pt-3 pb-6 md:px-10 md:pt-6 rounded-2xl bg-white">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Change Password</p>
                <div className="cursor-pointer">
                  <EditIcon />
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-6 bg-white rounded-2xl  border-[0.6px] border-slate-300 mt-4">
                <div className="rounded-full bg-gray-300 ml-3 p-2">
                  <CiLock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="**********************"
                  className="w-full outline-none focus:out-none rounded-lg p-3"
                  {...register("password")}
                />
              </div>
              <p className="text-red-500 text-[0.75rem]">
                {errors.password?.message}
              </p>
            </div>
          </section>

          {/* ========= (Save button) ======== */}
          <div className="flex  justify-end ">
            <button
              className="bg-[#000000] w-[160px] rounded-xl text-center text-white text-[18px] p-3 cursor-pointer font-bold mt-8 "
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminSettings;
