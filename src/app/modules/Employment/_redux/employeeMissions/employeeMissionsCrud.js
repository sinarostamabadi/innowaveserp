import axios from "axios";
export const EMPLOYEEMISSIONS_URL = "EmployeeMission";
// CREATE = add a new employeeMissions to the server
export function createEmployeeMission(employeeMissions) {
  return axios.post(`${EMPLOYEEMISSIONS_URL}/post`, employeeMissions);
}
// READ
export function getAllEmployeeMissions() {
  return axios.get(`${EMPLOYEEMISSIONS_URL}/get`);
}
export function getEmployeeMissionById(employeeMissionsId) {
  return axios.get(`${EMPLOYEEMISSIONS_URL}/get/${employeeMissionsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findEmployeeMissions(queryParams) {
  return axios.post(`${EMPLOYEEMISSIONS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateEmployeeMission(id, employeeMissions) {
  return axios.put(`${EMPLOYEEMISSIONS_URL}/put/${id}`, employeeMissions);
}
// UPDATE Status
export function updateStatusForEmployeeMissions(ids, status) {
  return axios.post(`${EMPLOYEEMISSIONS_URL}/updateStatusForEmployeeMissions`, {
    ids,
    status,
  });
}
// DELETE = the employeeMissions from the server
export function deleteEmployeeMission(employeeMissionsId) {
  return axios.delete(`${EMPLOYEEMISSIONS_URL}/delete/${employeeMissionsId}`);
}
// DELETE EmployeeMissions by ids
export function deleteEmployeeMissions(ids) {
  return axios.post(`${EMPLOYEEMISSIONS_URL}/deleteEmployeeMissions`, ids);
}
