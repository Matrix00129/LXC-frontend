import { useEffect, useState } from "react";
import BarChart from "../../Charts/BarChart";
import useAuth from "../../../hooks/useAuth";
import {
  GetTotalAppealRequest,
  GetTotalDisposedRequest,
  GetTotalPendingRequest,
  GetTotalSearchesRequest,
} from "../../../Services/SuperAdminRequest/dashboard.request";
import { filterReportData } from "../../../utils/LinkData";

const Report = () => {
  const { auth } = useAuth();
  const token = auth.accessToken;

   // State declarations for chart data
   const [pendingData, setPendingData] = useState({
    labels: [],
    datasets: [{ label: "Statistics", data: [], backgroundColor: ["#D5D5D5"] }],
  });
  const [appealData, setAppealData] = useState({
    labels: [],
    datasets: [{ label: "Statistics", data: [], backgroundColor: ["#D5D5D5"] }],
  });
  const [disposedData, setDisposedData] = useState({
    labels: [],
    datasets: [{ label: "Statistics", data: [], backgroundColor: ["#D5D5D5"] }],
  });
  const [searchesData, setSearchesData] = useState({
    labels: [],
    datasets: [{ label: "Statistics", data: [], backgroundColor: ["#D5D5D5"] }],
  });

  // Fetch data when component mounts
  useEffect(() => {
    getTotalPendingData();
    getTotalAppealData();
    getTotalDisposedData();
    getTotalSearchesData();
  }, []);

  // Function to fetch Total Pending data
  const getTotalPendingData = async () => {
    const { data } = await GetTotalPendingRequest(token);
    setPendingData({
      labels: Object.keys(data?.countsByMonth || {}),
      datasets: [
        {
          label: "Statistics",
          data: Object.values(data?.countsByMonth || {}),
          backgroundColor: ["#D5D5D5"],
        },
      ],
    });
  };

  // Function to fetch Total Appeal data
  const getTotalAppealData = async () => {
    const { data } = await GetTotalAppealRequest(token);
    setAppealData({
      labels: Object.keys(data?.countsByMonth || {}),
      datasets: [
        {
          label: "Statistics",
          data: Object.values(data?.countsByMonth || {}),
          backgroundColor: ["#D5D5D5"],
        },
      ],
    });
  };

  // Function to fetch Total Disposed data
  const getTotalDisposedData = async () => {
    const { data } = await GetTotalDisposedRequest(token);
    setDisposedData({
      labels: Object.keys(data?.countsByMonth || {}),
      datasets: [
        {
          label: "Statistics",
          data: Object.values(data?.countsByMonth || {}),
          backgroundColor: ["#D5D5D5"],
        },
      ],
    });
  };

  // Function to fetch Total Searches data
  const getTotalSearchesData = async () => {
    const { data } = await GetTotalSearchesRequest(token);
    setSearchesData({
      labels: Object.keys(data?.countsByMonth || {}),
      datasets: [
        {
          label: "Statistics",
          data: Object.values(data?.countsByMonth || {}),
          backgroundColor: ["#D5D5D5"],
        },
      ],
    });
  };

  // State for selected option and handler function
  const [selectedOption, setSelectedOption] = useState(
    filterReportData[0]?.name
  );

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Conditional rendering of the chart data
  let chartData;
  switch (selectedOption) {
    case "Total searches":
      chartData = searchesData;
      break;
    case "Pending records":
      chartData = pendingData;
      break;
    case "On-appeal records":
      chartData = appealData;
      break;
    case "Dismissed records":
      chartData = disposedData;
      break;
    default:
      chartData = searchesData;
  }


  return (
    <div>
      <div className="px-8 mb-10">
        <div className="pt-3 flex items-center justify-between">
          <h3 className="font-semibold text-[14px]  md:text-[20px]">
            Data Reports
          </h3>

          <select
            className="outline-none focus:out-none border-[1.3px] border-slate-300 p-2 rounded-lg cursor-pointer text-[12px]"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            {filterReportData?.map((item, idx) => (
              <option key={idx} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div style={{ height: 240 }} className="pb-12">
          {chartData && <BarChart ChartData={chartData} />}
        </div>
      </div>
    </div>
  );
};

export default Report;
