import axios from "axios";

const API = "https://jobgraph-api.onrender.com";

export const getJobs = async () => {
  const response = await axios.get(`${API}/api/jobs`);
  return response.data;
};

export const getMatchedJobs = async (candidateName) => {
  const response = await axios.get(
    `${API}/api/jobs/match/${candidateName}`
  );
  return response.data;
};

export const getJobDetails = async (title) => {
  const response = await axios.get(
    `${API}/api/jobs/${encodeURIComponent(title)}`
  );
  return response.data;
};