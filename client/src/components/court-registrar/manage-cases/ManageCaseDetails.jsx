import { useQuery } from "@tanstack/react-query";
import { GrFormClose } from "react-icons/gr";
import {
  GetCaseByIdRequest,
  formatDate,
} from "../../../Services/CourtRegistrarRequest/cases.request";
import useAuth from "../../../hooks/useAuth";

const ManageCaseDetails = ({
  setShowManageCaseDetails,
  setShowConfirmDelete,
  setShowUploadCaseForm,
  manageCaseID,
}) => {
  const caseID = manageCaseID;

  // get token from useAuth
  const { auth } = useAuth();
  const token = auth?.accessToken;

  // React Tanstack Query for data fetching logic
  const { data: caseData } = useQuery({
    queryKey: ["getCaseIdApi"],
    queryFn: () => GetCaseByIdRequest(token, caseID),
  });

  console.log(caseData, "this is case data ====");
  return (
    <>
      <section className="mt-10 pb-4 border-[1px] border-black rounded-2xl bg-white max-w-[940px] mx-auto">
        {/* ========== Headings and Close Button ========== */}
        <p className="font-semibold text-[20px] bg-[#524A4C] text-white  p-3 md:px-10 rounded-t-2xl flex justify-between">
          Record Details
          <span
            className="cursor-pointer  font-bold"
            onClick={() => setShowManageCaseDetails(false)}
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
              <p className="font-bold">{caseData?.data?.case?.propertyTitle}</p>
            </div>
            {/* ==== Registered Title ====== */}
            <div className="max-w-[400px] mb-4">
              <p>Registered Title number:</p>
              <p className="font-bold">
                {caseData?.data?.case?.registeredTitleNumber}
              </p>
            </div>

            {/* ======= Location Property ======= */}
            <div className="max-w-[400px] mb-4">
              <p>Location/Address of Property:</p>
              <p className="font-bold">
              {` ${caseData?.data?.case?.plotStreetName}, ${caseData?.data?.case?.city}, ${caseData?.data?.case?.lga}, ${caseData?.data?.case?.state} `}
              </p>
            </div>

            {/* ========= Survey Plan ======== */}

            <div className="max-w-[400px] mb-4">
              <p> Survey plan number:</p>
              <p className="font-bold">
                {" "}
                {caseData?.data?.case?.surveyPlanNumber}
              </p>
            </div>

            {/* ============ Owner Property ========== */}
            <div className="max-w-[400px] mb-4">
              <p>Name of Owner of property (optional):</p>
              <p className="font-bold">
                {" "}
                {caseData?.data?.case?.propertyOwner}
              </p>
            </div>

            {/* ============ Case Status ========== */}
            <div className="max-w-[400px] mb-4">
              <p>Case Status</p>
              <p className="font-bold text-[#C4700E]">
                {" "}
                {caseData?.data?.case?.statusDispute}
              </p>
            </div>

            {/* ============ Date ========== */}
            <div className="max-w-[400px] mb-4">
              <p>Last Updated: {formatDate(caseData?.data?.case?.updatedAt)}</p>
            </div>
          </div>
        </div>

        {/* =========Buttons   (Remove Button and Download button) ======== */}
        <div className="flex gap-4 justify-end mt-1 border-t-[1.3px] border-slate-200 px-4 md:pr-10 pt-4">
          <>
            <div
              className="bg-[#EEEEEE] w-[120px] rounded-xl text-center items-center text-[16px] flex justify-center text-gray-700 border-[1.4px] border-slate-400 font-semibold p-2 cursor-pointer"
              onClick={() => {
                setShowUploadCaseForm(true);
                setShowManageCaseDetails(false);
              }}
            >
              Edit
            </div>
            <button
              className="bg-[#000000] w-[120px] rounded-xl text-center items-center text-[16px] flex justify-center text-white font-semibold p-2 cursor-pointer"
              onClick={() => {
                setShowConfirmDelete(true), setShowManageCaseDetails(false);
              }}
            >
              Delete
            </button>
          </>
        </div>
      </section>
    </>
  );
};

export default ManageCaseDetails;
