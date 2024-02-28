import axios from "axios";
export const EMPLOYEEEDUCARIONS_URL = "EmployeeEducarion";
// CREATE = add a new employeeEducarions to the server
export function createEmployeeEducarion(employeeEducarions) {
  return axios.post(`${EMPLOYEEEDUCARIONS_URL}/post`, employeeEducarions);
}
// READ
export function getAllEmployeeEducarions() {
  return axios.get(`${EMPLOYEEEDUCARIONS_URL}/get`);
}
export function getEmployeeEducarionById(employeeEducarionsId) {
  return axios.get(`${EMPLOYEEEDUCARIONS_URL}/get/${employeeEducarionsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findEmployeeEducarions(queryParams) {
  return axios.post(`${EMPLOYEEEDUCARIONS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateEmployeeEducarion(id, employeeEducarions) {
  return axios.put(`${EMPLOYEEEDUCARIONS_URL}/put/${id}`, employeeEducarions);
}
// UPDATE Status
export function updateStatusForEmployeeEducarions(ids, status) {
  return axios.post(
    `${EMPLOYEEEDUCARIONS_URL}/updateStatusForEmployeeEducarions`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the employeeEducarions from the server
export function deleteEmployeeEducarion(employeeEducarionsId) {
  return axios.delete(
    `${EMPLOYEEEDUCARIONS_URL}/delete/${employeeEducarionsId}`
  );
}
// DELETE EmployeeEducarions by ids
export function deleteEmployeeEducarions(ids) {
  return axios.post(`${EMPLOYEEEDUCARIONS_URL}/deleteEmployeeEducarions`, ids);
}
