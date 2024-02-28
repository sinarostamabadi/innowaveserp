import axios from "axios";
export const EMPLOYEELEAVECHANGES_URL = "EmployeeLeaveChange";
// CREATE = add a new employeeLeaveChanges to the server
export function createEmployeeLeaveChange(employeeLeaveChanges) {
  return axios.post(`${EMPLOYEELEAVECHANGES_URL}/post`, employeeLeaveChanges);
}
// READ
export function getAllEmployeeLeaveChanges() {
  return axios.get(`${EMPLOYEELEAVECHANGES_URL}/get`);
}
export function getEmployeeLeaveChangeById(employeeLeaveChangesId) {
  return axios.get(`${EMPLOYEELEAVECHANGES_URL}/get/${employeeLeaveChangesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findEmployeeLeaveChanges(queryParams) {
  return axios.post(`${EMPLOYEELEAVECHANGES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateEmployeeLeaveChange(id, employeeLeaveChanges) {
  return axios.put(
    `${EMPLOYEELEAVECHANGES_URL}/put/${id}`,
    employeeLeaveChanges
  );
}
// UPDATE Status
export function updateStatusForEmployeeLeaveChanges(ids, status) {
  return axios.post(
    `${EMPLOYEELEAVECHANGES_URL}/updateStatusForEmployeeLeaveChanges`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the employeeLeaveChanges from the server
export function deleteEmployeeLeaveChange(employeeLeaveChangesId) {
  return axios.delete(
    `${EMPLOYEELEAVECHANGES_URL}/delete/${employeeLeaveChangesId}`
  );
}
// DELETE EmployeeLeaveChanges by ids
export function deleteEmployeeLeaveChanges(ids) {
  return axios.post(
    `${EMPLOYEELEAVECHANGES_URL}/deleteEmployeeLeaveChanges`,
    ids
  );
}
