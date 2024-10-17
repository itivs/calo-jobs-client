import API from "./apiEndPoint";

export const getJobsList = async (email) => {
  return await API.get(`/api/jobs`);
};

export const createNewJob = async () => {
  return await API.post(`/api/jobs`);
};
