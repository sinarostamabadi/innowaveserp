import axios from "axios";
export const URL = "BodyBuildingEmployeeType";
export const URL_Expertise = "BodyBuildingEmployeeTypeExpertise";

// CREATE = add a new employeeTypes to the server
export function createEmployeeType(employeeTypes) {
  return axios.post(`${URL}/post`, employeeTypes);
}
// READ
export function getAll() {
  return axios.get(`${URL}/getAll`);
}
export function getEmployeeTypeById(employeeTypesId) {
  return axios.get(`${URL}/get/${employeeTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findEmployeeTypes(queryParams) {
  return axios.post(`${URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateEmployeeType(id, employeeTypes) {
  return axios.put(`${URL}/put/${id}`, employeeTypes);
}
// UPDATE Status
export function updateStatusForEmployeeTypes(ids, status) {
  return axios.post(`${URL}/updateStatusForEmployeeTypes`, {
    ids,
    status,
  });
}
// DELETE = the employeeTypes from the server
export function deleteEmployeeType(employeeTypesId) {
  return axios.delete(`${URL}/delete/${employeeTypesId}`);
}
// DELETE EmployeeTypes by ids
export function deleteEmployeeTypes(ids) {
  return axios.post(`${URL}/deleteEmployeeTypes`, ids);
}

// SUGGESION BRAND
export function suggestEmployeeType(query) {
  return axios.post(`${URL}/get`, {
    Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
    OrderBy: "Title asc",
    PageNumber: 1,
    PageSize: 10,
  });
}

// READ
export function getAllExpertises(typeId) {
  return axios.post(`${URL_Expertise}/get`, {
    Filters: [
      {
        Property: "BodyBuildingEmployeeTypeId",
        Operation: 5,
        Values: [typeId + ""],
      },
    ],
    OrderBy: "Title asc",
    PageNumber: 1,
    PageSize: 10,
  });
}
