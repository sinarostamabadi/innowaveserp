import axios from "axios";
export const EMPLOYEESOLDIERSHIPS_URL = "EmployeeSoldiership";
// CREATE = add a new employeeSoldierships to the server
export function createEmployeeSoldiership(employeeSoldierships) {
  return axios.post(`${EMPLOYEESOLDIERSHIPS_URL}/post`, employeeSoldierships);
}
// READ
export function getAllEmployeeSoldierships() {
  return axios.get(`${EMPLOYEESOLDIERSHIPS_URL}/get`);
}
export function getEmployeeSoldiershipById(employeeSoldiershipsId) {
  return axios.get(`${EMPLOYEESOLDIERSHIPS_URL}/get/${employeeSoldiershipsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findEmployeeSoldierships(queryParams) {
  return axios.post(`${EMPLOYEESOLDIERSHIPS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateEmployeeSoldiership(id, employeeSoldierships) {
  return axios.put(
    `${EMPLOYEESOLDIERSHIPS_URL}/put/${id}`,
    employeeSoldierships
  );
}
// UPDATE Status
export function updateStatusForEmployeeSoldierships(ids, status) {
  return axios.post(
    `${EMPLOYEESOLDIERSHIPS_URL}/updateStatusForEmployeeSoldierships`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the employeeSoldierships from the server
export function deleteEmployeeSoldiership(employeeSoldiershipsId) {
  return axios.delete(
    `${EMPLOYEESOLDIERSHIPS_URL}/delete/${employeeSoldiershipsId}`
  );
}
// DELETE EmployeeSoldierships by ids
export function deleteEmployeeSoldierships(ids) {
  return axios.post(
    `${EMPLOYEESOLDIERSHIPS_URL}/deleteEmployeeSoldierships`,
    ids
  );
}
