import DashboardNavBar from "src/components/navbar/DashboardNavBar";
import { SearchIcon } from "../../../assets/SearchIcon";
import UserInformation from "./UserInformation";
import { Modal } from "../../Modals/Modal";
import { useState } from "react";
import AddUser from "./AddUser";
import SuccessMessage from "../../Modals/SuccessMessage";
import { IoIosAdd } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { GetUsersRequest } from "../../../Services/SuperAdminRequest/users.request";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Users = () => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { auth } = useAuth();
  const token = auth.accessToken;

  // React Tanstack Query for data fetching logic
  const { data: usersData, isLoading } = useQuery({
    queryKey: ["getUsersApi", currentPage],
    queryFn: () => GetUsersRequest(token, currentPage),
  });

  // Pagination Logic Implementation
  const totalUsers = usersData?.data?.totalUsers;
  const userDataArray = usersData?.data?.users;

  const handleNextPage = () => {
    if (userDataArray?.length >= 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const entriesPerPage = pageSize;
  const totalEntries = totalUsers || 0;
  const startSerial = (currentPage - 1) * entriesPerPage + 1;
  const endSerial = currentPage * entriesPerPage;
  const paginationText = `${startSerial} - ${endSerial} of ${totalEntries}`;

  return (
    <>
      <div>
        {/* =======Navigation Bar ======== */}
        <section>
          <DashboardNavBar
            headings={`Users (${usersData?.data?.totalUsers})`}
            subHeadings=""
            setSearchFilter={setSearchFilter}
          />
        </section>
        {/* ======= Search button and search text ======= */}
        <section>
          <div className="mt-10 border-b border-slate-300 space-y-4 md:flex md:space-y-4 items-center justify-between pb-4">
            <div className="relative p-2  bg-white rounded-xl cursor-pointer">
              <span className="absolute left-4 bottom-3 cursor-pointer">
                <SearchIcon />
              </span>
              <input
                type="text"
                name="username"
                placeholder="search by name, email"
                className="outline-none focus:out-none ml-4 pl-4 cursor-pointer"
                onChange={(event) => setSearchFilter(event.target.value)}
              />
            </div>
            <div>
              <p
                className="bg-[#524A4C] border-[1.5px] border-slate-300 w-[180px] text-center rounded-lg p-3 text-white cursor-pointer flex items-center justify-center gap-2"
                onClick={() => setShowAddUser(true)}
              >
                <IoIosAdd size={32} />
                Add new
              </p>
            </div>
          </div>
        </section>
        {/* ========= USER INFORMATION TABLE ======== */}
        <section>
          <UserInformation
            usersData={usersData}
            isLoading={isLoading}
            token={token}
            searchFilter={searchFilter}
            pageSize={pageSize}
            currentPage={currentPage}
          />
        </section>
      </div>

      {/* ========= PAGINATION CONTROLS ======== */}
      <div
        className={`flex items-center gap-x-8 justify-end px-4 py-3  rounded-b-[0.5rem] mb-6`}
      >
        <span className="flex items-center gap-1  text-small">
          {paginationText}
        </span>
        <div className="space-x-5">
          <button
            className="p-1  cursor-pointer"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft color={currentPage === 1 ? "#213f7d66" : "#213F7D"} />
          </button>
          <button
            className="p-1 cursor-pointer"
            onClick={handleNextPage}
            disabled={userDataArray?.length <= 9}
          >
            <ChevronRight
              color={userDataArray?.length <= 9 ? "#213f7d66" : "#213F7D"}
            />
          </button>
        </div>
      </div>

      {/* =================Modals ================== */}

      {/* =====Add User modal ===== */}
      <Modal show={showAddUser} onClose={() => setShowAddUser(false)}>
        <AddUser
          setShowAddUser={setShowAddUser}
          setShowSuccessMessage={setShowSuccessMessage}
        />
      </Modal>

      {/* ====== SuccessMessage Modal ====== */}
      <Modal
        show={showSuccessMessage}
        onClose={() => setShowSuccessMessage(false)}
      >
        <SuccessMessage
          setShowSuccessMessage={setShowSuccessMessage}
          setShowAddUser={setShowAddUser}
          title="User assigned"
          content="Saved to Users"
        />
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Users;
