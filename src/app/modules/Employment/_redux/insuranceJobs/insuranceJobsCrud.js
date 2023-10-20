
import axios from "axios";
export const INSURANCEJOBS_URL = "InsuranceJob";
// CREATE = add a new insuranceJobs to the server 
export function createInsuranceJob(insuranceJobs) { 
  return axios.post(`${INSURANCEJOBS_URL}/post`, insuranceJobs); 
}
// READ  
export function getAllInsuranceJobs() {
  return axios.get(`${INSURANCEJOBS_URL}/get`);
}
export function getInsuranceJobById(insuranceJobsId) {
  return axios.get(`${INSURANCEJOBS_URL}/get/${insuranceJobsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findInsuranceJobs(queryParams) {
  return axios.post(`${INSURANCEJOBS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateInsuranceJob(id, insuranceJobs) {
  return axios.put(`${INSURANCEJOBS_URL}/put/${id}`, insuranceJobs);
}
// UPDATE Status  
export function updateStatusForInsuranceJobs(ids, status) {
  return axios.post(`${INSURANCEJOBS_URL}/updateStatusForInsuranceJobs`, {
    ids,
    status,
  });
}
// DELETE = the insuranceJobs from the server  
export function deleteInsuranceJob(insuranceJobsId) {
  return axios.delete(`${INSURANCEJOBS_URL}/delete/${insuranceJobsId}`);
}
// DELETE InsuranceJobs by ids  
export function deleteInsuranceJobs(ids) {
return axios.post(`${INSURANCEJOBS_URL}/deleteInsuranceJobs`, ids);
}