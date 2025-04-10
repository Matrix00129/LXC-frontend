import { GrFormClose } from "react-icons/gr";
import {
  GetActivityLogsDetailRequest,
  formatDate,
} from "../../../Services/SuperAdminRequest/activitylogs.request";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const LogDetails = ({
  setShowLogDetails,
  activityLogsID,
  handleFlaggingCase,
}) => {
  const { auth } = useAuth();
  const token = auth.accessToken;

  // React Tanstack Query for data fetching logic
  const { data: activityLogsDetailData } = useQuery({
    queryKey: ["getActivityLogsDetailApi"],
    queryFn: () => GetActivityLogsDetailRequest(token, activityLogsID),
  });

  const activityLogsArray = activityLogsDetailData?.data?.details || [];
  const logsDetails = activityLogsArray?.find(
    (item) => item?._id === activityLogsID
  );

  return (
    <>
      <section className="mt-10 pb-4 border-[1px] border-black rounded-2xl bg-white max-w-[940px] mx-auto">
        {/* ========== Headings and Close Button ========== */}
        <p className="font-semibold text-[20px] bg-[#524A4C]   text-white  p-3 md:px-10 rounded-t-2xl flex justify-between">
          Record Details
          <span
            className="cursor-pointer  font-bold"
            onClick={() => setShowLogDetails(false)}
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
              <p className="font-bold">
                {logsDetails?.entityId?.propertyTitle}
              </p>
            </div>
            {/* ==== Registered Title ====== */}
            <div className="max-w-[400px] mb-4">
              <p>Registered Title number:</p>
              <p className="font-bold">
                {" "}
                {logsDetails?.entityId?.registeredTitleNumber}
              </p>
            </div>

            {/* =========== Location Property ========== */}
            <div className="max-w-[400px] mb-4">
              <p>Location/Address of Property:</p>
              <p className="font-bold">
                {" "}
                {logsDetails?.entityId?.state}
              </p>
            </div>

            {/* ========= Survey Plan ======== */}

            <div className="max-w-[400px] mb-4">
              <p> Survey plan number:</p>
              <p className="font-bold">
                {" "}
                {logsDetails?.entityId?.surveyPlanNumber}
              </p>
            </div>

            {/* ============ Owner Property ========== */}
            <div className="max-w-[400px] mb-4">
              <p>Name of Owner of property (optional):</p>
              <p className="font-bold">
                {" "}
                {logsDetails?.entityId?.propertyOwner}
              </p>
            </div>

            {/* ============ Case Status ========== */}
            <div className="max-w-[400px] mb-4 flex gap-10">
              <div>
                <p>Previous Status</p>
                <p className="font-bold text-[#C4700E]">
                  {" "}
                  {logsDetails?.entityId?.statusDispute}
                </p>
              </div>
              <div>
                <p>Updated Status</p>
                <p className="font-bold text-[#137B10]">Closed</p>
              </div>
            </div>

            {/* ============Last updated ========== */}
            <div className="max-w-[400px] mb-4">
              <p>
                Last Updated: {formatDate(logsDetails?.entityId?.updatedAt)}
              </p>
            </div>

            {/* ============ UpDate By========== */}
            <div className="max-w-[400px] mb-4">
              <p>Updated by : </p>
              <p className="font-bold"></p>
            </div>
          </div>
        </div>

        {/* =========Buttons   (Back Button and Comment button) ======== */}
        <div className="flex gap-10 justify-end mt-1 border-t-[1.3px] border-slate-200 px-4 md:pr-10 pt-4">
          <>
            <div
              className="bg-[#8E8E8E] w-[120px] rounded-xl text-center items-center text-[18px] flex justify-center text-white font-semibold p-2 cursor-pointer"
              onClick={() => setShowLogDetails(false)}
            >
              Back
            </div>
            <div
              className="bg-[#000000] w-[160px] rounded-xl text-center text-white text-[18px] p-2 cursor-pointer font-semibold"
              onClick={handleFlaggingCase}
            >
              Flag Case
            </div>
          </>
        </div>
      </section>
    </>
  );
};

export default LogDetails;
