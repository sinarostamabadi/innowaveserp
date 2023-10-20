
import axios from "axios";
export const EMPLOYEERELATIONS_URL = "EmployeeRelation";
// CREATE = add a new employeeRelations to the server 
export function createEmployeeRelation(employeeRelations) { 
  return axios.post(`${EMPLOYEERELATIONS_URL}/post`, employeeRelations); 
}
// READ  
export function getAllEmployeeRelations() {
  return axios.get(`${EMPLOYEERELATIONS_URL}/get`);
}
export function getEmployeeRelationById(employeeRelationsId) {
  return axios.get(`${EMPLOYEERELATIONS_URL}/get/${employeeRelationsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findEmployeeRelations(queryParams) {
  return axios.post(`${EMPLOYEERELATIONS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateEmployeeRelation(id, employeeRelations) {
  return axios.put(`${EMPLOYEERELATIONS_URL}/put/${id}`, employeeRelations);
}
// UPDATE Status  
export function updateStatusForEmployeeRelations(ids, status) {
  return axios.post(`${EMPLOYEERELATIONS_URL}/updateStatusForEmployeeRelations`, {
    ids,
    status,
  });
}
// DELETE = the employeeRelations from the server  
export function deleteEmployeeRelation(employeeRelationsId) {
  return axios.delete(`${EMPLOYEERELATIONS_URL}/delete/${employeeRelationsId}`);
}
// DELETE EmployeeRelations by ids  
export function deleteEmployeeRelations(ids) {
return axios.post(`${EMPLOYEERELATIONS_URL}/deleteEmployeeRelations`, ids);
}