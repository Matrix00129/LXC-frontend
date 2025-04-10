import axios from "axios";
const baseURL = import.meta.env.VITE_BASEURL;

// GET(READ) ALL ACTIVITY LOG REQUEST
export const GetActivityLogsRequest = async (token) => {
  const response = await axios.get(`${baseURL}/registrar/activitylogs`, {
    maxBodyLength: Infinity,
    headers: {
      Accept: "application/vnd.connect.v1+json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  return data;
};

// GET(READ) SINGLE  ACTIVITY LOG DETAIL REQUEST
export const GetActivityLogsDetailRequest = async (token, activityID) => {
  const response = await axios.get(
    `${baseURL}/registrar/activitydetails/${activityID}`,
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

// DELETE ACTIVITY LOGS  REQUEST
export const DeleteActivityLogRequest = async (token, deleteActivityLogID) => {
  const response = await axios.delete(
    `${baseURL}/registrar/activitylogs/delete/${deleteActivityLogID}`,
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

// FUNCTION TO FORMAT DATE
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
};
