import DashboardNavBar from "src/components/navbar/DashboardNavBar";
import SearchHistory from "src/components/user/dashboard/SearchHistory";
import AnalyticsCard from "src/components/user/dashboard/AnalyticsCard";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { GetDashboardRequest } from "../Services/UserRequest/dashboard.request";
import { useState } from "react";
import { GetSettingsRequest } from "../Services/UserRequest/settings.request";

const UserDashboard = () => {
  const [searchFilter, setSearchFilter] = useState("");

  const { auth } = useAuth();
  const token = auth?.accessToken;

  const { data: userDashboardData } = useQuery({
    queryKey: ["getDashboardApi"],
    queryFn: () => GetDashboardRequest(token),
  });

  // React Tanstack Query for data fetching logic
  const { data: settingsData } = useQuery({
    queryKey: ["getSettingsApi"],
    queryFn: () => GetSettingsRequest(token),
  });
  return (
    <>
      <div className="">
        {/* =======Navigation Bar ======== */}
        <section>
          <DashboardNavBar
            headings="Dashboard"
            subHeadings=""
            setSearchFilter={setSearchFilter}
          />
        </section>
        {/* =====Analytics cards ====== */}
        <section>
          <AnalyticsCard
            userDashboardData={userDashboardData}
            settingsData={settingsData}
          />
        </section>
        {/* =========Search History ======== */}
        <section>
          <SearchHistory searchFilter={searchFilter} />
        </section>
      </div>
    </>
  );
};

export default UserDashboard;
