import { IoIosAdd } from "react-icons/io";
import { Modal } from "../../Modals/Modal";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { GetDashboardUsersRequest } from "../../../Services/SuperAdminRequest/dashboard.request";
import AddUser from "../users/AddUser";

const Users = () => {
  const [showAddUser, setShowAddUser] = useState(false);

  const { auth } = useAuth();
  const token = auth.accessToken;

  // React Tanstack Query for data fetching logic
  const { data: usersData } = useQuery({
    queryKey: ["getDashboardUsersApi"],
    queryFn: () => GetDashboardUsersRequest(token),
  });

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-bold md:text-[20px]">Users</p>
          <div
            className="space-x-6 cursor-pointer"
            onClick={() => setShowAddUser(true)}
          >
            <IoIosAdd size={32} />
          </div>
        </div>

        <div>
          {usersData?.data?.users?.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 border-t-[0.5px] border-slate-300 overflow-scroll overflow-y-hidden p-3 my-3"
            >
              {item?.photoUrl ? (
                <img
                  src={item.photoUrl}
                  alt="user avatar"
                  className="w-[32px] h-[32px] object-cover object-center border-[0.13px] border-black rounded-full"
                />
              ) : item?.firstName && item?.lastName ? (
                <span className="flex gap-2 items-center">
                  <span className="w-[32px] h-[32px] border-[0.13px] border-black rounded-full flex justify-center text-center pt-1">
                    {`${item?.firstName
                      ?.charAt(0)
                      ?.toUpperCase()}${item?.lastName
                      ?.charAt(0)
                      ?.toUpperCase()}`}
                  </span>
                </span>
              ) : (
                <span className="flex gap-2 items-center">
                  <span className="w-[32px] h-[32px] border-[0.13px] border-black rounded-full flex justify-center text-center pt-1">
                    {`${item?.email?.charAt(0)?.toUpperCase()}`}
                  </span>
                </span>
              )}

              <p className="text-[12px]">{item?.email}</p>
            </div>
          ))}
        </div>
      </div>

      {/* =================Modals ================== */}
      {/* ===Add User modal == */}
      <Modal show={showAddUser} onClose={() => setShowAddUser(false)}>
        <AddUser setShowAddUser={setShowAddUser} />
      </Modal>
    </>
  );
};

export default Users;
