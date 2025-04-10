import StatisticsCard from "src/components/court-registrar/dashboard/StatisticsCard";
import DashboardNavBar from "src/components/navbar/DashboardNavBar";
import Buttons from "src/components/court-registrar/dashboard/Buttons";
import UploadedCases from "src/components/court-registrar/dashboard/UploadedCases";
import { Modal } from "../components/Modals/Modal";
import { useState } from "react";
import SuccessMessage from "../components/Modals/SuccessMessage";
import AddCase from "../components/court-registrar/manage-cases/AddCase";
import { useQuery } from "@tanstack/react-query";
import { GetSettingsRequest } from "../Services/CourtRegistrarRequest/settings.request";
import useAuth from "../hooks/useAuth";

const CourtRegistrarDashboard = () => {
  const [showUploadCaseForm, setShowUploadCaseForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  // get token from useAuth
  const { auth } = useAuth();
  const token = auth?.accessToken;

  // React Tanstack Query for data fetching logic
  const { data: settingsData } = useQuery({
    queryKey: ["getRegistrarSettingsApi"],
    queryFn: () => GetSettingsRequest(token),
  });

  return (
    <>
      <div className="pb-10 mt-[-10px]">
        {/* =======Navigation Bar ======== */}
        <section>
          <DashboardNavBar
            headings="Court Registrar"
            subHeadings={` ${settingsData?.data?.courtName}, ${settingsData?.data?.judicialDivision} `}
            subHeadingsTwo={`Court Room Number: ${settingsData?.data?.courtRoomNo}`}
            setSearchFilter={setSearchFilter}
          />
        </section>

        {/* ========Statistics Card ======== */}
        <section>
          <StatisticsCard />
        </section>

        {/* ======== Buttons Section ======== */}
        <section>
          <Buttons
            setShowUploadCaseForm={setShowUploadCaseForm}
            setSearchFilter={setSearchFilter}
          />
        </section>

        {/* ======== Divider ======== */}
        <div className="h-[0.0625rem] bg-[#c4c4c4]"></div>

        {/* ====== Uploaded Cases ==== */}
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
    </>
  );
};

export default CourtRegistrarDashboard;
