import { GrFormClose, GrFormDown, GrFormUp } from "react-icons/gr";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DeleteUserRequest,
  EditUserRequest,
} from "../../../Services/SuperAdminRequest/users.request";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { PiToggleLeftFill } from "react-icons/pi";
import { IoToggle } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
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
});

const EditUser = ({ setShowEditUser, usersData, editUserID }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isStatus, setIsStatus] = useState("inactive");
  const [clickedToggle, setClickedToggle] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [getRoleName, setGetRoleName] = useState();

  // refetch users using Query client from tanStack query logic
  const queryClient = useQueryClient();

  const deleteUserID = editUserID;
  const usersArray = usersData?.data?.users || [];
  const user = usersArray.find((user) => user?._id === editUserID);

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

  useEffect(() => {
    // If user status changes, reset clickedToggle state
    setClickedToggle(false);
  }, [user?.status]);

  // React Hook Form Logic
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    register,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      role: user?.role,
      email: user?.email,
      permission: user?.permission,
      status: user?.status,
    },
  });

  //  Submit handler for the form
  const onSubmitHandler = async (data) => {
    setIsUpdating(true);

    const body = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      role: getRoleName ? getRoleName : data?.role,
      email: data?.email,
      permission: permissions,
      status: isStatus,
    };

    try {
      await EditUserRequest(token, editUserID, body);
      toast.success("User Edited Successful");
      queryClient.invalidateQueries("getCasesApi");
      setShowEditUser(false);
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete User Logic
  const handleDelete = async () => {
    try {
      await DeleteUserRequest(token, deleteUserID);
      setShowEditUser(false);
      toast.success("User Deleted Successful");
      setTimeout(() => {
        queryClient.invalidateQueries("getUsersApi");
      }, 1000);
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <section className="mt-10 pb-4 border-[1px] border-black rounded-2xl bg-white max-w-[940px] mx-auto">
        <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full">
          <p className="font-semibold text-[20px] bg-[#524A4C]   text-white  p-3 md:px-10 rounded-t-2xl flex justify-between">
            Edit User
            <span
              className="cursor-pointer  font-bold"
              onClick={() => setShowEditUser(false)}
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
                    setValue("role", item?.name);
                  }}
                  inputData={roleData}
                  getSelectedSector={user?.role}
                  register={{ ...register("role") }}
                />
                <p className="text-red-500 text-[0.75rem]">
                  {errors?.role?.message}
                </p>
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

              {/* ============ Status ========== */}
              <div className="max-w-[400px] mb-4 ">
                <p className="font-bold">Status</p>
                {clickedToggle ? (
                  isStatus === "active" ? (
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
                  )
                ) : user?.status === "active" ? (
                  <p
                    className="text-[#78C549] cursor-pointer flex items-center gap-4 mt-4 "
                    onClick={() => {
                      setIsStatus("inactive");
                      setClickedToggle(true);
                    }}
                  >
                    <IoToggle size={42} /> Active
                  </p>
                ) : (
                  <p
                    className="cursor-pointer flex items-center gap-4 mt-4"
                    onClick={() => {
                      setIsStatus("active");
                      setClickedToggle(true);
                    }}
                  >
                    <PiToggleLeftFill size={42} /> Inactive
                  </p>
                )}
              </div>

              {/* ============ Permission ============= */}
              <div className="max-w-[400px] mb-4">
                <label htmlFor="" className="font-bold">
                  Permission
                </label>
                <div
                  className={`${
                    !permissions || user?.permission === 0
                      ? "justify-end"
                      : "justify-between"
                  } flex gap-3 w-full h-10  mt-4  border-[1.2px] border-slate-300 rounded-lg p-2 text-[14px]`}
                >
                  <div className="flex gap-3">
                    {permissions?.length !== 0 ? (
                      <div className="flex gap-3">
                        {permissions?.map((item, idx) => (
                          <div key={idx}>
                            <p>{item}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        {user?.permission?.map((item, idx) => (
                          <div key={idx}>
                            <p>{item}</p>
                          </div>
                        ))}
                      </div>
                    )}
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

              {/* ============ DELETE USER========== */}
              <div
                className="max-w-[400px] mb-4 pt-10 flex gap-4 w-fit"
                onClick={() => {
                  handleDelete();
                }}
              >
                <MdOutlineDeleteOutline
                  className="text-[#E82F2F] cursor-pointer"
                  size={24}
                />

                <p className="font-bold uppercase cursor-pointer">
                  Delete user
                </p>
              </div>
            </div>
          </section>

          {/* =========Buttons   (Back Button and Assign button) ======== */}
          <div className="flex gap-10 justify-end mt-1 border-t-[1.3px] border-slate-200 px-4 md:pr-10 pt-4">
            <>
              <div
                onClick={() => setShowEditUser(false)}
                className="bg-[#8E8E8E] w-[120px] rounded-xl text-center items-center text-[18px] flex justify-center text-white font-semibold p-2 cursor-pointer"
              >
                Back
              </div>
              <button
                className="bg-[#000000] w-[160px] rounded-xl text-center text-white text-[18px] p-3 cursor-pointer font-bold"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
            </>
          </div>
        </form>
      </section>
      <ToastContainer />
    </>
  );
};

export default EditUser;
