import { BiDotsHorizontalRounded } from "react-icons/bi";
import { TableMain } from "../../table/TableMain";
import { createColumnHelper } from "@tanstack/react-table";
import { useRef, useState } from "react";
import { EditIcon } from "../../../assets/EditIcon";
import { IoIosArrowDown } from "react-icons/io";
import { Modal } from "../../Modals/Modal";
import ManageCaseDetails from "./ManageCaseDetails";
import ConfirmDelete from "../../Modals/ConfirmDelete";
import SuccessMessage from "../../Modals/SuccessMessage";
import useAuth from "../../../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteCaseRequest,
  GetCasesRequest,
} from "../../../Services/SuperAdminRequest/cases.request";
import { toast } from "react-toastify";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { PiFlagPennantBold } from "react-icons/pi";
import { FlaggedCaseRequest } from "../../../Services/SuperAdminRequest/flagged.request";
import EditCase from "./EditCase";
import { Skeleton } from "../../skeletons/Skeleton";

const UploadedCases = ({ searchFilter }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showActions, setShowActions] = useState(false);
  const [showManageCaseDetails, setShowManageCaseDetails] = useState(false);
  const [showUploadCaseForm, setShowUploadCaseForm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showSuccessUpdateMessage, setShowSuccessUpdateMessage] =
    useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const { auth } = useAuth();
  const token = auth.accessToken;

  // React Tanstack Query for data fetching logic
  const queryClient = useQueryClient();
  const { data: casesData, isLoading } = useQuery({
    queryKey: ["getCasesApi"],
    queryFn: () => GetCasesRequest(token),
  });

  // Ref
  const viewRef = useRef();

  const columnHelper = createColumnHelper();
  // Table columns
  const columns = [
    columnHelper.accessor("details", {
      cell: (info) => (
        <span className="">{info?.row?.original?.propertyTitle}</span>
      ),
      header: () => <span>Property Title (cert of occupancy)</span>,
    }),
    columnHelper.accessor("propertyLocation", {
      cell: (info) => <span className="">{info?.row?.original?.state}</span>,
      header: () => <span>Location of Property</span>,
    }),
    columnHelper.accessor("statusDispute", {
      cell: (info) => (
        <div
          className={`rounded-xl bg-[#EEEEEE] border-[1.4px] p-2 w-[100px] font-normal flex items-center justify-between ${
            info?.row?.original?.statusDispute === "Disposed"
              ? "border-[#137B10] text-[#137B10]"
              : info?.row?.original?.statusDispute === "Pending"
              ? "border-[#C4700E] text-[#C4700E]"
              : "border-[#D23737] text-[#D23737]"
          }`}
        >
          {info?.row?.original?.statusDispute}{" "}
          <span>
            <IoIosArrowDown />
          </span>
        </div>
      ),
      header: () => <span>Status</span>,
    }),

    columnHelper.accessor("details", {
      cell: ({ row }) => (
        <div
          className="font-normal rounded-xl border-[1.3px] border-slate-300 p-2 text-center"
          onClick={() => {
            setSelectedRow(row?.original);
            setShowManageCaseDetails(true);
          }}
        >
          See details
        </div>
      ),
      header: () => <span></span>,
    }),

    columnHelper.accessor("edit", {
      cell: ({ row }) => (
        <div
          className="font-normal p-2 text-center cursor-pointer"
          onClick={() => {
            setSelectedRow(row?.original);
            setShowUploadCaseForm(true);
          }}
        >
          <EditIcon />
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
                  <PiFlagPennantBold size={20} className=" " />
                  Flag case
                </p>
                <p
                  className="p-3 gap-2  flex cursor-pointer hover:bg-gray-100 border-[1.2px] border-slate-200"
                  onClick={() => {
                    setShowConfirmDelete(true);
                  }}
                >
                  <MdOutlineDeleteOutline size={20} className="" />
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

  // Delete Case Logic
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await DeleteCaseRequest(token, selectedRow?._id);
      toast.success("Cases Deleted Successful");
      setShowManageCaseDetails(false);
      queryClient.invalidateQueries("getCasesApi");
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Flagging A Case Logic
  const handleFlaggingCase = async () => {
    try {
      await FlaggedCaseRequest(token, selectedRow?._id);
      toast.success("A Case flagged Successful");
      setShowManageCaseDetails(false);
      queryClient.invalidateQueries("getCasesApi");
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  // Search Filter Functionality logic
  const filteredCasesData = casesData?.data?.cases?.filter((item) => {
    const searchQuery = searchFilter.toLowerCase();
    return (
      item.propertyTitle?.toLowerCase().includes(searchQuery) ||
      item.state?.toLowerCase().includes(searchQuery) ||
      item.statusDispute?.toLowerCase()?.includes(searchFilter)
    );
  });

  return (
    <>
      <div>
        <section>
          <div className="mt-10 bg-white h-[450px] rounded-2xl p-4 md:p-8">
            <div className="md:flex space-y-4 md:space-y-0 justify-between">
              <p className="text-[16px] md:text-[20px] font-semibold">
                Uploaded cases
              </p>
              {/* <div className="text-[16px] flex items-center justify-center gap-4 rounded-2xl w-[120px] border-[1.3px] border-slate-300 p-1 cursor-pointer transition duration-700 ease-in-out hover:bg-slate-300 hover:text-gray-700">
                Sort By
                <span>
                  <IoIosArrowDown />
                </span>
              </div> */}
            </div>
            {/* TABLE SECTION */}
            <div className="w-full  border-[1.3px] border-[#E8E8E8] p-6 rounded-2xl  overflow-y-auto mt-6">
              <div className="h-[280px] rounded-tl-[8px] rounded-tr-[8px] bg-white">
                {/* Table */}
                {isLoading ? (
                  <div className="text-center mx-auto text-[#787878]">
                    <Skeleton />
                  </div>
                ) : (
                  <TableMain
                    data={filteredCasesData ? filteredCasesData : []}
                    columns={columns}
                    tableClass=" font-medium text-small"
                    filters={{
                      propertyTitle: searchFilter,
                      state: searchFilter,
                      statusDispute: searchFilter,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ==========================Modals ======================= */}

      {/* ====== Manage Case Details Modal ======= */}
      <Modal
        show={showManageCaseDetails}
        onClose={() => setShowManageCaseDetails(false)}
      >
        <ManageCaseDetails
          setShowManageCaseDetails={setShowManageCaseDetails}
          setShowConfirmDelete={setShowConfirmDelete}
          setShowUploadCaseForm={setShowUploadCaseForm}
          manageCaseID={selectedRow ? selectedRow._id : null}
        />
      </Modal>

      {/* ====Edit case ===== */}
      <Modal
        show={showUploadCaseForm}
        onClose={() => setShowUploadCaseForm(false)}
      >
        <EditCase
          setShowUploadCaseForm={setShowUploadCaseForm}
          setShowSuccessUpdateMessage={setShowSuccessUpdateMessage}
          editCaseID={selectedRow ? selectedRow._id : null}
          casesData={casesData?.data?.cases}
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

      {/* ====Success  Updated Cases  Modals ==== */}
      <Modal
        show={showSuccessUpdateMessage}
        onClose={() => {
          setShowSuccessUpdateMessage(false);
        }}
      >
        <SuccessMessage
          setShowSuccessMessage={setShowSuccessUpdateMessage}
          title="Update case"
          content="Case Updated"
        />
      </Modal>
    </>
  );
};

export default UploadedCases;
