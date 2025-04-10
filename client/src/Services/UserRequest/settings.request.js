import axios from "axios";
const baseURL = import.meta.env.VITE_BASEURL;

// GET(READ) ALL SETTINGS REQUEST
export const GetSettingsRequest = async (token) => {
  const response = await axios.get(`${baseURL}/user/settings`, {
    maxBodyLength: Infinity,
    headers: {
      Accept: "application/vnd.connect.v1+json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  return data;
};

// UPDATE SETTINGS REQUEST
export const UpdateSettingsRequest = async (token, body) => {
  try {
    const response = await axios.put(
      `${baseURL}/user/settings`,
      body,
      {
        headers: {
          Accept: "application/vnd.connect.v1+json",
          'Content-Type': 'multipart/form-data',
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


//GENERATE OTP REQUEST
export const GenerateOtpRequest = async (body, token) => {
  try {
    const response = await axios.post(`${baseURL}/user/generate/otp`, body, {
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

