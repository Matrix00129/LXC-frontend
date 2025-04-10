import { TableMain } from "../../table/TableMain";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import { Modal } from "../../Modals/Modal";
import SuccessMessage from "../../Modals/SuccessMessage";
import ConfirmDelete from "../../Modals/ConfirmDelete";
import { getSerialNumber } from "../../../utils/LinkData";
import { IoToggle } from "react-icons/io5";
import { PiToggleLeftFill } from "react-icons/pi";
import { ToastContainer } from "react-toastify";
import EditUser from "./EditUser";
import { Skeleton } from "../../skeletons/Skeleton";

const UserInformation = ({
  usersData,
  isLoading,
  token,
  searchFilter,
  currentPage,
  pageSize,
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const columnHelper = createColumnHelper();
  // Table columns
  const columns = [
    columnHelper.accessor("_id", {
      cell: (info) => (
        <span>
          {getSerialNumber(
            info.getValue(),
            usersData?.data?.users,
            currentPage,
            pageSize
          )}
          .
        </span>
      ),
      header: () => <span></span>,
    }),
    columnHelper.accessor("name", {
      cell: (info) => (
        <span className="font-normal">
          {info?.row?.original?.firstName} {info?.row?.original?.lastName}
        </span>
      ),
      header: () => <span className="font-bold">Name</span>,
    }),
    columnHelper.accessor("email", {
      cell: (info) => (
        <span className="font-normal">{info?.row?.original?.email}</span>
      ),
      header: () => <span className="font-bold">Email</span>,
    }),
    columnHelper.accessor("status", {
      cell: (info) => (
        <div
          className={`rounded-lg  flex items-center gap-2 font-semibold text-center ${
            info?.row?.original?.status === "active"
              ? "text-[#78C549] "
              : " text-[#828282]"
          }`}
        >
          {info?.row?.original?.status === "active" ? (
            <IoToggle size={32} />
          ) : (
            <PiToggleLeftFill size={34} />
          )}

          <p className="capitalize">{info?.row?.original?.status} </p>
        </div>
      ),
      header: () => <span className="font-bold">Status</span>,
    }),
    columnHelper.accessor("role", {
      cell: (info) => (
        <span className="font-normal">{info?.row?.original?.role}</span>
      ),
      header: () => <span className="font-bold">Role</span>,
    }),
    columnHelper.accessor("permission", {
      cell: (info) => (
        <p className="font-normal flex gap-2">
          {Array.isArray(info?.row?.original?.permission) ? (
            info?.row?.original?.permission?.map((item, idx) => (
              <p key={idx}>
                <span>{item}</span>
              </p>
            ))
          ) : (
            <p>{info?.row?.original?.permission}</p>
          )}
        </p>
      ),
      header: () => <span className="font-bold">Permission</span>,
    }),
    columnHelper.accessor("id", {
      cell: ({ row }) => (
        <p
          onClick={() => {
            setSelectedRow(row.original);
            setShowEditUser(true);
            setShowEditUser(row.original._id);
          }}
          className="cursor-pointer border-[1.3px] border-slate-400 rounded-[6px] py-1 gap-x-2 w-[70px] text-center text-[#989898]"
        >
          Edit
        </p>
      ),
      header: "",
    }),
  ];

  // Search Filter Functionality logic
  const filteredUsersData = usersData?.data?.users?.filter((item) => {
    const searchQuery = searchFilter.toLowerCase();
    return (
      item.firstName?.toLowerCase().includes(searchQuery) ||
      item.lastName?.toLowerCase().includes(searchQuery) ||
      item.email?.includes(searchFilter) ||
      item.status?.includes(searchFilter) ||
      item.role?.includes(searchFilter)
    );
  });

  return (
    <>
      <div>
        <section>
          <div className="mt-6 mb-6 md:flex space-y-4 md:space-y-0 justify-between">
            <p className="text-[18px] font-semibold">User list</p>
          </div>
          <div className="w-full  rounded-lg  overflow-y-auto">
            {/* TABLE SECTION */}
            <div className="w-full  rounded-lg  mt-2 ">
              <div className="h-[400px] rounded-tl-[8px] rounded-tr-[8px] bg-white ">
                {isLoading ? (
                  <div className="text-center mx-auto text-[#787878]">
                    <Skeleton />
                  </div>
                ) : (
                  <TableMain
                    data={filteredUsersData ? filteredUsersData : []}
                    columns={columns}
                    tableClass=" font-medium text-small"
                    filters={{
                      firstName: searchFilter,
                      lastName: searchFilter,
                      email: searchFilter,
                      status: searchFilter,
                      role: searchFilter,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ================== MODALS ================== */}

      {/* ===== Edit User Modal ===== */}
      <Modal show={showEditUser} onClose={() => setShowEditUser(false)}>
        <EditUser
          setShowEditUser={setShowEditUser}
          token={token}
          editUserID={selectedRow ? selectedRow._id : null}
          usersData={usersData}
        />
      </Modal>

      {/* =====Confirm Delete User Message ===== */}
      <Modal
        show={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
      >
        <ConfirmDelete
          setShowConfirmDelete={setShowConfirmDelete}
          setShowSuccessMessage={setShowSuccessMessage}
          title="Delete user"
          content="Confirm Delete ?"
          buttonName="Delete"
        />
      </Modal>
      {/* =======Success Delete User Message ====== */}
      <Modal
        show={showSuccessMessage}
        onClose={() => setShowSuccessMessage(false)}
      >
        <SuccessMessage
          setShowSuccessMessage={setShowSuccessMessage}
          title="Delete user"
          content="Deleted"
        />
      </Modal>
      <ToastContainer />
    </>
  );
};

export default UserInformation;
