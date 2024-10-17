import axios from "axios";

const SERVER_URL = "http://localhost:4000";

const createAPI = (baseURL) => {
  return axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

let API = createAPI(SERVER_URL);

export const resetAPI = (newBaseURL) => {
  API = createAPI(newBaseURL);
};

export default API;
