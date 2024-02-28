import axios from "axios";
export const EMPLOYEELEAVES_URL = "EmployeeLeave";
// CREATE = add a new employeeLeaves to the server
export function createEmployeeLeave(employeeLeaves) {
  return axios.post(`${EMPLOYEELEAVES_URL}/post`, employeeLeaves);
}
// READ
export function getAllEmployeeLeaves() {
  return axios.get(`${EMPLOYEELEAVES_URL}/get`);
}
export function getEmployeeLeaveById(employeeLeavesId) {
  return axios.get(`${EMPLOYEELEAVES_URL}/get/${employeeLeavesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findEmployeeLeaves(queryParams) {
  return axios.post(`${EMPLOYEELEAVES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateEmployeeLeave(id, employeeLeaves) {
  return axios.put(`${EMPLOYEELEAVES_URL}/put/${id}`, employeeLeaves);
}
// UPDATE Status
export function updateStatusForEmployeeLeaves(ids, status) {
  return axios.post(`${EMPLOYEELEAVES_URL}/updateStatusForEmployeeLeaves`, {
    ids,
    status,
  });
}
// DELETE = the employeeLeaves from the server
export function deleteEmployeeLeave(employeeLeavesId) {
  return axios.delete(`${EMPLOYEELEAVES_URL}/delete/${employeeLeavesId}`);
}
// DELETE EmployeeLeaves by ids
export function deleteEmployeeLeaves(ids) {
  return axios.post(`${EMPLOYEELEAVES_URL}/deleteEmployeeLeaves`, ids);
}
