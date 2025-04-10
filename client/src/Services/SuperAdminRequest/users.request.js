import axios from "axios";
const baseURL = import.meta.env.VITE_BASEURL;

// GET(READ) ALL USERS REQUEST
export const GetUsersRequest = async (token, pageNumber = 1) => {
  const response = await axios.get(
    `${baseURL}/superadmin/users/all?page=${pageNumber}`,
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


// CREATE NEW USER REQUEST
export const CreateUserRequest = async (body, token) => {
  try {
    const response = await axios.post(`${baseURL}/superadmin/users/new`, body, {
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

// EDIT USER REQUEST
export const EditUserRequest = async (token, editUserID, body) => {
  try {
    const response = await axios.patch(
      `${baseURL}/superadmin/users/update/${editUserID}`,
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

// DELETE USER  REQUEST
export const DeleteUserRequest = async (token, deleteCaseID) => {
  const response = await axios.delete(
    `${baseURL}/superadmin/users/delete/${deleteCaseID}`,
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
