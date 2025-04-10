import DashboardNavBar from "src/components/navbar/DashboardNavBar";
import { EditIcon } from "../../../assets/EditIcon";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { useEffect, useState } from "react";
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
} from "../../../Services/UserRequest/settings.request";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const UserSettings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword] = useState(true);
  const [userImage, setUserImage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  // get token from useAuth
  const { auth } = useAuth();
  const token = auth?.accessToken;

  // React Tanstack Query for data fetching logic
  const { data: settingsData } = useQuery({
    queryKey: ["getSettingsApi"],
    queryFn: () => GetSettingsRequest(token),
  });

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
      setValue("firstName", settingsData.data.firstName);
      setValue("lastName", settingsData.data.lastName);
      setValue("email", settingsData.data.email);
    }
  }, [settingsData, setValue]);

  // Uploading avatar(profile image) logic
  const handleFileChange = ({ target: { files } }) => {
    const file = files[0];
    console.log(files[0].type, "this is the file type");

    if (file) {
      const fileType = files[0].type;
      if (
        fileType === "image/jpg" ||
        fileType === "image/png" ||
        fileType === "image/jpeg"
      ) {
        setUserImage(URL.createObjectURL(files[0]));
        setSelectedFile(file);
      }
    }
  };

  // Submit handler for the form
  const onSubmitHandler = async (data) => {
    setIsSaving(true);
    console.log(selectedFile, "this is the file selected===");

    if (selectedFile) {
      const formData = new FormData();

      formData.append("avatar", selectedFile);
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
    }
  };

  return (
    <>
      <div>
        {/* ==============Navigation Bar ================ */}
        <section>
          <DashboardNavBar headings="Settings" subHeadings="" />
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

          {/* =====Profile Picture ===== */}
          <section>
            <div className="border-[0.5px] border-slate-300 px-4 pt-3 pb-6 md:px-10 md:pt-6 md:pb-6 rounded-2xl bg-white max-w-[540px] mx-auto mt-6">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Profile picture</p>
              </div>
              <div className="flex items-center justify-center space-x-2 md:space-x-6 bg-white rounded-2xl  border-[0.6px] border-slate-300 mt-4 cursor-pointer">
                <label
                  htmlFor="fileInput"
                  className="w-full p-3 flex  justify-between tracking-wide cursor-pointer"
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <p className="w-full text-center">Upload image</p>
                    <input
                      type="file"
                      name="user_Image"
                      id="fileInput"
                      accept=".png,  .jpg, .jpeg"
                      className="hidden input-field"
                      onChange={handleFileChange}
                    />

                    {userImage && (
                      <div className="border-2 border-slate-800 rounded-full relative mx-auto w-[45px]">
                        <img
                          src={userImage}
                          alt="user avatar"
                          width={100}
                          height={100}
                          className="rounded-full w-[45px] h-[35px]"
                        />
                      </div>
                    )}
                  </div>
                </label>
              </div>
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

export default UserSettings;
