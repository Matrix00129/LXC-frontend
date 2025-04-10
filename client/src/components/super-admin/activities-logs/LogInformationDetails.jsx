import { BiDotsHorizontalRounded } from "react-icons/bi";
import { createColumnHelper } from "@tanstack/react-table";
import { useRef, useState } from "react";
import { TableMain } from "../../table/TableMain";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { PiFlagPennantBold } from "react-icons/pi";
import { Modal } from "../../Modals/Modal";
import LogDetails from "./LogDetails";
import useAuth from "../../../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteActivityLogRequest,
  GetActivityLogsRequest,
  formatDate,
} from "../../../Services/SuperAdminRequest/activitylogs.request";
import ConfirmDelete from "../../Modals/ConfirmDelete";
import SuccessMessage from "../../Modals/SuccessMessage";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { SearchIcon } from "../../../assets/SearchIcon";
import { Link } from "react-router-dom";
import { FlaggedCaseRequest } from "../../../Services/SuperAdminRequest/flagged.request";
import Spinner from "src/components/spinner/Spinner";

const LogInformationDetails = ({searchFilter, setSearchFilter }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showActions, setShowActions] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showLogDetails, setShowLogDetails] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);


  const { auth } = useAuth();
  const token = auth.accessToken;

  // React Tanstack Query for data fetching logic
  const queryClient = useQueryClient();
  const { data: activityLogsData, isLoading } = useQuery({
    queryKey: ["getActivityLogsApi"],
    queryFn: () => GetActivityLogsRequest(token),
  });

  // Ref
  const viewRef = useRef();

  const columnHelper = createColumnHelper();
  // Table columns
  const columns = [
    columnHelper.accessor("avatar", {
      cell: (info) => (
        <div className="w-[20px] lg:w-fit">
          {info?.row?.original?.userId?.avatar ? (
            <img
              src={`${info?.row?.original?.avatar}`}
              alt="user avatar"
              className="w-[20px] h-[24px]"
            />
          ) : (
            <span className="w-[32px] h-[32px] border-[0.13px]   border-black rounded-full flex justify-center text-center pt-1">{`${info?.row?.original?.userId?.email
              ?.charAt(0)
              ?.toUpperCase()}`}</span>
          )}
        </div>
      ),

      header: () => <span></span>,
    }),
    columnHelper.accessor("details", {
      cell: (info) => (
        <span className="font-normal">
          <span className="font-semibold mr-2">
            {info?.row?.original?.userId?.firstName}
          </span>
          <span className="font-semibold mr-2">
            {info?.row?.original?.userId?.lastName}
          </span>
          <span className="mr-3">{info?.row?.original?.userId?.email}</span>
          {info?.row?.original?.entityId?.nameParties}
          <span className="ml-3">
            {formatDate(info?.row?.original?.entityId?.updatedAt)}
          </span>
        </span>
      ),
      header: () => <span></span>,
    }),
    columnHelper.accessor("review", {
      cell: (info) => (
        <div className="relative">
          <p
            onClick={() => {
              setSelectedRow(info.row.original);
              setShowReview(false);
              setShowLogDetails(true);
            }}
            className="rounded-2xl bg-[#EEEEEE] border-[1.4px] border-[#BEBEBE] p-1 font-semibold w-[100px] text-center"
          >
            Review
          </p>
        </div>
      ),
      header: () => <span></span>,
    }),
    columnHelper.accessor("id", {
      cell: ({ row }) => (
        <div className="relative block">
          <span
            onClick={() => {
              setSelectedRow(row.original);
              setShowActions(!showActions);
            }}
            className="cursor-pointer rounded-[6px] flex py-2 gap-x-2 items-center w-fit text-[#989898]"
          >
            <BiDotsHorizontalRounded size={20} className="cursor-pointer" />
          </span>
          {showActions && row?.original?._id === selectedRow?._id && (
            <div className="bg-white shadow-md rounded-[.25rem] border border-[#213f7d0f] space-y-3 absolute z-[1] top-[32px] left-[-80px] w-[120px]">
              <div ref={viewRef}>
                <p
                  className="p-3 gap-2  flex cursor-pointer hover:bg-gray-100 border-[1.2px] border-slate-200"
                  onClick={handleFlaggingCase}
                >
                  <PiFlagPennantBold size={20} className="text-[#E82F2F] " />
                  Flag case
                </p>
                <p
                  className="p-3 gap-2  flex cursor-pointer hover:bg-gray-100 border-[1.2px] border-slate-200"
                  onClick={() => {
                    setShowConfirmDelete(true);
                  }}
                >
                  <MdOutlineDeleteOutline
                    size={20}
                    className="text-[#E82F2F] "
                  />
                  Delete
                </p>
              </div>
            </div>
          )}
        </div>
      ),
      header: "",
    }),
  ];

  // Delete Activity Logs Logic
  const handleDelete = async () => {
    try {
      await DeleteActivityLogRequest(token, selectedRow._id);
      toast.success("Activity Log Deleted Successful");
      queryClient.invalidateQueries("getActivityLogsApi");
    } catch (error) {
      console.log(error?.response?.data);
      toast.error(error?.response?.data);
    }
  };

  // Flagging A Case Logic
  const handleFlaggingCase = async () => {
    try {
      await FlaggedCaseRequest(token, selectedRow?.entityId?._id);
      toast.success("A Case flagged Successful");
      queryClient.invalidateQueries("getActivityLogsApi");
      setShowLogDetails(false);
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  // Search Filter Functionality logic
  const filteredActivityLogsData = activityLogsData?.data?.logs?.filter(
    (item) => {
      const searchQuery = searchFilter?.toLowerCase();
      return (
        item?.userId?.email?.toLowerCase().includes(searchQuery) ||
        item?.userId?.firstName?.toLowerCase().includes(searchQuery) ||
        item?.userId?.lastName?.toLowerCase().includes(searchQuery) ||
        item?.entityId?.nameParties?.toLowerCase().includes(searchQuery) ||
        item?.entityId?.updatedAt?.toLowerCase()?.includes(searchFilter)
      );
    }
  );

  return (
    <>
      <div>
        <section className="bg-white rounded-2xl p-4 md:p-10 ">
          <div className="md:flex space-y-4 md:space-y-0 justify-between">
            <div className="relative p-2  bg-[#EEEFF4] rounded-xl cursor-pointer">
              <span className="absolute left-4 bottom-3 cursor-pointer">
                <SearchIcon />
              </span>
              <input
                type="text"
                name="username"
                placeholder="search username.."
                className="outline-none focus:out-none ml-4 pl-4 bg-[#EEEFF4] cursor-pointer"
                onChange={(event) => setSearchFilter(event.target.value)}
              />
            </div>
            <Link
              to="/admin/activities-logs"
              className="text-[16px] flex items-center justify-center gap-4 rounded-2xl w-[120px] border-[1.3px] border-slate-300 p-1 cursor-pointer transition duration-700 ease-in-out hover:bg-slate-300 hover:text-gray-700"
            >
              <span>
                <IoIosArrowBack />
              </span>
              Back
            </Link>
          </div>

          {/* =====Recent Table section ======== */}

          {/* TABLE SECTION */}
          <div className="w-full  rounded-lg  overflow-y-auto">
            <div className="h-[600px] rounded-tl-[8px] rounded-tr-[8px] bg-white">
              {/* Table */}
              {isLoading ? (
                <div className="text-center pt-10 mx-auto text-[#787878]">
                  <Spinner />
                </div>
              ) : (
                <TableMain
                  data={
                    filteredActivityLogsData ? filteredActivityLogsData : []
                  }
                  columns={columns}
                  tableClass=" font-medium text-small"
                  filters={{
                    email: searchFilter,
                  }}
                />
              )}
            </div>
          </div>
        </section>
      </div>

      {/* ===============Modals ============ */}
      {/* =======LogDetails modal ====== */}
      <Modal
        show={showLogDetails}
        onClose={() => {
          setShowLogDetails(false);
        }}
      >
        <LogDetails
          setShowLogDetails={setShowLogDetails}
          activityLogsID={selectedRow?._id}
          handleFlaggingCase={handleFlaggingCase}
        />
      </Modal>

      {/* =====Confirm Delete Record Modal ===== */}
      <Modal
        show={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
      >
        <ConfirmDelete
          setShowConfirmDelete={setShowConfirmDelete}
          setShowSuccessMessage={setShowSuccessMessage}
          title="Delete record"
          content="Confirm Delete ?"
          buttonName="Confirm Delete"
          handleDelete={handleDelete}
        />
      </Modal>

      {/* =======Success Delete Record  Modal ====== */}
      <Modal
        show={showSuccessMessage}
        onClose={() => setShowSuccessMessage(false)}
      >
        <SuccessMessage
          setShowSuccessMessage={setShowSuccessMessage}
          title="Delete record"
          content="Record Deleted"
        />
      </Modal>
      <ToastContainer />
    </>
  );
};

export default LogInformationDetails;
