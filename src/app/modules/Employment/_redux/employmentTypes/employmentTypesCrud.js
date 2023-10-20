
import axios from "axios";
export const EMPLOYMENTTYPES_URL = "EmploymentType";
// CREATE = add a new employmentTypes to the server 
export function createEmploymentType(employmentTypes) { 
  return axios.post(`${EMPLOYMENTTYPES_URL}/post`, employmentTypes); 
}
// READ  
export function getAllEmploymentTypes() {
  return axios.get(`${EMPLOYMENTTYPES_URL}/get`);
}
export function getEmploymentTypeById(employmentTypesId) {
  return axios.get(`${EMPLOYMENTTYPES_URL}/get/${employmentTypesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findEmploymentTypes(queryParams) {
  return axios.post(`${EMPLOYMENTTYPES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateEmploymentType(id, employmentTypes) {
  return axios.put(`${EMPLOYMENTTYPES_URL}/put/${id}`, employmentTypes);
}
// UPDATE Status  
export function updateStatusForEmploymentTypes(ids, status) {
  return axios.post(`${EMPLOYMENTTYPES_URL}/updateStatusForEmploymentTypes`, {
    ids,
    status,
  });
}
// DELETE = the employmentTypes from the server  
export function deleteEmploymentType(employmentTypesId) {
  return axios.delete(`${EMPLOYMENTTYPES_URL}/delete/${employmentTypesId}`);
}
// DELETE EmploymentTypes by ids  
export function deleteEmploymentTypes(ids) {
return axios.post(`${EMPLOYMENTTYPES_URL}/deleteEmploymentTypes`, ids);
}