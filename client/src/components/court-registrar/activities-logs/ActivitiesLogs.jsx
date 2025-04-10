import DashboardNavBar from "src/components/navbar/DashboardNavBar";
import LogInformation from "./LogInformation";
import { useState } from "react";

const RegistrarActivitiesLogs = () => {
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

        {/* =========LOG INFORMATION ENCLOSED INSIDE TABLE======== */}
        <section>
          <div className="mt-10 ">
            <LogInformation
              setSearchFilter={setSearchFilter}
              searchFilter={searchFilter}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default RegistrarActivitiesLogs;
