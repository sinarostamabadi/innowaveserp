
import axios from "axios";
export const EMPLOYMENTSTATUSES_URL = "EmploymentStatus";
// CREATE = add a new employmentStatuses to the server 
export function createEmploymentStatus(employmentStatuses) { 
  return axios.post(`${EMPLOYMENTSTATUSES_URL}/post`, employmentStatuses); 
}
// READ  
export function getAllEmploymentStatuses() {
  return axios.get(`${EMPLOYMENTSTATUSES_URL}/get`);
}
export function getEmploymentStatusById(employmentStatusesId) {
  return axios.get(`${EMPLOYMENTSTATUSES_URL}/get/${employmentStatusesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findEmploymentStatuses(queryParams) {
  return axios.post(`${EMPLOYMENTSTATUSES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateEmploymentStatus(id, employmentStatuses) {
  return axios.put(`${EMPLOYMENTSTATUSES_URL}/put/${id}`, employmentStatuses);
}
// UPDATE Status  
export function updateStatusForEmploymentStatuses(ids, status) {
  return axios.post(`${EMPLOYMENTSTATUSES_URL}/updateStatusForEmploymentStatuses`, {
    ids,
    status,
  });
}
// DELETE = the employmentStatuses from the server  
export function deleteEmploymentStatus(employmentStatusesId) {
  return axios.delete(`${EMPLOYMENTSTATUSES_URL}/delete/${employmentStatusesId}`);
}
// DELETE EmploymentStatuses by ids  
export function deleteEmploymentStatuses(ids) {
return axios.post(`${EMPLOYMENTSTATUSES_URL}/deleteEmploymentStatuses`, ids);
}