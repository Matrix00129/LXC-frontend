import axios from "axios";
const baseURL = import.meta.env.VITE_BASEURL;

// GET(READ) ALL FLAGGED CASE REQUEST
export const GetFlaggedCasesRequest = async (token) => {
  const response = await axios.get(`${baseURL}/superadmin/cases/flags`, {
    maxBodyLength: Infinity,
    headers: {
      Accept: "application/vnd.connect.v1+json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  return data;
};

// GET(READ) FLAGGED CASES BY ID REQUEST
export const GetFlaggedCaseByIdRequest = async (token, flaggedCaseID) => {
  const response = await axios.get(
    `${baseURL}/superadmin/cases/search/${flaggedCaseID}`,
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


// FLAGGED A CASE  REQUEST
export const FlaggedCaseRequest = async (token, flaggedCaseID) => {
  const response = await axios.get(
    `${baseURL}/superadmin/cases/flag/${flaggedCaseID}`,
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



// REMOVE FLAGGED CASE  REQUEST
export const RemoveFlaggedCaseRequest = async (token, removeFlaggedCaseID) => {
  const response = await axios.delete(
    `${baseURL}/superadmin/cases/flag/remove/${removeFlaggedCaseID}`,
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


// DOWNLOAD FLAGGED CASE  REQUEST
export const DownloadFlaggedCaseByIdRequest = async (token, flaggedCaseID) => {
  const response = await axios.get(
    `${baseURL}/superadmin/cases/flag/download/${flaggedCaseID}`,
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
