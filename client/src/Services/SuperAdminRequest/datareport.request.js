import axios from "axios";
const baseURL = import.meta.env.VITE_BASEURL;


// GET(READ) ALL DASHBOARD DATA REPORTS REQUEST
export const GetDataUploadByAdminRequest = async (token) => {
  const response = await axios.get(
    `${baseURL}/superadmin/data/totaluploadbyadmins`,
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
