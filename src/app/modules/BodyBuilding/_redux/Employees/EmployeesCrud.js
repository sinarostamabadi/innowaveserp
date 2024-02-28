import axios from "axios";
export const RESTAURANTMENUITEMS_URL = "BodyBuildingEmployee";
// CREATE = add a new employees to the server
export function createEmployee(employees) {
  return axios.post(`${RESTAURANTMENUITEMS_URL}/post`, employees);
}
// READ
export function getAllEmployees() {
  return axios.post(`${RESTAURANTMENUITEMS_URL}/get`, {
    Filters: [],
    OrderBy: "NameFa asc",
    PageNumber: 1,
    PageSize: 200,
  });
}
export function getEmployeeById(employeesId) {
  return axios.get(`${RESTAURANTMENUITEMS_URL}/get/${employeesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findEmployees(queryParams) {
  return axios.post(`${RESTAURANTMENUITEMS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateEmployee(id, employees) {
  return axios.put(`${RESTAURANTMENUITEMS_URL}/put/${id}`, employees);
}
// UPDATE Status
export function updateStatusForEmployees(ids, status) {
  return axios.post(`${RESTAURANTMENUITEMS_URL}/updateStatusForEmployees`, {
    ids,
    status,
  });
}
// DELETE = the employees from the server
export function deleteEmployee(employeesId) {
  return axios.delete(`${RESTAURANTMENUITEMS_URL}/delete/${employeesId}`);
}
// DELETE Employees by ids
export function deleteEmployees(ids) {
  return axios.post(`${RESTAURANTMENUITEMS_URL}/deleteEmployees`, ids);
}

// SUGGESTION MenuItem
export function suggestionMenuItem(code) {
  return axios.post(`${RESTAURANTMENUITEMS_URL}/Suggestion`, { term: code });
}
