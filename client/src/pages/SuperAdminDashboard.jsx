import Recent from "src/components/super-admin/dashboard/Recent";
import StatisticsCard from "src/components/super-admin/dashboard/StatisticsCard";
import DashboardNavBar from "src/components/navbar/DashboardNavBar";
import ReportUsers from "src/components/super-admin/dashboard/ReportUsers";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { GetActivityLogsRequest } from "../Services/SuperAdminRequest/activitylogs.request";
import { GetDashboardActivityLogsRequest } from "../Services/SuperAdminRequest/dashboard.request.js";
import { useState } from "react";

const SuperAdminDashboard = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const { auth } = useAuth();
  const token = auth?.accessToken;

  // React Tanstack Query for data fetching logic
  const { data: activityLogsData } = useQuery({
    queryKey: ["getDashboardActivityLogsApi"],
    queryFn: () => GetDashboardActivityLogsRequest(token),
  });

  // React Tanstack Query for data fetching logic
  const { data: reviewData, isLoading } = useQuery({
    queryKey: ["getActivityLogsApi"],
    queryFn: () => GetActivityLogsRequest(token),
  });

  return (
    <>
      <div className="pb-10 mt-[-18px]">
        {/* =======Navigation Bar ======== */}
        <section>
          <DashboardNavBar
            headings="Super Admin"
            subHeadings="Track your searches and manage overall activities"
            setSearchFilter={setSearchFilter}
          />
        </section>
        {/* ========Statistics Card ======== */}
        <section>
          <StatisticsCard activityLogsData={activityLogsData} />
        </section>
        {/* ========Recent Section ========= */}
        <section>
          <Recent
            activityLogsData={reviewData}
            isLoading={isLoading}
            searchFilter={searchFilter}
            setSearchFilter={setSearchFilter}
          />
        </section>
        
        {/* ======Chart and UserList ==== */}
        <section>
          <ReportUsers />
        </section>
      </div>
    </>
  );
};

export default SuperAdminDashboard;
