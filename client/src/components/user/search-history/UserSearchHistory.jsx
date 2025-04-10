import DashboardNavBar from "src/components/navbar/DashboardNavBar";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { TableMain } from "../../table/TableMain";
import HistoryDetails from "../dashboard/HistoryDetails";
import { Modal } from "../../Modals/Modal";
import ConfirmDelete from "../../Modals/ConfirmDelete";
import SuccessMessage from "../../Modals/SuccessMessage";
import DownloadRecord from "src/components/Modals/DownloadRecord";
import { GetSearchHistoryRequest } from "../../../Services/UserRequest/searchHistory.request";

const UserSearchHistory = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showHistoryDetails, setShowHistoryDetails] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showConfirmDownload, setShowConfirmDownload] = useState(false);
  const [showSuccessDownloadMessage, setShowSuccessDownloadMessage] =
    useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const { auth } = useAuth();
  const token = auth?.accessToken;

  //Tanstack Query data fetching logic
  const { data: userSearchHistoryData } = useQuery({
    queryKey: ["getUserSearchHistoryApi"],
    queryFn: () => GetSearchHistoryRequest(token),
  });

  const columnHelper = createColumnHelper();
  // Table columns
  const columns = [
    columnHelper.accessor("propertyTitle", {
      cell: (info) => (
        <span>{`${info?.row?.original?.entityId?.propertyTitle}`}</span>
      ),
      header: () => <span>Property Title (cert of occupancy)</span>,
    }),
    columnHelper.accessor("location", {
      cell: (info) => (
        <span className="">
          {info?.row?.original?.entityId?.state}
        </span>
      ),
      header: () => <span>Location of Property</span>,
    }),
    columnHelper.accessor("Status", {
      cell: (info) => (
        <div
          className={`rounded-xl bg-[#EEEEEE] text-center border-[1.4px] p-1 w-[100px] font-normal ${
            info?.row?.original?.entityId?.statusDispute === "Disposed"
              ? "border-[#137B10] text-[#137B10]"
              : info?.row?.original?.entityId?.statusDispute === "Pending"
              ? "border-[#C4700E] text-[#C4700E]"
              : "border-[#D23737] text-[#D23737]"
          }`}
        >
          {info?.row?.original?.entityId?.statusDispute}
        </div>
      ),
      header: () => <span>Status</span>,
    }),
    columnHelper.accessor("registerTitleNo", {
      cell: (info) => (
        <span className="">
          {info?.row?.original?.entityId?.registeredTitleNumber}
        </span>
      ),
      header: () => <span>Registered Title number</span>,
    }),
    columnHelper.accessor("details", {
      cell: (row) => (
        <div
          className="font-normal border-[1.5px] border-slate-300 w-[100px] text-center p-1 rounded-xl"
          onClick={() => {
            setSelectedRow(row.original);
            setShowHistoryDetails(true);
            // setShowManageCaseDetails(row.original.id)
          }}
        >
          See Details
        </div>
      ),
      header: () => <span></span>,
    }),
  ];

  // Search Filter Functionality logic
  const filteredSearchesHistoryData =
    userSearchHistoryData?.data?.searches?.filter((item) => {
      const searchQuery = searchFilter?.toLowerCase();
      return (
        item?.entityId?.propertyTitle?.toLowerCase().includes(searchQuery) ||
        item?.entityId?.state?.toLowerCase().includes(searchQuery) ||
        item?.entityId?.statusDispute?.toLowerCase()?.includes(searchFilter)
      );
    });

  return (
    <>
      <div>
        <section>
          <DashboardNavBar
            headings="Search History"
            subHeadings=""
            setSearchFilter={setSearchFilter}
          />
        </section>
        <section>
          <div className="mt-10 bg-[#E8E8E8]/40 rounded-2xl p-4 md:p-8">
            <div className="flex justify-between">
              <p className="text-[16px] md:text-[20px] font-extrabold">
                Searched History
              </p>
            </div>
            {/* TABLE SECTION */}
            <div className="w-full  rounded-lg  overflow-y-auto mt-6">
              <div className="h-auto rounded-tl-[8px] rounded-2xl bg-white">
                {/* Table */}
                <TableMain
                  data={
                    filteredSearchesHistoryData
                      ? filteredSearchesHistoryData
                      : []
                  }
                  columns={columns}
                  tableClass=" font-medium text-small"
                  filters={{
                    propertyTitle: searchFilter,
                    state: searchFilter,
                    statusDispute: searchFilter,
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ==========================Modals ======================= */}

      {/* ====== History Details Modal ======= */}
      <Modal
        show={showHistoryDetails}
        onClose={() => setShowHistoryDetails(false)}
      >
        <HistoryDetails
          setShowHistoryDetails={setShowHistoryDetails}
          setShowConfirmDelete={setShowConfirmDelete}
          setShowConfirmDownload={setShowConfirmDownload}
          historyID={selectedRow ? selectedRow.id : null}
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
          buttonName="Delete"
        />
      </Modal>
      {/* =======Success Delete Record  Modal ====== */}
      <Modal
        show={showSuccessMessage}
        onClose={() => setShowSuccessMessage(false)}
      >
        <SuccessMessage
          setShowSuccessMessage={setShowSuccessMessage}
          header="Delete Record"
          title="Record Deleted"
        />
      </Modal>

      {/* =====Confirm Download Record Modal ===== */}
      <Modal
        show={showConfirmDownload}
        onClose={() => setShowConfirmDownload(false)}
      >
        {/* <ConfirmDownload
            setShowConfirmDownload={setShowConfirmDownload}
            setShowSuccessDownloadMessage={setShowSuccessDownloadMessage}
            title="Download record"
            content="Save to files"
            buttonName="Download"
          /> */}
        <DownloadRecord
          setShowConfirmDownload={setShowConfirmDownload}
          setShowSuccessDownloadMessage={setShowSuccessDownloadMessage}
        />
      </Modal>

      {/* =======Success Download Record Message ====== */}
      <Modal
        show={showSuccessDownloadMessage}
        onClose={() => setShowSuccessDownloadMessage(false)}
      >
        <SuccessMessage
          setShowSuccessDownloadMessage={setShowSuccessDownloadMessage}
          header="Download Record"
          title="Record Downloaded"
        />
      </Modal>
    </>
  );
};

export default UserSearchHistory;
