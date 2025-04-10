import axios from "axios";
const baseURL = import.meta.env.VITE_BASEURL;

// GET(READ) ALL DASHBOARD ACTIVITY LOG REQUEST
export const GetDashboardActivityLogsRequest = async (token) => {
  const response = await axios.get(
    `${baseURL}/registrar/dashboard`,
    {
      maxBodyLength: Infinity,
      headers: {
        Accept: "application/vnd.connect.v1+json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.data;
  return data;
};
