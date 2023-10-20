
import axios from "axios";
export const EMPLOYEEMONTHLYCALCULATEDS_URL = "EmployeeMonthlyCalculated";
// CREATE = add a new employeeMonthlyCalculateds to the server 
export function createEmployeeMonthlyCalculated(employeeMonthlyCalculateds) { 
  return axios.post(`${EMPLOYEEMONTHLYCALCULATEDS_URL}/post`, employeeMonthlyCalculateds); 
}
// READ  
export function getAllEmployeeMonthlyCalculateds() {
  return axios.get(`${EMPLOYEEMONTHLYCALCULATEDS_URL}/get`);
}
export function getEmployeeMonthlyCalculatedById(employeeMonthlyCalculatedsId) {
  return axios.get(`${EMPLOYEEMONTHLYCALCULATEDS_URL}/get/${employeeMonthlyCalculatedsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findEmployeeMonthlyCalculateds(queryParams) {
  return axios.post(`${EMPLOYEEMONTHLYCALCULATEDS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateEmployeeMonthlyCalculated(id, employeeMonthlyCalculateds) {
  return axios.put(`${EMPLOYEEMONTHLYCALCULATEDS_URL}/put/${id}`, employeeMonthlyCalculateds);
}
// UPDATE Status  
export function updateStatusForEmployeeMonthlyCalculateds(ids, status) {
  return axios.post(`${EMPLOYEEMONTHLYCALCULATEDS_URL}/updateStatusForEmployeeMonthlyCalculateds`, {
    ids,
    status,
  });
}
// DELETE = the employeeMonthlyCalculateds from the server  
export function deleteEmployeeMonthlyCalculated(employeeMonthlyCalculatedsId) {
  return axios.delete(`${EMPLOYEEMONTHLYCALCULATEDS_URL}/delete/${employeeMonthlyCalculatedsId}`);
}
// DELETE EmployeeMonthlyCalculateds by ids  
export function deleteEmployeeMonthlyCalculateds(ids) {
return axios.post(`${EMPLOYEEMONTHLYCALCULATEDS_URL}/deleteEmployeeMonthlyCalculateds`, ids);
}