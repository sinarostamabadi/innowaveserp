
import axios from "axios";
export const EMPLOYEESPECIALDATES_URL = "EmployeeSpecialDate";
// CREATE = add a new employeeSpecialDates to the server 
export function createEmployeeSpecialDate(employeeSpecialDates) { 
  return axios.post(`${EMPLOYEESPECIALDATES_URL}/post`, employeeSpecialDates); 
}
// READ  
export function getAllEmployeeSpecialDates() {
  return axios.get(`${EMPLOYEESPECIALDATES_URL}/get`);
}
export function getEmployeeSpecialDateById(employeeSpecialDatesId) {
  return axios.get(`${EMPLOYEESPECIALDATES_URL}/get/${employeeSpecialDatesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findEmployeeSpecialDates(queryParams) {
  return axios.post(`${EMPLOYEESPECIALDATES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateEmployeeSpecialDate(id, employeeSpecialDates) {
  return axios.put(`${EMPLOYEESPECIALDATES_URL}/put/${id}`, employeeSpecialDates);
}
// UPDATE Status  
export function updateStatusForEmployeeSpecialDates(ids, status) {
  return axios.post(`${EMPLOYEESPECIALDATES_URL}/updateStatusForEmployeeSpecialDates`, {
    ids,
    status,
  });
}
// DELETE = the employeeSpecialDates from the server  
export function deleteEmployeeSpecialDate(employeeSpecialDatesId) {
  return axios.delete(`${EMPLOYEESPECIALDATES_URL}/delete/${employeeSpecialDatesId}`);
}
// DELETE EmployeeSpecialDates by ids  
export function deleteEmployeeSpecialDates(ids) {
return axios.post(`${EMPLOYEESPECIALDATES_URL}/deleteEmployeeSpecialDates`, ids);
}