import DashboardNavBar from "src/components/navbar/DashboardNavBar";
import FlaggedInformation from "./FlaggedInformation";
import { useState } from "react";

const FlaggedCasesHome = () => {
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <>
      <div>
        {/* ===========Navigation Bar ======== */}
        <section>
          <DashboardNavBar
            headings="Flagged Cases"
            subHeadings=""
            setSearchFilter={setSearchFilter}
          />
        </section>
        {/* ============= Main Content  ============== */}
        <section>
          <div className="mt-10 ">
            <FlaggedInformation
              setSearchFilter={setSearchFilter}
              searchFilter={searchFilter}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default FlaggedCasesHome;
