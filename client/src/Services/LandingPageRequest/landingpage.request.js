import axios from "axios";
const baseURL = import.meta.env.VITE_BASEURL;
// SEARCH REQUEST
export const SearchByValuesRequest = async (body) => {
  try {
    const response = await axios.post(`${baseURL}/search/byValues`, body, {
      headers: {
        Accept: "application/vnd.connect.v1+json",
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