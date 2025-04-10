import DashboardNavBar from "src/components/navbar/DashboardNavBar";
import SummaryCard from "./SummaryCard";
import LogInformation from "./LogInformation";
import useAuth from "../../../hooks/useAuth";
import {
  GetActivityLogsRequest,
  GetNewActivityLogsRequest,
} from "../../../Services/SuperAdminRequest/activitylogs.request";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const ActivitiesLogs = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const { auth } = useAuth();
  const token = auth.accessToken;

  // React Tanstack Query for data fetching logic
  const { data: activityLogsData, isLoading } = useQuery({
    queryKey: ["getActivityLogsApi"],
    queryFn: () => GetActivityLogsRequest(token),
  });

  console.log(activityLogsData, "this is the data ===");

  const { data: newActivityLogsData } = useQuery({
    queryKey: ["getNewActivityLogsApi"],
    queryFn: () => GetNewActivityLogsRequest(token),
  });
  console.log(newActivityLogsData, "this is the  NEW ACTIVIT LOG data ===");

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
        {/* ============= Cards  ============== */}
        <section>
          <div className="mt-10 ">
            <SummaryCard
              activityLogsData={activityLogsData}
              newActivityLogsData={newActivityLogsData}
            />
          </div>
        </section>

        {/* =========LOG INFORMATION ENCLOSED INSIDE TABLE======== */}
        <section>
          <div className="mt-10 ">
            <LogInformation
              activityLogsData={activityLogsData}
              isLoading={isLoading}
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default ActivitiesLogs;
