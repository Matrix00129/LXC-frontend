import DashboardNavBar from "src/components/navbar/DashboardNavBar";
import { EditIcon } from "../../../assets/EditIcon";
import { MdOutlineAccountBalance, MdBalance } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FiHash } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetSettingsRequest,
  UpdateSettingsRequest,
} from "../../../Services/CourtRegistrarRequest/settings.request";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const schema = yup.object().shape({
  courtInfo: yup.string().required("Court Info is required"),
  courtNumber: yup.string().required("Court Number is required"),
  judicialDivision: yup.string().required("Judicial Division is required"),
  password: yup.string().required("Password is required"),
});
const RegistrarSettings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword] = useState(true);

  // get token from useAuth
  const { auth } = useAuth();
  const token = auth?.accessToken;

  // React Tanstack Query for data fetching logic
  const { data: settingsData } = useQuery({
    queryKey: ["getRegistrarSettingsApi"],
    queryFn: () => GetSettingsRequest(token),
  });

  console.log(settingsData, "settingsData is here ====");

  // refetch users using Query client from tanStack query logic
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
      setValue("courtInfo", settingsData?.data?.courtName);
      setValue("courtNumber", settingsData?.data?.courtRoomNo);
      setValue("judicialDivision", settingsData?.data?.judicialDivision);
    }
  }, [settingsData, setValue]);

  // Submit handler for the form
  const onSubmitHandler = async (data) => {
    setIsSaving(true);

    const body = {
      courtName: data?.courtInfo,
      courtRoomNo: data?.courtNumber,
      judicialDivision: data?.judicialDivision,
      password: data?.password,
    };

    try {
      await UpdateSettingsRequest(token, body);
      toast.success("Settings Update Successful");
      queryClient.invalidateQueries("getRegistrarSettingsApi");
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
          <section className=" mt-10 md:grid grid-cols-2 gap-4">
            <div className="border-[0.5px] border-slate-300 px-4 pt-3 pb-6 md:px-10 md:pt-6 md:pb-8 rounded-2xl bg-white">
              {/* ======Court Info ====== */}
              <div className="flex items-center justify-between">
                <p className="font-semibold">Court Info</p>
                <div className="cursor-pointer">
                  <EditIcon />
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-6 bg-white rounded-2xl p-6 border-[0.6px] border-slate-300 mt-4">
                <div className="rounded-full bg-gray-300 p-2">
                  <MdBalance size={24} />
                </div>
                <input
                  type="text"
                  name="courtInfo"
                  className="w-full outline-none focus:out-none rounded-lg"
                  {...register("courtInfo")}
                />
              </div>
              <p className="text-red-500 text-[0.75rem]">
                {errors.courtInfo?.message}
              </p>
            </div>

            {/* =======Court Number ======= */}
            <div className="border-[0.5px] border-slate-300 px-4 pt-3 pb-6 md:px-10 md:pt-6 md:pb-8 rounded-2xl bg-white">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Court Number</p>
                <div className="cursor-pointer">
                  <EditIcon />
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-6 bg-white rounded-2xl p-6 border-[0.6px] border-slate-300 mt-4">
                <div className="rounded-full bg-gray-300 p-2">
                  <FiHash size={24} />
                </div>
                <input
                  type="text"
                  name="courtNumber"
                  className="w-full outline-none focus:out-none rounded-lg"
                  {...register("courtNumber")}
                />
              </div>
              <p className="text-red-500 text-[0.75rem]">
                {errors.courtNumber?.message}
              </p>
            </div>

            {/* =====Judicial Division ===== */}
            <div className="border-[0.5px] border-slate-300 px-4 pt-3 pb-6 md:px-10 md:pt-6 md:pb-8 rounded-2xl bg-white">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Judicial Division</p>
                <div className="cursor-pointer">
                  <EditIcon />
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-6 bg-white rounded-2xl p-6 border-[0.6px] border-slate-300 mt-4">
                <div className="rounded-full bg-gray-300 p-2">
                  <MdOutlineAccountBalance size={20} />
                </div>
                <input
                  type="text"
                  name="judicialDivision"
                  className="w-full  outline-none focus:out-none rounded-lg"
                  {...register("judicialDivision")}
                />
              </div>
              <p className="text-red-500 text-[0.75rem]">
                {errors.judicialDivision?.message}
              </p>
            </div>

            {/* ======= Change Password ======= */}
            <div className="border-[0.5px] border-slate-300 px-4 pt-3 pb-6 md:px-10 md:pt-6 md:pb-8 rounded-2xl bg-white">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Change Password</p>
                <div className="cursor-pointer">
                  <EditIcon />
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-6 bg-white rounded-2xl p-6 border-[0.6px] border-slate-300 mt-4">
                <div className="rounded-full bg-gray-300 p-2">
                  <CiLock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="**********************"
                  className="w-full  outline-none focus:out-none rounded-lg"
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

export default RegistrarSettings;
