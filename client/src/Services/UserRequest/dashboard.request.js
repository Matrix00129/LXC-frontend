import axios from "axios";
const baseURL = import.meta.env.VITE_BASEURL;

//Get User Search History Data
export const GetDashboardRequest = async (token) => {
  const response = await axios.get(`${baseURL}/user/dashboard`, {
    maxBodyLength: Infinity,
    headers: {
      Accept: "application/vnd.connect.v1+json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  return data;
};
