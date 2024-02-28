import axios from "axios";
export const JOBS_URL = "Job";
// CREATE = add a new jobs to the server
export function createJob(jobs) {
  return axios.post(`${JOBS_URL}/post`, jobs);
}
// READ
export function getAllJobs() {
  return axios.get(`${JOBS_URL}/get`);
}
export function getJobById(jobsId) {
  return axios.get(`${JOBS_URL}/get/${jobsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findJobs(queryParams) {
  return axios.post(`${JOBS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateJob(id, jobs) {
  return axios.put(`${JOBS_URL}/put/${id}`, jobs);
}
// UPDATE Status
export function updateStatusForJobs(ids, status) {
  return axios.post(`${JOBS_URL}/updateStatusForJobs`, {
    ids,
    status,
  });
}
// DELETE = the jobs from the server
export function deleteJob(jobsId) {
  return axios.delete(`${JOBS_URL}/delete/${jobsId}`);
}
// DELETE Jobs by ids
export function deleteJobs(ids) {
  return axios.post(`${JOBS_URL}/deleteJobs`, ids);
}
