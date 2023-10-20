
import axios from "axios";
export const EMPLOYEEWORKSHIFTS_URL = "EmployeeWorkShift";
// CREATE = add a new employeeWorkShifts to the server 
export function createEmployeeWorkShift(employeeWorkShifts) { 
  return axios.post(`${EMPLOYEEWORKSHIFTS_URL}/post`, employeeWorkShifts); 
}
// READ  
export function getAllEmployeeWorkShifts() {
  return axios.get(`${EMPLOYEEWORKSHIFTS_URL}/get`);
}
export function getEmployeeWorkShiftById(employeeWorkShiftsId) {
  return axios.get(`${EMPLOYEEWORKSHIFTS_URL}/get/${employeeWorkShiftsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findEmployeeWorkShifts(queryParams) {
  return axios.post(`${EMPLOYEEWORKSHIFTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateEmployeeWorkShift(id, employeeWorkShifts) {
  return axios.put(`${EMPLOYEEWORKSHIFTS_URL}/put/${id}`, employeeWorkShifts);
}
// UPDATE Status  
export function updateStatusForEmployeeWorkShifts(ids, status) {
  return axios.post(`${EMPLOYEEWORKSHIFTS_URL}/updateStatusForEmployeeWorkShifts`, {
    ids,
    status,
  });
}
// DELETE = the employeeWorkShifts from the server  
export function deleteEmployeeWorkShift(employeeWorkShiftsId) {
  return axios.delete(`${EMPLOYEEWORKSHIFTS_URL}/delete/${employeeWorkShiftsId}`);
}
// DELETE EmployeeWorkShifts by ids  
export function deleteEmployeeWorkShifts(ids) {
return axios.post(`${EMPLOYEEWORKSHIFTS_URL}/deleteEmployeeWorkShifts`, ids);
}