import { BiDotsHorizontalRounded } from "react-icons/bi";
import { createColumnHelper } from "@tanstack/react-table";
import { useRef, useState } from "react";
import { TableMain } from "../../table/TableMain";
import { PiFlagPennantBold } from "react-icons/pi";
import { MdOutlineDeleteOutline, MdOutlineFileDownload } from "react-icons/md";
import { Modal } from "../../Modals/Modal";
import FlaggedDetails from "./FlaggedDetails";
import { SearchIcon } from "../../../assets/SearchIcon";
import useAuth from "../../../hooks/useAuth";
import {
  GetFlaggedCasesRequest,
  RemoveFlaggedCaseRequest,
  formatDate,
} from "../../../Services/CourtRegistrarRequest/flagged.request";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "src/components/spinner/Spinner";

const FlaggedInformation = ({ setSearchFilter, searchFilter }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showActions, setShowActions] = useState(false);
  const [showFlaggedDetails, setShowFlaggedDetails] = useState(false);

  const { auth } = useAuth();
  const token = auth.accessToken;

  // React Tanstack Query for data fetching logic
  const queryClient = useQueryClient();

  const { data: flaggedCasesData, isLoading } = useQuery({
    queryKey: ["getFlaggedCaseApi"],
    queryFn: () => GetFlaggedCasesRequest(token),
  });

  // Ref
  const viewRef = useRef();

  const columnHelper = createColumnHelper();
  // Table columns
  const columns = [
    columnHelper.accessor("flag", {
      cell: () => (
        <div className="text-[#F12525]">
          <PiFlagPennantBold size={18} />
        </div>
      ),
      header: () => <span></span>,
    }),
    columnHelper.accessor("details", {
      cell: (info) => (
        <span className="font-normal">
          {" "}
          <span className="font-semibold">
            {info?.row?.original?.userDetails?.firstName}{" "}
            {info?.row?.original?.userDetails?.lastName}{" "}
          </span>{" "}
          {info?.row?.original?.userDetails?.lastName}{" "}
          {formatDate(info?.row?.original?.updatedAt)}
        </span>
      ),
      header: () => <span></span>,
    }),
    columnHelper.accessor("review", {
      cell: (info) => (
        <div className="relative">
          <p
            onClick={() => {
              setSelectedRow(info?.row?.original);
              setShowActions(false);
              setShowFlaggedDetails(true);
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
        <div className="relative">
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
                  onClick={handleRemoveFlaggedCase}
                >
                  <MdOutlineDeleteOutline
                    size={20}
                    className="text-[#E82F2F] "
                  />
                  Remove
                </p>
                <p className="p-3 gap-2  flex cursor-pointer hover:bg-gray-100 border-[1.2px] border-slate-200">
                  <MdOutlineFileDownload size={20} className=" " />
                  Download
                </p>
              </div>
            </div>
          )}
        </div>
      ),
      header: "",
    }),
  ];

  // Remove Flagged Case Logic
  const handleRemoveFlaggedCase = async () => {
    try {
      await RemoveFlaggedCaseRequest(token, selectedRow?.caseDetails?._id);
      toast.success("Flagged Case Removed Successful");
      queryClient.invalidateQueries("getFlaggedCaseApi");
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  // Search Filter Functionality logic
  const filteredFlaggedCasesData = flaggedCasesData?.data?.flaggedCases?.filter(
    (item) => {
      const searchQuery = searchFilter.toLowerCase();
      return (
        item?.userDetails?.firstName?.toLowerCase().includes(searchQuery) ||
        item?.userDetails?.lastName?.toLowerCase().includes(searchQuery)
      );
    }
  );

  return (
    <>
      <div>
        <section className="bg-white rounded-2xl p-4 md:p-10 ">
          {flaggedCasesData?.data?.flaggedCases?.length > 0 && (
            <div className="md:flex space-y-4 md:space-y-0 justify-between">
              <div className="relative p-2  bg-[#EEEFF4] rounded-xl cursor-pointer">
                <span className="absolute left-4 bottom-3 cursor-pointer">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  name="username"
                  placeholder="search Username..."
                  className="outline-none focus:out-none ml-4 pl-4 bg-[#EEEFF4] cursor-pointer"
                  onChange={(event) => setSearchFilter(event.target.value)}
                />
              </div>
            </div>
          )}

          {/* =========== Flagged Case Table section =========== */}

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
                    filteredFlaggedCasesData ? filteredFlaggedCasesData : []
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
      <Modal
        show={showFlaggedDetails}
        onClose={() => {
          setShowFlaggedDetails(false);
        }}
      >
        <FlaggedDetails
          setShowFlaggedDetails={setShowFlaggedDetails}
          flaggedCasesData={flaggedCasesData}
          flaggedCaseID={selectedRow?.caseDetails?._id}
          handleRemoveFlaggedCase={handleRemoveFlaggedCase}
        />
      </Modal>
      <ToastContainer />
    </>
  );
};

export default FlaggedInformation;
