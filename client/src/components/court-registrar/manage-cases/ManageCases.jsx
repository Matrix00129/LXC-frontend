import DashboardNavBar from "src/components/navbar/DashboardNavBar";
import { SearchIcon } from "../../../assets/SearchIcon";
import UploadedCases from "./UploadedCases";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Modal } from "../../Modals/Modal";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import SuccessMessage from "../../Modals/SuccessMessage";
import AddCase from "./AddCase";

const ManageCases = () => {
  const [showUploadCaseForm, setShowUploadCaseForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <>
      <div>
        {/* =======Navigation Bar ======== */}
        <section>
          <DashboardNavBar
            headings="Manage Cases"
            subHeadings=""
            setSearchFilter={setSearchFilter}
          />
        </section>
        {/* =========Search button and search text ========= */}
        <section>
          <div className="mt-10 border-b border-slate-300 space-y-4 md:flex md:space-y-4 items-center justify-between pb-4">
            <div className="relative p-2  bg-white rounded-xl cursor-pointer">
              <span className="absolute left-4 bottom-3 cursor-pointer">
                <SearchIcon />
              </span>
              <input
                type="text"
                name="searchCases"
                placeholder="search cases"
                className="outline-none focus:out-none ml-4 pl-4"
                onChange={(event) => setSearchFilter(event.target.value)}
              />
            </div>
            <div
              onClick={() => setShowUploadCaseForm(true)}
              className="bg-[#524A4C] w-[180px] text-center rounded-lg p-3 text-white cursor-pointer  flex items-center justify-center gap-2"
            >
              <IoIosAdd size={32} />
              Upload new
            </div>
          </div>
        </section>
        {/* =========== Upload Cases ========== */}
        <section>
          <UploadedCases searchFilter={searchFilter} />
        </section>
      </div>

      {/* =====================Modals ================== */}
      <Modal
        show={showUploadCaseForm}
        onClose={() => setShowUploadCaseForm(false)}
      >
        <AddCase
          setShowUploadCaseForm={setShowUploadCaseForm}
          setShowSuccessMessage={setShowSuccessMessage}
        />
      </Modal>

      {/* ====Success Upload Modals ==== */}
      <Modal
        show={showSuccessMessage}
        onClose={() => {
          setShowSuccessMessage(false);
        }}
      >
        <SuccessMessage
          setShowSuccessMessage={setShowSuccessMessage}
          title="Upload case"
          content="Case Uploaded"
        />
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ManageCases;
