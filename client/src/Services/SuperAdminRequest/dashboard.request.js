import axios from "axios";
const baseURL = import.meta.env.VITE_BASEURL;

// GET(READ) ALL DASHBOARD USERS REQUEST
export const GetDashboardUsersRequest = async (token) => {
  const response = await axios.get(`${baseURL}/superadmin/dashboard/users`, {
    maxBodyLength: Infinity,
    headers: {
      Accept: "application/vnd.connect.v1+json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  return data;
};

// GET(READ) ALL DASHBOARD ACTIVITY LOG REQUEST
export const GetDashboardActivityLogsRequest = async (token) => {
  const response = await axios.get(
    `${baseURL}/superadmin/dashboard/activitylog`,
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

// GET(READ) ALL DASHBOARD DATA REPORTS REQUEST
export const GetDashboardDataReportsRequest = async (token) => {
  const response = await axios.get(
    `${baseURL}/superadmin/dashboard/datareport`,
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

// GET(READ) TOTAL PENDING DATA REPORTS REQUEST
export const GetTotalPendingRequest = async (token) => {
  const response = await axios.get(
    `${baseURL}/superadmin/dashboard/totalpending`,
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

// GET(READ) TOTAL APPEAL DATA REPORTS REQUEST
export const GetTotalAppealRequest = async (token) => {
  const response = await axios.get(
    `${baseURL}/superadmin/dashboard/totalonappeal`,
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


// GET(READ) TOTAL DISPOSED DATA REPORTS REQUEST
export const GetTotalDisposedRequest = async (token) => {
  const response = await axios.get(
    `${baseURL}/superadmin/dashboard/totaldisposed`,
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

// GET(READ) TOTAL SEARCHES DATA REPORTS REQUEST
export const GetTotalSearchesRequest = async (token) => {
  const response = await axios.get(
    `${baseURL}/superadmin/dashboard/totalsearches`,
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
