import axios from "axios";
export const EMPLOYEES_URL = "Employee";
// CREATE = add a new employees to the server
export function createEmployee(employees) {
  return axios.post(`${EMPLOYEES_URL}/post`, employees);
}
// READ
export function getAllEmployees() {
  return axios.get(`${EMPLOYEES_URL}/get`);
}
export function getEmployeeById(employeesId) {
  return axios.get(`${EMPLOYEES_URL}/get/${employeesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findEmployees(queryParams) {
  return axios.post(`${EMPLOYEES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateEmployee(id, employees) {
  return axios.put(`${EMPLOYEES_URL}/put/${id}`, employees);
}
// UPDATE Status
export function updateStatusForEmployees(ids, status) {
  return axios.post(`${EMPLOYEES_URL}/updateStatusForEmployees`, {
    ids,
    status,
  });
}
// DELETE = the employees from the server
export function deleteEmployee(employeesId) {
  return axios.delete(`${EMPLOYEES_URL}/delete/${employeesId}`);
}
// DELETE Employees by ids
export function deleteEmployees(ids) {
  return axios.post(`${EMPLOYEES_URL}/deleteEmployees`, ids);
}
