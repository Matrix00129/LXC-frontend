import axios from "axios";
const baseURL = import.meta.env.VITE_BASEURL;

// SIGNUP  REQUEST FOR INDIVIDUAL
export const SignUpRequestForIndividual = async (body) => {
  try {
    const response = await axios.post(`${baseURL}/auth/register`, body, {
      headers: {
        Accept: "application/vnd.connect.v1+json",
        "Content-Type": "application/json",
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

// SIGNUP  REQUEST FOR BUSINESS
export const SignUpRequestForBusiness = async (body) => {
  try {
    const response = await axios.post(
      `${baseURL}/auth/business/register`,
      body,
      {
        headers: {
          Accept: "application/vnd.connect.v1+json",
          "Content-Type": "application/json",
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

// LOGIN REQUEST
export const LoginRequest = async (body) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, body, {
      headers: {
        Accept: "application/vnd.connect.v1+json",
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    console.log(data, "====== Data is here ======");
    if (!data) return;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// LOGOUT
export const LogOutRequest = async (body) => {
  try {
    const response = await axios.get(`${baseURL}/auth/logout`, body, {
      headers: {
        Accept: "application/vnd.connect.v1+json",
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    console.log(data, "====== Data is here ======");
    if (!data) return;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// FORGOT PASSWORD REQUEST
export const ForgotPasswordRequest = async (body) => {
  try {
    const response = await axios.post(`${baseURL}/auth/password/request`, body, {
      headers: {
        Accept: "application/vnd.connect.v1+json",
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    if (!data) return;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};