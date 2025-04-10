import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { formatDate } from "src/Services/SuperAdminRequest/flagged.request";
import NavBar from "src/components/navbar/NavBar";

const CaseInformationThree = ({
  selectedCaseData,
  setShowCaseInformation,
  setShowDownloadAndEmail,
}) => {
  const handleBackClick = () => {
    setShowCaseInformation(false);
    setShowDownloadAndEmail(true);
  };

  return (
    <>
      <section>
        <NavBar />
        {/* ========Search Result Info. goes here ===== */}
        <div className="mt-16 md:mt-24 md:max-w-[1100px] mx-auto xl:w-[1100px] xl:mt-18 xl:max-w-none  bg-[#FFFFFF] border border-[#E8E8E8] px-[1.3rem] pt-[1.6rem] rounded-[1rem] mb-6 sm:px-[3rem] sm:pt-4 sm:rounded-[1.3rem] sm:mb-[1.9rem] md:px-[1.5rem] md:pt-[2.438rem] md:rounded-[1.5rem] md:mb-[2.375rem]">
          {/* ====== Get access alert ====== */}
          <section className="bg-[#e4e3e3] w-full rounded-[0.35rem] py-[0.5rem] px-[1rem] sm:rounded-[0.5rem] sm:py-[0.7rem] sm:px-[1.3rem] md:py-[0.875rem] md:rounded-[0.688rem] md:px-[1.625rem]">
            <div className="flex flex-col items-center sm:flex-row sm:justify-between">
              <p className="italic">
                Showing search result: {selectedCaseData?.propertyLocation}
              </p>

              {/* ====== Get access button ====== */}
              {/* <button
                onClick={() => setShowBlurredScreenTwo(true)}
                className="bg-[#000000] text-[#FFFFFF] rounded-[0.4rem] w-[4.7rem] h-[1.5rem] text-[0.6rem] mt-[0.5rem] sm:rounded-[0.5rem] sm:w-[6rem] sm:h-[1.8rem] sm:text-[0.7rem] sm:mt-[0rem] md:rounded-[0.625rem] md:w-[7.313rem] md:h-[2.188rem] md:text-[0.875rem] md:mt-[0rem] cursor-pointer transition duration-700 ease-in-out hover:text-[#524A4C] hover:border-[#524A4C] hover:border-[1.3px] hover:bg-white"
              >
                Download
              </button> */}
            </div>
          </section>

          {/* ====== Search result section ====== */}
          <section className="mt-10 pb-4 rounded-2xl bg-white">
            {/* ============== Content ============ */}
            {/*======= Headings===== */}
            <h2 className="font-semibold text-xl px-3 md:p-4">
              Case Information
            </h2>
            <div>
              <div className="bg-white md:grid md:grid-cols-2 md:gap-6  p-3 py-6 md:p-4">
                {/* ====Property Title ====== */}
                <div className="max-w-[400px] mb-4">
                  <p>Property Title (certificate of occupancy):</p>
                  <p className="font-bold">{selectedCaseData?.propertyTitle}</p>
                </div>
                {/* ==== Registered Title ====== */}
                <div className="max-w-[400px] mb-4">
                  <p>Registered Title number:</p>
                  <p className="font-bold">
                    {selectedCaseData?.registeredTitleNumber}
                  </p>
                </div>

                {/* ======= Location Property ======= */}
                <div className="max-w-[400px] mb-4">
                  <p>Location/Address of Property:</p>
                  <p className="font-bold"> {selectedCaseData?.state}</p>
                </div>

                {/* ========= Survey Plan ======== */}

                <div className="max-w-[400px] mb-4">
                  <p> Survey plan number:</p>
                  <p className="font-bold"> {selectedCaseData?.surveyPlanNumber}</p>
                </div>

                {/* ============ Owner Property ========== */}
                <div className="max-w-[400px] mb-4">
                  <p>Name of Owner of property (optional):</p>
                  <p className="font-bold">
                    {" "}
                    {selectedCaseData?.propertyOwner}
                  </p>
                </div>

                {/* ============ Case Status ========== */}
                <div className="max-w-[400px] mb-4">
                  <p>Case Status</p>
                  <p className="font-bold text-[#C4700E]">
                    {" "}
                    {selectedCaseData?.statusDispute}
                  </p>
                </div>

                {/* ============ Date ========== */}
                <div className="max-w-[400px] mb-4">
                <div className="max-w-[400px] mb-4">
                  <p>Last Updated: {formatDate(selectedCaseData?.updatedAt)}</p>
                </div>
                </div>
              </div>
            </div>
            {/* <div className="flex gap-4 justify-end mt-1 px-4 md:pr-10 pt-4">
              <button
                onClick={handleBackClick} // Handle back button click
                className="bg-[#000000] w-[120px] rounded-xl text-center items-center text-[16px] flex justify-center text-white font-semibold p-2 cursor-pointer transition duration-700 ease-in-out hover:text-[#524A4C] hover:border-[#524A4C] hover:border-[1.3px] hover:bg-white"
              >
                Back
              </button>
            </div> */}

            {/* =========Buttons   (Remove Button and Download button) ======== */}
            <div className="flex gap-4 justify-end mt-1 px-4 md:pr-10 pt-4">
              <>
                <div
                  onClick={handleBackClick}
                  className="bg-[#EEEEEE] w-[120px] rounded-xl text-center items-center text-[16px] flex justify-center text-gray-700 border-[1.4px] border-slate-400 font-semibold p-2 cursor-pointer"
                >
                  Back
                </div>
                <button
                  onClick={() => setShowDownloadAndEmail(true)}
                  className="bg-[#000000] w-[120px] rounded-xl text-center items-center text-[16px] flex justify-center text-white font-semibold p-2 cursor-pointer transition duration-700 ease-in-out hover:text-[#524A4C] hover:border-[#524A4C] hover:border-[1.3px] hover:bg-white"
                >
                  Download
                </button>
              </>
            </div>
          </section>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default CaseInformationThree;
