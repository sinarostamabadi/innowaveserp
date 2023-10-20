
import axios from "axios";
export const EMPLOYEEPHYSICALCONDITIONS_URL = "EmployeePhysicalCondition";
// CREATE = add a new employeePhysicalConditions to the server 
export function createEmployeePhysicalCondition(employeePhysicalConditions) { 
  return axios.post(`${EMPLOYEEPHYSICALCONDITIONS_URL}/post`, employeePhysicalConditions); 
}
// READ  
export function getAllEmployeePhysicalConditions() {
  return axios.get(`${EMPLOYEEPHYSICALCONDITIONS_URL}/get`);
}
export function getEmployeePhysicalConditionById(employeePhysicalConditionsId) {
  return axios.get(`${EMPLOYEEPHYSICALCONDITIONS_URL}/get/${employeePhysicalConditionsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findEmployeePhysicalConditions(queryParams) {
  return axios.post(`${EMPLOYEEPHYSICALCONDITIONS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateEmployeePhysicalCondition(id, employeePhysicalConditions) {
  return axios.put(`${EMPLOYEEPHYSICALCONDITIONS_URL}/put/${id}`, employeePhysicalConditions);
}
// UPDATE Status  
export function updateStatusForEmployeePhysicalConditions(ids, status) {
  return axios.post(`${EMPLOYEEPHYSICALCONDITIONS_URL}/updateStatusForEmployeePhysicalConditions`, {
    ids,
    status,
  });
}
// DELETE = the employeePhysicalConditions from the server  
export function deleteEmployeePhysicalCondition(employeePhysicalConditionsId) {
  return axios.delete(`${EMPLOYEEPHYSICALCONDITIONS_URL}/delete/${employeePhysicalConditionsId}`);
}
// DELETE EmployeePhysicalConditions by ids  
export function deleteEmployeePhysicalConditions(ids) {
return axios.post(`${EMPLOYEEPHYSICALCONDITIONS_URL}/deleteEmployeePhysicalConditions`, ids);
}