import axios from "axios";
const baseURL = import.meta.env.VITE_BASEURL;

// PAYMENT REQUEST
export const PaymentRequest = async (body, token) => {
  const response = await axios.post(`${baseURL}/payment/process`, body, {
    maxBodyLength: Infinity,
    headers: {
      Accept: "application/vnd.connect.v1+json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  return data;
};


// PAYMENT SEARCH REQUEST
export const PaymentSearchRequest = async (body, token) => {
  const response = await axios.post(`${baseURL}/payment/process/search`, body, {
    maxBodyLength: Infinity,
    headers: {
      Accept: "application/vnd.connect.v1+json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  return data;
};

// PAYMENT SEARCH AND REPORTS
export const PaymentSearchReportRequest = async (body, token) => {
  const response = await axios.post(`${baseURL}/payment/process/search_and_download`, body, {
    maxBodyLength: Infinity,
    headers: {
      Accept: "application/vnd.connect.v1+json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  return data;
};


// GET(READ) DOWNLOAD CASE REQUEST
export const GetDownloadCaseRequest = async (userId, referenceId) => {
  const response = await axios.get(
    `${baseURL}/download/${userId}/${referenceId}`,
    {
      maxBodyLength: Infinity,
      headers: {
        Accept: "application/vnd.connect.v1+json",
        // Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.data;
  return data;
};


// GET(READ) SAVE FILE TO EMAIL REQUEST
export const GetSaveFileToEmailRequest = async (userId, referenceId) => {
  const response = await axios.get(
    `${baseURL}/payment/send/${userId}/${referenceId}`,
    {
      maxBodyLength: Infinity,
      headers: {
        Accept: "application/vnd.connect.v1+json",
        // Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.data;
  return data;
};
