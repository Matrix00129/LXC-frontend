import { GrFormClose, GrFormDown, GrFormUp } from "react-icons/gr";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CreateUserRequest } from "../../../Services/SuperAdminRequest/users.request";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { PiToggleLeftFill } from "react-icons/pi";
import { IoToggle } from "react-icons/io5";
import { useQueryClient } from "@tanstack/react-query";
import { permissionData, roleData } from "../../../utils/LinkData";
import { Select } from "../../select/Select";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required")
    .min(3, "First Name must be greater than 3 letters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(3, "Last Name must be greater than 3 letters"),
  role: yup.string().required("Role is required"),
  email: yup
    .string()
    .required("Email is required")
    .email(" Invalid Email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 15 characters"),
});

const AddUser = ({ setShowAddUser }) => {
  const [isAssigning, setIsAssigning] = useState(false);
  const [isStatus, setIsStatus] = useState("inactive");
  const [showDropDown, setShowDropDown] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [getRoleName, setGetRoleName] = useState();
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const { auth } = useAuth();
  const token = auth?.accessToken;

  const handlePermissionCheckbox = (e) => {
    const permission = e.target.value;
    if (e.target.checked) {
      setPermissions((prevPermissions) => [...prevPermissions, permission]);
    } else {
      setPermissions((prevPermissions) =>
        prevPermissions.filter((p) => p !== permission)
      );
    }
  };

  // refetch users using Query client from tanStack query logic
  const queryClient = useQueryClient();

  // React Hook form for form validation
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ resolver: yupResolver(schema) });

  // Submit handler for the form
  const onSubmitHandler = async (data) => {
    setIsAssigning(true);

    const body = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      role: getRoleName,
      email: data?.email,
      permission: permissions,
      status: isStatus,
      password: data?.password,
      courtRoomNo: data?.courtRoomNo || undefined,
      courtName: data?.courtName || undefined,
      judicialDivision: data?.judicialDivision || undefined,
    };

    try {
      const response = await CreateUserRequest(body, token);
      console.log(response, "this user response ====");
      toast.success("User Added Successful");
      queryClient.invalidateQueries("getCasesApi");
      setShowAddUser(false);
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <>
      <section className="mt-10 pb-4 border-[1px] border-black rounded-2xl bg-white max-w-[940px] mx-auto">
        <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full">
          <p className="font-semibold text-[20px] bg-[#524A4C]   text-white  p-3 md:px-10 rounded-t-2xl flex justify-between">
            Add new user
            <span
              className="cursor-pointer  font-bold"
              onClick={() => setShowAddUser(false)}
            >
              <GrFormClose size={30} />
            </span>
          </p>
          <section>
            <div className="bg-white md:grid md:grid-cols-2 md:gap-4  p-3 py-6 md:p-10">
              {/* ====First Name ====== */}
              <div className="max-w-[400px] mb-4">
                <label htmlFor="" className="font-bold">
                  First Name:
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
                  {...register("firstName")}
                />
                <p className="text-red-500 text-[0.75rem]">
                  {errors.firstName?.message}
                </p>
              </div>

              {/* ====Last Name ====== */}
              <div className="max-w-[400px] mb-4">
                <label htmlFor="" className="font-bold">
                  Last Name:
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
                  {...register("lastName")}
                />
                <p className="text-red-500 text-[0.75rem]">
                  {errors.lastName?.message}
                </p>
              </div>

              {/* ============== Role ============ */}
              <div className="max-w-[400px] mb-4">
                <label htmlFor="" className="font-bold">
                  Role:
                </label>
                <Select
                  focusContent=""
                  placeholder="search"
                  onSelect={(item) => {
                    setGetRoleName(item?.name);
                    setShowAdditionalFields(item?.name === "registrar");
                  }}
                  inputData={roleData}
                  selectOption=""
                  register={{ ...register("role") }}
                />

                {!getRoleName && (
                  <p className="text-red-500 text-[0.75rem]">
                    {errors.role?.message}
                  </p>
                )}
              </div>

              {/* =========== Email Address ========== */}
              <div className="max-w-[400px] mb-4">
                <label htmlFor="" className="font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
                  {...register("email")}
                />
                <p className="text-red-500 text-[0.75rem]">
                  {errors.email?.message}
                </p>
              </div>

              {/* ============ Password ========== */}
              <div className="max-w-[400px] mb-4">
                <label htmlFor="" className="font-bold">
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  className="w-full  mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
                  {...register("password")}
                />
                <p className="text-red-500 text-[0.75rem]">
                  {errors.password?.message}
                </p>
              </div>

              {/* ============ Permission ============= */}
              <div className="max-w-[400px] mb-4">
                <label htmlFor="" className="font-bold">
                  Permission
                </label>
                <div
                  className={`${
                    !permissions ? "justify-end" : "justify-between"
                  } flex gap-3 w-full h-10  mt-4  border-[1.2px] border-slate-300 rounded-lg p-2 text-[14px]`}
                >
                  <div className="flex gap-3">
                    {permissions?.map((item, idx) => (
                      <div key={idx}>
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>

                  {showDropDown ? (
                    <span
                      onClick={() => setShowDropDown(false)}
                      className="cursor-pointer"
                    >
                      <GrFormUp
                        size={28}
                        className="cursor-pointer text-[#9D9D9D]"
                      />
                    </span>
                  ) : (
                    <span
                      onClick={() => setShowDropDown(true)}
                      className="cursor-pointer"
                    >
                      <GrFormDown
                        size={28}
                        className="cursor-pointer text-[#9D9D9D]"
                      />
                    </span>
                  )}
                </div>

                <div
                  className={`${
                    showDropDown
                      ? "flex gap-3 w-full mt-[-2px] border-[1.2px] border-slate-300 rounded-lg py-2 px-3 text-[14px]"
                      : "hidden "
                  }`}
                >
                  {permissionData?.map((item, idx) => (
                    <div key={idx}>
                      <input
                        type="checkbox"
                        name={item?.name}
                        value={item?.name}
                        className="mr-1 cursor-pointer"
                        onChange={handlePermissionCheckbox}
                      />
                      <label htmlFor="">{item?.title}</label>
                    </div>
                  ))}
                </div>
              </div>
              {/* ============ Additional Fields for Registrar ============= */}
              {getRoleName === "registrar" && showAdditionalFields && (
                <>
                  <div className="max-w-[400px] mb-4">
                    <label htmlFor="" className="font-bold">
                      Court (Name of Justice):
                    </label>
                    <input
                      type="text"
                      name="courtName"
                      className="w-full mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
                      {...register("courtName")}
                    />
                  </div>
                  <div className="max-w-[400px] mb-4">
                    <label htmlFor="" className="font-bold">
                      Judicial Division:
                    </label>
                    <input
                      type="text"
                      name="judicialDivision"
                      className="w-full mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
                      {...register("judicialDivision")}
                    />
                  </div>
                  <div className="max-w-[400px] mb-4">
                    <label htmlFor="" className="font-bold">
                      Court Room No.:
                    </label>
                    <input
                      type="text"
                      name="courtRoomNo"
                      className="w-full mt-4 outline-none focus:out-none border-[1.2px] border-slate-300 rounded-lg p-2"
                      {...register("courtRoomNo")}
                    />
                  </div>
                </>
              )}

              {/* ============ Status ========== */}
              <div className="max-w-[400px] mb-4 ">
                <p className="font-bold">Status</p>
                {isStatus === "active" ? (
                  <p
                    className="text-[#78C549] cursor-pointer flex items-center gap-4 mt-4 "
                    onClick={() => setIsStatus("inactive")}
                  >
                    <IoToggle size={42} /> Active
                  </p>
                ) : (
                  <p
                    className="cursor-pointer flex items-center gap-4 mt-4"
                    onClick={() => setIsStatus("active")}
                  >
                    <PiToggleLeftFill size={42} /> Inactive
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* =========Buttons   (Back Button and Assign button) ======== */}
          <div className="flex gap-10 justify-end mt-1 border-t-[1.3px] border-slate-200 px-4 md:pr-10 pt-4">
            <>
              <div
                onClick={() => setShowAddUser(false)}
                className="bg-[#8E8E8E] w-[120px] rounded-xl text-center items-center text-[18px] flex justify-center text-white font-semibold p-2 cursor-pointer"
              >
                Back
              </div>
              <button
                className="bg-[#000000] w-[160px] rounded-xl text-center text-white text-[18px] p-3 cursor-pointer font-bold"
                // onClick={() => setShowSuccessMessage(true)}
                disabled={isAssigning}
              >
                {isAssigning ? "Assigning..." : "Assign"}
              </button>
            </>
          </div>
        </form>
      </section>
      <ToastContainer />
    </>
  );
};

export default AddUser;
