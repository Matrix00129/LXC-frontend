import DashboardNavBar from "src/components/navbar/DashboardNavBar";
import LogInformationDetails from "./LogInformationDetails";
import { useState } from "react";

const MoreActivityLogs = () => {
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <>
      <div>
        {/* ===========Navigation Bar ======== */}
        <section>
          <DashboardNavBar
            headings="Activity logs"
            subHeadings=""
            setSearchFilter={setSearchFilter}
          />
        </section>

        {/* =========LOG INFORMATION DETAILS ENCLOSED INSIDE TABLE======== */}
        <section>
          <div className="mt-10 ">
            <LogInformationDetails
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default MoreActivityLogs;
