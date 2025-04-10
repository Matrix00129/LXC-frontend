import axios from "axios";
const baseURL = import.meta.env.VITE_BASEURL;

// GET(READ) ALL CASES REQUEST
export const GetCasesRequest = async (token) => {
  const response = await axios.get(`${baseURL}/registrar/cases/all`, {
    maxBodyLength: Infinity,
    headers: {
      Accept: "application/vnd.connect.v1+json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  return data;
};

// GET(READ) ALL CASES REQUEST BY ID
export const GetCaseByIdRequest = async (token, caseID) => {
  const response = await axios.get(
    `${baseURL}/registrar/cases/search/${caseID}`,
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

// CREATE NEW CASE REQUEST
export const CreateCaseRequest = async (body, token) => {
  try {
    const response = await axios.post(`${baseURL}/registrar/cases/new`, body, {
      headers: {
        Accept: "application/vnd.connect.v1+json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    console.log(data, "data is here");
    if (!data) return;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// EDIT CASE BY ID REQUEST
export const EditCaseRequest = async (token, editCaseID, body) => {
  try {
    const response = await axios.put(
      `${baseURL}/registrar/cases/update/${editCaseID}`,
      body,
      {
        headers: {
          Accept: "application/vnd.connect.v1+json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    console.log(data);
    if (!data) return;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// DELETE CASE  REQUEST
export const DeleteCaseRequest = async (token, deleteCaseID) => {
  const response = await axios.delete(
    `${baseURL}/registrar/cases/delete/${deleteCaseID}`,
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



// GET(READ) DOWNLOAD CASE REQUEST
export const GetDownloadCaseRequest = async (token, caseID) => {
  const response = await axios.get(
    `${baseURL}/registrar/cases/search/${caseID}`,
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


// UPLOAD CASE BY CSV REQUEST
export const UploadCaseByCsvRequest = async (body, token) => {
  try {
    const response = await axios.post(
      `${baseURL}/registrar/cases/csvupload`,
      body,
      {
        headers: {
          Accept: "application/vnd.connect.v1+json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data = response.data;
    console.log(data, "data is here");
    if (!data) return;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
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
