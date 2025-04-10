import { GrFormClose } from "react-icons/gr";

const HistoryDetails = ({
  setShowHistoryDetails,
  setShowConfirmDownload,
  setShowConfirmDelete,
}) => {
  return (
    <>
      <section className="w-full mt-10 pb-4 border-[1.2px] border-black bg-white max-w-[940px] mx-auto rounded-2xl">
        {/* ========== Headings and Close Button ========== */}
        <p className="font-semibold text-[20px] bg-[#524A4C]  text-white p-3 md:px-10 rounded-t-2xl flex justify-between">
          Record Details
          <span
            className="cursor-pointer  font-bold"
            onClick={() => setShowHistoryDetails(false)}
          >
            <GrFormClose size={30} />
          </span>
        </p>
        {/* ============== Content ============ */}
        <div>
          <div className="bg-white md:grid md:grid-cols-2 md:gap-6  p-3 py-6 md:p-10">
            {/* ====Property Title ====== */}
            <div className="max-w-[400px] mb-4">
              <p>Property Title (certificate of occupancy):</p>
              <p className="font-bold">Deelaw Housing & Real Estates Agency</p>
            </div>
            {/* ==== Registered Title ====== */}
            <div className="max-w-[400px] mb-4">
              <p>Registered Title number:</p>
              <p className="font-bold">LP24452168PD</p>
            </div>

            {/* =========== Location Property ========== */}
            <div className="max-w-[400px] mb-4">
              <p>Location/Address of Property:</p>
              <p className="font-bold">A120UJHGCF123</p>
            </div>

            {/* ========= Survey Plan ======== */}

            <div className="max-w-[400px] mb-4">
              <p> Survey plan number:</p>
              <p className="font-bold">Olivia Chinaza</p>
            </div>

            {/* ============ Owner Property ========== */}
            <div className="max-w-[400px] mb-4">
              <p>Name of Owner of property (optional):</p>
              <p className="font-bold">Plot 1-5 Lamido crescent, Abuja</p>
            </div>

            {/* ============ Case Status ========== */}
            <div className="max-w-[400px] mb-4">
              <p>Case Status</p>
              <p className="font-bold text-[#C4700E]">Pending</p>
            </div>

            {/* ============ Date ========== */}
            <div className="max-w-[400px] mb-4">
              <p>Last Updated: 20 Jan 2024</p>
              <p className="font-bold"></p>
            </div>
          </div>
        </div>

        {/* =========Buttons   (Remove Button and Download button) ======== */}
        <div className="flex gap-4 justify-end mt-1 border-t-[1.3px] border-slate-200 px-4 md:pr-10 pt-4">
          <>
            <div
              className="bg-[#ABABAB] w-[120px] rounded-xl text-center items-center text-[16px] flex justify-center text-white font-semibold p-2 cursor-pointer"
              onClick={() => setShowConfirmDelete(true)}
            >
              Delete
            </div>
            <div
              className="bg-[#000000] w-[160px] rounded-xl text-center text-white text-[16px] p-2 cursor-pointer font-semibold"
              onClick={() => setShowConfirmDownload(true)}
            >
              Download
            </div>
          </>
        </div>
      </section>
    </>
  );
};

export default HistoryDetails;
